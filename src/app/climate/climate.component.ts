import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { I18nService } from '../i18n.service';
import { ClimatePoint } from '../models';
import { PelletApiService } from '../pellet-api.service';

Chart.register(...registerables);

type SensorKey =
  | 'floor0'
  | 'floor1'
  | 'floor2'
  | 'out'
  | 'hot'
  | 'cold'
  | 'humidity'
  | 'pressure';
interface Sensor {
  key: SensorKey;
  label: string;
  color: string;
  unit: string;
  dec: number;
}

/** `label` is a translation key. */
const SENSORS: Sensor[] = [
  { key: 'floor0', label: 'floor0', color: '#a3e635', unit: '°C', dec: 1 },
  { key: 'floor1', label: 'floor1', color: '#a78bfa', unit: '°C', dec: 1 },
  { key: 'floor2', label: 'floor2', color: '#fbbf24', unit: '°C', dec: 1 },
  { key: 'out', label: 'outside', color: '#e2e8f0', unit: '°C', dec: 1 },
  { key: 'hot', label: 'hotWater', color: '#fb7185', unit: '°C', dec: 1 },
  { key: 'cold', label: 'coldWater', color: '#38bdf8', unit: '°C', dec: 1 },
  { key: 'humidity', label: 'humidity', color: '#5eead4', unit: '%', dec: 0 },
  { key: 'pressure', label: 'pressure', color: '#e879f9', unit: 'hPa', dec: 0 },
];
const colorOf = (key: SensorKey) => SENSORS.find((s) => s.key === key)!.color;

const HOUR = 3_600_000;
const REFRESH_MS = 5 * 60_000;

@Component({
  selector: 'app-climate',
  standalone: true,
  templateUrl: './climate.component.html',
})
export class ClimateComponent implements OnInit, OnDestroy {
  private api = inject(PelletApiService);
  readonly i18n = inject(I18nService);

  @ViewChild('waterChart', { static: true })
  waterRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('floorChart', { static: true })
  floorRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('outChart', { static: true })
  outRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('atmChart', { static: true })
  atmRef!: ElementRef<HTMLCanvasElement>;

  readonly ranges = [3, 6, 12, 24, 48, 72];
  readonly sensors = SENSORS;
  readonly colors = {
    hot: colorOf('hot'),
    cold: colorOf('cold'),
    floor0: colorOf('floor0'),
    floor1: colorOf('floor1'),
    floor2: colorOf('floor2'),
    humidity: colorOf('humidity'),
    pressure: colorOf('pressure'),
  };

  points = signal<ClimatePoint[]>([]);
  hours = signal(24);
  loading = signal(true);
  refreshing = signal(false);
  error = signal('');
  private now = signal(Date.now());
  private charts: Chart[] = [];
  private timers: ReturnType<typeof setInterval>[] = [];

  /** Points inside the selected range, measured back from the newest reading. */
  windowPoints = computed(() => {
    const all = this.points();
    if (!all.length) return [];
    const cutoff = all[all.length - 1].t - this.hours() * HOUR;
    return all.filter((p) => p.t >= cutoff);
  });

  stale = computed(() => {
    const all = this.points();
    return all.length ? this.now() - all[all.length - 1].t > HOUR : false;
  });

  stamp = computed(() => {
    const all = this.points();
    if (!all.length) return this.t('noReadings');
    const last = all[all.length - 1].t;
    return `${this.t('updated')} ${this.ago(this.now() - last)} (${new Date(last).toLocaleString(this.locale())})`;
  });

  /** Latest value comes from the newest reading; min/max from the selected range. */
  tiles = computed(() => {
    const all = this.points();
    const last = all.length ? all[all.length - 1] : null;
    const win = this.windowPoints();
    return SENSORS.map((s) => {
      const latest = last ? last[s.key] : null;
      const vals = win
        .map((p) => p[s.key])
        .filter((v): v is number => v !== null);
      const min = vals.length ? Math.min(...vals) : null;
      const max = vals.length ? Math.max(...vals) : null;
      const f = (v: number | null) => (v === null ? '–' : v.toFixed(s.dec));
      let pos: number | null = null;
      if (latest !== null && min !== null && max !== null) {
        pos =
          max > min
            ? Math.min(1, Math.max(0, (latest - min) / (max - min)))
            : 0.5;
      }
      return {
        key: s.key,
        label: s.label,
        color: s.color,
        unit: s.unit,
        pos,
        latestText: latest === null ? null : f(latest),
        minText: f(min),
        maxText: f(max),
      };
    });
  });

  constructor() {
    // Redraws when the data, the range or the language changes (all read inside render()).
    effect(() => this.render());
  }

  ngOnInit(): void {
    this.load();
    this.timers.push(setInterval(() => this.now.set(Date.now()), 30_000));
    this.timers.push(setInterval(() => this.load(), REFRESH_MS));
  }

  ngOnDestroy(): void {
    this.timers.forEach(clearInterval);
    this.destroyCharts();
  }

  t = (key: string) => this.i18n.t(key);
  setHours(h: number) {
    this.hours.set(h);
  }
  rangeTitle(h: number) {
    return this.t('lastHours').replace('{n}', String(h));
  }
  refresh() {
    this.refreshing.set(true);
    this.load();
  }

  private locale() {
    return this.i18n.lang() === 'bg' ? 'bg-BG' : 'en-GB';
  }

  private ago(ms: number): string {
    const m = Math.round(ms / 60000);
    if (m < 1) return this.t('agoNow');
    if (m < 60) return this.t('agoMin').replace('{n}', String(m));
    const h = Math.floor(m / 60);
    return h < 48
      ? this.t('agoHour').replace('{n}', String(h))
      : this.t('agoDay').replace('{n}', String(Math.floor(h / 24)));
  }

  private load() {
    this.api.climate().subscribe({
      next: (res) => {
        this.loading.set(false);
        if (!res || res.error) {
          this.error.set(res?.error || this.t('serverNoData'));
          return;
        }
        this.error.set('');
        this.now.set(Date.now());
        this.points.set(
          res.rows
            .map((r) => ({
              t: new Date(r[0]).getTime(),
              floor0: r[1],
              floor1: r[2],
              floor2: r[3],
              out: r[4],
              hot: r[5],
              cold: r[6],
              pressure: r[7],
              humidity: r[8],
            }))
            .filter((p) => Number.isFinite(p.t))
            .sort((a, b) => a.t - b.t),
        );
      },
      error: (e) => {
        this.loading.set(false);
        this.error.set(e?.message || String(e));
      },
    });
  }

  // ---- charts ----
  private css = (name: string) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  private destroyCharts() {
    this.charts.forEach((c) => c.destroy());
    this.charts = [];
  }

  /** Padded min/max so area charts don't start at zero. */
  private padded(
    pts: ClimatePoint[],
    keys: SensorKey[],
  ): { min?: number; max?: number } {
    const v: number[] = [];
    pts.forEach((p) =>
      keys.forEach((k) => {
        const x = p[k];
        if (x !== null) v.push(x);
      }),
    );
    if (!v.length) return {};
    const lo = Math.min(...v),
      hi = Math.max(...v);
    const pad = Math.max((hi - lo) * 0.15, 0.5);
    return { min: Math.floor(lo - pad), max: Math.ceil(hi + pad) };
  }

  private series(
    pts: ClimatePoint[],
    key: SensorKey,
    fill: boolean,
    axis = 'y',
  ): any {
    const s = SENSORS.find((x) => x.key === key)!;
    return {
      label: this.t(s.label),
      unit: s.unit,
      yAxisID: axis,
      data: pts.map((p) => ({ x: p.t, y: p[key] })),
      borderColor: s.color,
      backgroundColor: fill ? `${s.color}1a` : s.color,
      fill: fill ? 'start' : false,
    };
  }

  private base(span: number): any {
    const narrow = document.documentElement.clientWidth < 520;
    const muted = this.css('--muted');
    const border = this.css('--border');
    const locale = this.locale();
    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      interaction: { mode: 'index', intersect: false },
      elements: {
        point: { radius: 0, hoverRadius: 4 },
        line: { tension: 0.35, borderWidth: 2.5 },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#08121c',
          borderColor: border,
          borderWidth: 1,
          titleColor: '#fff',
          bodyColor: '#dce6ef',
          padding: 11,
          callbacks: {
            title: (items: any[]) =>
              items.length
                ? new Date(items[0].parsed.x).toLocaleString(locale, {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : '',
            label: (c: any) =>
              c.parsed.y == null
                ? ''
                : `${c.dataset.label}: ${c.parsed.y.toFixed(1)} ${c.dataset.unit}`,
          },
        },
      },
      scales: {
        x: {
          type: 'time',
          time: {
            displayFormats: {
              minute: 'HH:mm',
              hour: span > 24 ? 'dd.MM HH:mm' : 'HH:mm',
              day: 'dd.MM',
            },
          },
          grid: { display: false },
          ticks: {
            color: muted,
            maxRotation: 0,
            autoSkip: true,
            maxTicksLimit: narrow ? 4 : 7,
            font: { size: 10 },
          },
          border: { color: border },
        },
        y: {
          grid: { color: '#26374788' },
          ticks: { color: muted, font: { size: 10 } },
          border: { display: false },
        },
      },
    };
  }

  private render() {
    // Everything read here (points, range, language) is a dependency of the effect.
    const pts = this.windowPoints();
    this.i18n.lang();
    this.destroyCharts();
    if (!pts.length) return;

    const span = this.hours();
    const degrees = (v: any) => `${v}°`;
    const chart = (
      ref: ElementRef<HTMLCanvasElement>,
      datasets: any[],
      options: any,
    ) =>
      this.charts.push(
        new Chart(ref.nativeElement, {
          type: 'line',
          data: { datasets },
          options,
        }),
      );

    // Hot / cold water
    let o = this.base(span);
    o.scales.y = {
      ...o.scales.y,
      ...this.padded(pts, ['hot', 'cold']),
      ticks: { ...o.scales.y.ticks, callback: degrees },
    };
    chart(
      this.waterRef,
      [this.series(pts, 'hot', true), this.series(pts, 'cold', true)],
      o,
    );

    // Floors
    o = this.base(span);
    o.scales.y.ticks.callback = degrees;
    chart(
      this.floorRef,
      [
        this.series(pts, 'floor0', false),
        this.series(pts, 'floor1', false),
        this.series(pts, 'floor2', false),
      ],
      o,
    );

    // Outside
    o = this.base(span);
    o.scales.y = {
      ...o.scales.y,
      ...this.padded(pts, ['out']),
      ticks: { ...o.scales.y.ticks, callback: degrees },
    };
    chart(this.outRef, [this.series(pts, 'out', true)], o);

    // Humidity (left, area) / pressure (right, line)
    o = this.base(span);
    o.scales.y = {
      ...o.scales.y,
      ...this.padded(pts, ['humidity']),
      ticks: { ...o.scales.y.ticks, color: colorOf('humidity') },
    };
    o.scales.y1 = {
      position: 'right',
      grid: { drawOnChartArea: false },
      border: { display: false },
      ticks: { color: colorOf('pressure'), font: { size: 10 } },
    };
    chart(
      this.atmRef,
      [
        this.series(pts, 'humidity', true),
        this.series(pts, 'pressure', false, 'y1'),
      ],
      o,
    );
  }
}

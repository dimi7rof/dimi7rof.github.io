import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ClimateComponent } from '../climate/climate.component';
import {
  Kpis,
  OverviewData,
  SeasonData,
  SeasonListItem,
  SeasonRecord,
} from '../models';
import { PelletApiService } from '../services/pellet-api.service';
import { Lang } from '../translations';
import { LoadingComponent } from '../loading/loading.component';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { I18nService } from '../services/i18n.service';

Chart.register(...registerables);

type View = 'climate' | 'season' | 'compare' | 'history';
type Num = number | null | undefined;
interface Tile {
  name: string;
  value: Num;
  meta: string;
}

const KG_PER_BAG = 15; // same as bagWeightKg in the Apps Script
const MONTHS_BG = ['Окт', 'Ное', 'Дек', 'Яну', 'Фев', 'Мар', 'Апр'];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LoadingComponent, ClimateComponent, LoadingComponent, RouterLink],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  private api = inject(PelletApiService);
  readonly i18n = inject(I18nService);

  constructor(
    private router: Router,
    private userService: UserService,
  ) {
    this.userService.getUserIp().subscribe((ipData) => {
      this.userService.getLocation(ipData.ip).subscribe((loc) => {
        const userData = {
          ip: ipData.ip,
          os: this.getOperatingSystem(),
          browser: this.getBrowserInfo(),
          city: loc.city,
          country: loc.country,
          org: loc.org,
        };

        this.userService.sendUserData(userData).subscribe({
          next: () => console.info(userData.ip),
          error: () => console.error('Error'),
        });
      });
    });
  }

  getOperatingSystem(): string {
    const userAgent = navigator.userAgent;
    if (/Windows NT 10.0/.test(userAgent)) return 'Windows 10';
    if (/Windows NT 6.1/.test(userAgent)) return 'Windows 7';
    if (/Mac OS X/.test(userAgent)) return 'MacOS';
    if (/Linux/.test(userAgent)) return 'Linux';
    if (/Android/.test(userAgent)) return 'Android';
    if (/iPhone|iPad|iPod/.test(userAgent)) return 'iOS';
    return 'Unknown';
  }

  getBrowserInfo(): string {
    const userAgent = navigator.userAgent;
    if (/Chrome/.test(userAgent)) return 'Chrome';
    if (/Firefox/.test(userAgent)) return 'Firefox';
    if (/Safari/.test(userAgent)) return 'Safari';
    if (/Edge/.test(userAgent)) return 'Edge';
    return 'Unknown Browser';
  }

  @ViewChild('consumptionChart', { static: true })
  consumptionRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('temperatureChart', { static: true })
  temperatureRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('costChart', { static: true })
  costRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('monthlyAverageChart', { static: true })
  monthlyAvgRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('monthlyTotalChart', { static: true })
  monthlyTotalRef!: ElementRef<HTMLCanvasElement>;

  readonly palette = [
    '#36c5d8',
    '#f5a64a',
    '#48c78e',
    '#5598f5',
    '#a78bfa',
    '#f16f6f',
    '#e5c454',
    '#67b7a5',
  ];
  readonly tabs: { view: View; label: string }[] = [
    { view: 'climate', label: 'tabClimate' },
    { view: 'season', label: 'tabSeason' },
    { view: 'compare', label: 'tabCompare' },
    { view: 'history', label: 'tabHistory' },
  ];

  // ---- state ----
  sheets = signal<SeasonListItem[]>([]);
  selectedSeason = signal('');
  seasonData = signal<SeasonData | null>(null);
  overviewData = signal<OverviewData | null>(null);
  view = signal<View>('climate');
  loading = signal(false);
  error = signal('');
  updatedAt = signal('');
  private charts: Record<string, Chart | undefined> = {};
  private seasonsRequested = false;

  // ---- derived ----
  records = computed<SeasonRecord[]>(() => this.seasonData()?.records ?? []);
  latest = computed(() => this.records().at(-1) ?? null);
  kpis = computed<Partial<Kpis>>(() => this.seasonData()?.kpis ?? {});
  currency = computed(() => this.seasonData()?.currency ?? '');
  historyRows = computed(() => [...this.records()].reverse());
  seasons = computed(() => this.overviewData()?.seasons ?? []);
  message = computed(
    () =>
      this.error() ||
      (this.seasonData() && !this.records().length ? this.t('noDated') : ''),
  );

  /** Refill = a dated row with bags > 0. Next refill = latest refill + average of the last 3 gaps. */
  refill = computed(() => {
    const refills = this.records().filter((r) => (r.bags ?? 0) > 0);
    const latest = refills.at(-1);
    if (!latest) return null;

    const pts = refills.slice(-4); // up to 4 refills -> 3 gaps
    const gaps = pts
      .slice(1)
      .map((r, i) => (r.timestamp - pts[i].timestamp) / 3_600_000);
    const avgGapH = gaps.length
      ? gaps.reduce((a, b) => a + b, 0) / gaps.length
      : null;

    let nextTs: number | null = null;
    if (avgGapH !== null) {
      const d = new Date(latest.timestamp + avgGapH * 3_600_000);
      d.setMinutes(d.getMinutes() >= 30 ? 60 : 0, 0, 0); // nearest hour
      nextTs = d.getTime();
    }
    return { latest, avgGapH, nextTs };
  });

  private locale() {
    return this.i18n.lang() === 'bg' ? 'bg-BG' : 'en-GB';
  }
  private fmtDay(ts: number) {
    return new Date(ts).toLocaleDateString(this.locale(), {
      day: 'numeric',
      month: 'short',
    });
  }
  private fmtTime(ts: number) {
    return new Date(ts).toLocaleTimeString(this.locale(), {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  private fmtSpan(ms: number) {
    const h = Math.round(Math.abs(ms) / 3_600_000);
    const d = Math.floor(h / 24);
    return d
      ? `${d} ${this.t('unitDay')} ${h % 24} ${this.t('unitHour')}`
      : `${h} ${this.t('unitHour')}`;
  }

  kpiItems = computed(() => {
    const k = this.kpis();
    const t = (x: string) => this.t(x);
    const cur = k.currency || '—';
    const perDay = `${cur}/${t('perDay')}`;
    const rf = this.refill();
    const untilFoot =
      !rf || rf.nextTs === null
        ? t('noRefill')
        : [
            (rf.nextTs >= Date.now()
              ? t('refillIn')
              : t('refillOverdue')
            ).replace('{n}', this.fmtSpan(rf.nextTs - Date.now())),
            t('refillAvgGap').replace('{n}', String(Math.round(rf.avgGapH!))),
          ].join(' · ');
    return [
      {
        label: t('latestRefill'),
        value: rf ? this.fmtDay(rf.latest.timestamp) : '—',
        foot: rf
          ? `${this.fmtTime(rf.latest.timestamp)} · ${this.fmt(rf.latest.bags, 0, ` ${t('bags')}`)}`
          : t('noRefill'),
        accent: 'accent-purple',
        icon: '↻',
      },
      {
        label: t('refillUntil'),
        value: rf?.nextTs
          ? `${this.fmtDay(rf.nextTs)} ${this.fmtTime(rf.nextTs)}`
          : '—',
        foot: untilFoot,
        accent: 'accent-red',
        icon: '◷',
      },
      {
        label: t('recordedPellets'),
        value: this.fmt(k.totalBags, 0, ` ${t('bags')}`),
        foot: this.fmt(k.totalKg, 0, ' kg'),
        accent: 'accent-orange',
        icon: '▤',
      },
      {
        label: t('averageConsumption'),
        value: this.fmt(k.averageBagsPerDay, 1, ` ${t('bagsPerDay')}`),
        foot: `${this.fmt(k.averageKgPerDay, 1, ` ${t('kgPerDay')}`)} · ${t('latest')}: ${this.fmt(k.latestKgPerDay, 1, ` ${t('kgPerDay')}`)}`,
        accent: 'accent-cyan',
        icon: '↗',
      },
      {
        label: t('dailyHeatingCost'),
        value: this.fmt(k.latestCostPerDay, 2, ` ${perDay}`),
        foot: `${t('seasonAverage')}: ${this.fmt(k.averageCostPerDay, 2, ` ${perDay}`)}`,
        accent: 'accent-blue',
        icon: '€',
      },
      {
        label: t('pelletStock'),
        value:
          k.stockBags == null ? '—' : this.fmt(k.stockBags, 0, ` ${t('bags')}`),
        foot:
          k.stockKg == null
            ? t('noStock')
            : `${this.fmt(k.stockKg, 0, ' kg')} · ${this.fmt(k.estimatedDaysRemaining, 0, ` ${t('estimatedDays')}`)}`,
        accent: 'accent-green',
        icon: '◫',
      },
    ];
  });

  settings = computed(() => {
    const l = this.latest();
    const t = (x: string) => this.t(x);
    const show = (v: unknown, unit: string) =>
      v === null || v === undefined || v === '' ? '—' : `${v}${unit}`;
    return [
      { label: t('feed'), value: show(l?.feed, 's') },
      { label: t('pause'), value: show(l?.pause, 's') },
      { label: t('fan'), value: show(l?.fan, '%') },
      { label: t('targetTemp'), value: show(l?.targetTemp, '°C') },
      { label: t('correction'), value: show(l?.correction, '') },
      { label: t('cleaner'), value: show(l?.cleaner, '') },
    ];
  });

  /** Прогнозна дата на свършване: днес + estimatedDaysRemaining */
  runOutDate = computed(() => {
    const days = this.kpis().estimatedDaysRemaining;
    if (days == null || !Number.isFinite(days)) return '—';
    return new Date(Date.now() + days * 86_400_000).toLocaleDateString(
      this.locale(),
      { day: 'numeric', month: 'short', year: 'numeric' },
    );
  });

  climate = viewChild(ClimateComponent);

  refreshing = computed(() =>
    this.view() === 'climate' ? !!this.climate()?.refreshing() : this.loading(),
  );

  /** Reloads the data of the tab that is currently open. */
  refresh() {
    switch (this.view()) {
      case 'climate':
        this.climate()?.refresh();
        break;
      case 'compare':
        this.loadOverview();
        break;
      default:
        if (this.selectedSeason()) this.loadSeason(this.selectedSeason());
        else this.loadSeasons();
    }
  }

  // ---- lifecycle ----
  ngOnInit(): void {
    document.title = this.t('appTitle');
    // The climate tab (default) loads itself; heating data loads the first time its tabs are opened.
  }

  private loadSeasons(): void {
    this.seasonsRequested = true;
    this.loading.set(true);
    this.api.seasons().subscribe({
      next: (res) => {
        if (!Array.isArray(res)) {
          this.seasonsRequested = false;
          return this.fail(res?.error || this.t('serverNoData'));
        }
        this.sheets.set(res);
        if (!res.length) {
          this.seasonsRequested = false;
          return this.fail(this.t('noSeasonTabs'));
        }
        this.loadSeason((res.find((s) => s.recordCount > 0) ?? res[0]).name);
      },
      error: (e) => {
        this.seasonsRequested = false;
        this.fail(e);
      },
    });
  }

  ngOnDestroy(): void {
    this.destroyCharts();
  }

  // ---- helpers used by the template ----
  t = (key: string) => this.i18n.t(key);
  num = (v: Num, digits = 1) =>
    v === null || v === undefined || !Number.isFinite(Number(v))
      ? '—'
      : Number(v).toFixed(digits);
  fmt = (v: Num, digits = 1, suffix = '') =>
    v === null || v === undefined ? '—' : `${this.num(v, digits)}${suffix}`;
  burner = (r: SeasonRecord) =>
    [r.feed, r.pause, r.fan].filter(Boolean).join(' / ') || '—';
  private bagsOf = (r: SeasonRecord) =>
    r.bagsPerDay ?? (r.kgPerDay == null ? null : r.kgPerDay / KG_PER_BAG);

  // ---- actions ----
  onSeasonChange(e: Event) {
    this.loadSeason((e.target as HTMLSelectElement).value);
  }

  onLangChange(e: Event) {
    this.i18n.set((e.target as HTMLSelectElement).value as Lang);
    if (this.view() === 'season' && this.seasonData())
      this.renderSeasonCharts();
    if (this.view() === 'compare' && this.overviewData())
      this.renderComparisonCharts();
  }

  switchView(view: View) {
    this.view.set(view);
    if ((view === 'season' || view === 'history') && !this.seasonsRequested)
      this.loadSeasons();
    // The canvas must be visible before Chart.js measures it, so wait for the class change.
    if (view === 'season' && this.seasonData())
      setTimeout(() => this.renderSeasonCharts());
    if (view === 'compare') {
      if (this.overviewData()) setTimeout(() => this.renderComparisonCharts());
      else this.loadOverview();
    }
  }

  private loadSeason(name: string) {
    this.selectedSeason.set(name);
    this.loading.set(true);
    this.error.set('');
    this.api.season(name).subscribe({
      next: (data) => {
        this.loading.set(false);
        if (!data || data.error)
          return this.fail(data?.error || this.t('serverNoData'));
        this.seasonData.set(data);
        this.updatedAt.set(
          `${this.t('updated')} ${new Date().toLocaleTimeString(
            this.i18n.lang() === 'bg' ? 'bg-BG' : 'en-GB',
            { hour: '2-digit', minute: '2-digit' },
          )}`,
        );
        if (this.view() === 'season') this.renderSeasonCharts();
      },
      error: (e) => this.fail(e),
    });
  }

  private loadOverview() {
    this.loading.set(true);
    this.api.overview().subscribe({
      next: (data) => {
        this.loading.set(false);
        if (!data || data.error)
          return this.fail(data?.error || this.t('comparisonError'));
        this.overviewData.set(data);
        if (this.view() === 'compare')
          setTimeout(() => this.renderComparisonCharts());
      },
      error: (e) => this.fail(e),
    });
  }

  private fail(e: unknown) {
    this.loading.set(false);
    this.error.set(
      typeof e === 'string' ? e : (e as Error)?.message || String(e),
    );
  }

  // ---- charts ----
  private css = (name: string) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  private destroyCharts(keys: string[] = Object.keys(this.charts)) {
    keys.forEach((k) => {
      this.charts[k]?.destroy();
      delete this.charts[k];
    });
  }

  private chartBase(): any {
    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: this.css('--muted'),
            usePointStyle: true,
            pointStyle: 'circle',
            boxWidth: 7,
            boxHeight: 7,
            padding: 16,
            font: { size: 10 },
          },
        },
        tooltip: {
          backgroundColor: '#08121c',
          borderColor: this.css('--border'),
          borderWidth: 1,
          titleColor: '#fff',
          bodyColor: '#dce6ef',
          padding: 11,
          displayColors: true,
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: this.css('--muted'),
            maxRotation: 0,
            autoSkip: true,
            maxTicksLimit: 8,
            font: { size: 9 },
          },
          border: { color: this.css('--border') },
        },
        y: {
          beginAtZero: true,
          grid: { color: '#26374788' },
          ticks: { color: this.css('--muted'), font: { size: 9 } },
          border: { display: false },
        },
      },
    };
  }

  private line(label: string, data: Num[], color: string, fill = false): any {
    return {
      label,
      data,
      borderColor: color,
      backgroundColor: fill ? `${color}20` : color,
      borderWidth: 1,
      pointRadius: 2,
      pointHoverRadius: 5,
      tension: 0.32,
      fill,
      spanGaps: true,
    };
  }

  private renderSeasonCharts() {
    this.destroyCharts(['consumption', 'temperature', 'cost']);
    const records = this.records();
    const t = (x: string) => this.t(x);
    const labels = records.map((r) => r.dateLabel);
    const base = this.chartBase();
    const css = this.css;

    // consumption (bags/day on the left axis, kg/day on the right)
    const bags = records.map(this.bagsOf);
    const maxBags = Math.max(
      0.5,
      ...bags.filter((v): v is number => v !== null),
    );
    const step = [0.5, 1, 2, 5, 10, 20].find((s) => maxBags / s <= 6) ?? 50;
    const axisMax = Math.ceil(maxBags / step) * step;
    const axisTitle = (text: string) => ({
      display: true,
      text,
      color: css('--muted'),
      font: { size: 9 },
    });
    this.charts['consumption'] = new Chart(this.consumptionRef.nativeElement, {
      type: 'line',
      data: {
        labels,
        datasets: [this.line(t('bagsPerDay'), bags, css('--orange'), true)],
      },
      options: {
        ...base,
        plugins: {
          ...base.plugins,
          legend: { display: false },
          tooltip: {
            ...base.plugins.tooltip,
            callbacks: {
              label: (c: any) =>
                c.parsed.y == null
                  ? ''
                  : `${this.fmt(c.parsed.y, 2)} ${t('bagsPerDay')} · ${this.fmt(records[c.dataIndex].kgPerDay)} ${t('kgPerDay')}`,
            },
          },
        },
        scales: {
          ...base.scales,
          y: {
            ...base.scales.y,
            min: 0,
            max: axisMax,
            ticks: { ...base.scales.y.ticks, stepSize: step },
            title: axisTitle(t('bagsPerDay')),
          },
          y1: {
            ...base.scales.y,
            position: 'right',
            min: 0,
            max: axisMax * KG_PER_BAG,
            ticks: { ...base.scales.y.ticks, stepSize: step * KG_PER_BAG },
            grid: { drawOnChartArea: false },
            title: axisTitle(t('kgPerDay')),
          },
        },
      },
    });

    this.charts['temperature'] = new Chart(this.temperatureRef.nativeElement, {
      type: 'line',
      data: {
        labels,
        datasets: [
          this.line(
            t('outdoorWeb'),
            records.map((r) => r.webAvg),
            css('--blue'),
          ),
          this.line(
            t('outdoorEsp'),
            records.map((r) => r.espAvg),
            css('--cyan'),
          ),
          this.line(
            t('waterMax'),
            records.map((r) => r.waterMax),
            css('--orange'),
          ),
          this.line(
            t('f1Max'),
            records.map((r) => r.f1Max),
            css('--green'),
          ),
          this.line(
            t('f2Max'),
            records.map((r) => r.f2Max),
            css('--purple'),
          ),
        ],
      },
      options: base,
    });

    const cur = this.currency();
    this.charts['cost'] = new Chart(this.costRef.nativeElement, {
      type: 'line',
      data: {
        labels,
        datasets: [
          this.line(
            `${cur}/${t('perDay')}`,
            records.map((r) => r.costPerDay),
            css('--orange'),
            true,
          ),
        ],
      },
      options: {
        ...base,
        plugins: { ...base.plugins, legend: { display: false } },
        scales: {
          ...base.scales,
          y: { ...base.scales.y, title: axisTitle(`${cur} ${t('perDay')}`) },
        },
      },
    });
  }

  private renderComparisonCharts() {
    this.destroyCharts(['monthlyAverage', 'monthlyTotal']);
    const data = this.overviewData();
    if (!data) return;
    const labels = this.i18n.lang() === 'bg' ? MONTHS_BG : data.monthNames;
    const base = this.chartBase();
    const P = this.palette;

    this.charts['monthlyAverage'] = new Chart(
      this.monthlyAvgRef.nativeElement,
      {
        type: 'line',
        data: {
          labels,
          datasets: data.seasons.map((s, i) =>
            this.line(
              s.name,
              s.months.map((m) => m.averageKgPerDay ?? 0),
              P[i % P.length],
            ),
          ),
        },
        options: base,
      },
    );

    this.charts['monthlyTotal'] = new Chart(
      this.monthlyTotalRef.nativeElement,
      {
        type: 'bar',
        data: {
          labels,
          datasets: data.seasons.map((s, i) => ({
            label: s.name,
            data: s.months.map((m) => m.recordedKg),
            backgroundColor: `${P[i % P.length]}bb`,
            borderRadius: 4,
            maxBarThickness: 22,
          })),
        },
        options: base,
      },
    );
  }
}

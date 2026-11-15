type N = number | null;

export interface SeasonListItem {
  name: string;
}

export interface SeasonRecord {
  rowNumber: number;
  timestamp: number;
  date: string; // yyyy-MM-dd
  dateLabel: string; // dd MMM yyyy
  bags: N;
  kg: N;
  hours: N;
  bagsPerDay: N;
  kgPerHour: N;
  kgPerDay: N;
  costPerDay: N;
  webMin: N;
  webMax: N;
  webAvg: N;
  weather: string;
  espMin: N;
  espMax: N;
  espAvg: N;
  waterMax: N;
  f1Max: N;
  f2Max: N;
  feed: string;
  pause: string;
  fan: string;
  targetTemp: N;
  correction: N;
  cleaner: string;
  info: string;
  stockBags: N;
  stockKg: N;
}

export interface Kpis {
  totalKg: number;
  totalBags: number;
  totalHours: number;
  averageKgPerDay: N;
  averageBagsPerDay: N;
  averageCostPerDay: N;
  latestKgPerDay: N;
  latestCostPerDay: N;
  stockBags: N;
  stockKg: N;
  pricePerBag: N;
  currency: string;
  estimatedDaysRemaining: N;
  latest: SeasonRecord | null;
}

export interface SeasonData {
  season: string;
  currency: string;
  pricePerBag: N;
  records: SeasonRecord[];
  kpis: Kpis;
  error: string | null;
}

export interface OverviewSeason {
  name: string;
  currency: string;
  recordCount: number;
  totalKg: number;
  averageKgPerDay: N;
  months: {
    month: string;
    averageKgPerDay: N;
    recordedKg: number;
    recordedCost: N;
  }[];
}

export interface OverviewData {
  isOverview: true;
  monthNames: string[];
  seasons: OverviewSeason[];
  error: string | null;
}

/** One reading of the climate sensors. `t` = epoch milliseconds. */
export interface ClimatePoint {
  t: number;
  floor0: N;
  floor1: N;
  floor2: N;
  out: N;
  hot: N;
  cold: N;
  pressure: N;
  humidity: N;
}

/** Server shape: rows are [isoTime, floor0, floor1, floor2, out, hot, cold, pressure, humidity]. */
export interface ClimateResponse {
  rows: [string, N, N, N, N, N, N, N, N][];
  error?: string;
}

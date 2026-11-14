import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ClimateResponse,
  OverviewData,
  SeasonData,
  SeasonListItem,
} from '../models';
import {
  API_KEY,
  PELLETS_URL,
  TEMPERATURE_URL,
} from '../../environments/environment';

/**
 * Talks to the Apps Script web app.
 * Do NOT add custom headers here: they trigger a CORS preflight, which Apps Script can't answer.
 */
@Injectable({ providedIn: 'root' })
export class PelletApiService {
  private http = inject(HttpClient);

  private get<T>(url: string, sheet?: string): Observable<T> {
    let params = new HttpParams().set('format', 'json');
    if (sheet) params = params.set('sheet', sheet);
    if (API_KEY) params = params.set('key', API_KEY);
    return this.http.get<T>(url, { params });
  }

  /** ?format=json */
  seasons(): Observable<SeasonListItem[] | { error: string }> {
    return this.get(PELLETS_URL);
  }

  /** ?format=json&sheet=26-27 */
  season(name: string): Observable<SeasonData> {
    return this.get<SeasonData>(PELLETS_URL, name);
  }

  /** ?format=json&sheet=Overview */
  overview(): Observable<OverviewData> {
    return this.get<OverviewData>(PELLETS_URL, 'Overview');
  }

  /** ?format=json&sheet=climate  (last 72 h of the `temps` tab) */
  climate(): Observable<ClimateResponse> {
    return this.get<ClimateResponse>(TEMPERATURE_URL, 'climate');
  }
}

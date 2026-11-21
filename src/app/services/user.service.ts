import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';
import { environment, IP_URL } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserIp(): Observable<any> {
    return this.http.get('https://api.ipify.org?format=json'); // Use any IP API
  }

  sendUserData(userData: any): Observable<any> {
    return this.http
      .post(IP_URL, JSON.stringify(userData), {
        headers: {
          'Content-Type': 'text/plain',
        },
        responseType: 'text',
      })
      .pipe(timeout(30000));
  }

  getAll(filter: boolean, ip: string, page: number): Observable<any> {
    return this.http
      .get(
        `${environment.backendUrl}/getVisitors?filter=${filter}&ip=${ip}&page=${page}&size=${environment.pageSize}`,
      )
      .pipe(timeout(300000));
  }

  getStat(): Observable<any> {
    return this.http
      .get(`${environment.backendUrl}/getStatistics`)
      .pipe(timeout(300000));
  }

  getLocation(ip: string): Observable<any> {
    return this.http.get(`https://ipapi.co/${ip}/json/`);
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
}

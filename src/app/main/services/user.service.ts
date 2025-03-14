import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';
import { environment } from '../../../environments/environment';

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
      .post(`${environment.backendUrl}/insertVisitor`, userData)
      .pipe(timeout(300000));
  }

  getAll(filter: boolean, ip: string, page: number): Observable<any> {
    return this.http
      .get(
        `${environment.backendUrl}/getVisitors?filter=${filter}&ip=${ip}&page=${page}&size=${environment.pageSize}`
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
}

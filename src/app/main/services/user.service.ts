import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    return this.http.post(`${environment.backendUrl}/user`, userData);
  }

  getStat(filter: boolean): Observable<any> {
    return this.http.get(`${environment.backendUrl}/logs?filter=${filter}`);
  }

  getLocation(ip: string): Observable<any> {
    return this.http.get(`https://ipapi.co/${ip}/json/`);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

interface LoginResponse {
  token: string;
}

interface JwtResponse {
  roles: string[];
  token: string;
  id: number;
  username: string;
  email: string;

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:7777/api/auth';

  constructor(private http: HttpClient) { }


login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<JwtResponse>(`${this.baseUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token)
        localStorage.setItem('id', String(response.id))
      }),
      map(response => response.token)
    );
  }

  logout(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
  }

  register(registerData: { username: string, email : string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/registration`, registerData);
  }

}

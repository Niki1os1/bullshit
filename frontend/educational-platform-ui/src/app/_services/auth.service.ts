import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

interface LoginResponse {
  token: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:7777/api/auth';

  constructor(private http: HttpClient) { }



  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials).pipe(
      tap(response => localStorage.setItem('token', response.token)),
      map(response => response.token)
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | undefined {
    const token = localStorage.getItem('token');
    return token === null ? (console.log('Token is not set'), undefined) : token;
  }

  register(registerData: { username: string, email : string, role : string[], password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/registration`, registerData);
  }

}

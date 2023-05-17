import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

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

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  

login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<JwtResponse>(`${this.baseUrl}/login`, credentials).pipe(
      tap(response => {
        this.cookieService.set('token', response.token)
        this.cookieService.set('roles', JSON.stringify(response.roles));
        this.cookieService.set('email', response.email)
        this.cookieService.set('id', String(response.id))
      }),
      map(response => response.token)
    );
  }

  logout(): void {
    this.cookieService.delete('token');
    this.cookieService.delete('roles');
    this.cookieService.delete('id');
  }

  getToken(): string | undefined {
    const token = this.cookieService.get('token');
    return token === null ? (console.log('Token is not set'), undefined) : token;
  }

  register(registerData: { username: string, email : string, role : string[], password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/registration`, registerData);
  }

}

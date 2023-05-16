import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = 'http://localhost:7777/api/user';

  constructor(private http: HttpClient) { }

  getUserRoles() {
    return this.http.get<string[]>(`${this.API_URL}/role`);
  }
}

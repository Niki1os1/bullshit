import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';
import * as jwt_decode from 'jwt-decode';

import {User} from '../_models/user'
import * as http from "http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private token  = localStorage.getItem('token');

  private readonly API_URL = 'http://localhost:7777/api/user';

  constructor(private http: HttpClient) {
  }

  getUsername(){
    // @ts-ignore
    const decodedToken = jwt_decode(this.getToken());
    return decodedToken.username;
  }

  getUserById() {

  }

  getToken(): string | undefined {
    const token = localStorage.getItem('token');
    return token === null ? (console.log('Token is not set'), undefined) : token;
  }



  getRoles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_URL}/role`);
  }

}

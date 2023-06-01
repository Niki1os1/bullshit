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


  getToken(): string | undefined {
    const token = localStorage.getItem('token');
    return token === null ? (console.log('Token is not set'), undefined) : token;
  }


  getRoles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_URL}/role`);
  }

  editUser(editData: Partial<{ username: string, email: string, first_name: string, last_name: string }>, userId : string){
    return this.http.put(`${this.API_URL}/edit-user/${userId}`, editData);
  }

  getUserById(userId : string){
    return this.http.get<User>(`${this.API_URL}/${userId}`);
  }

  getAllUser(){
    // return this.http.get<User>(`${this.API_URL}/user/${userId}`);
  }

}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';

import {User} from '../_models/user'


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = 'http://localhost:7777/api/user';

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  getUserById() {

  }

  getRoles(): string[] {
    const rolesString: string = this.cookieService.get('roles');
    const roles: string[] = JSON.parse(rolesString);
    return roles;
  }

}

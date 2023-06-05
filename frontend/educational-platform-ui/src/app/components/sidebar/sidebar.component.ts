import { Component, OnInit } from '@angular/core';
import {UserService} from "../../_services/user.service";
import {AuthService} from "../../_services/auth.service";

declare const $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userRoles: string[] = [];

  constructor(private userService: UserService) { }

  public isTeacher(): boolean {
    return  this.userRoles.includes('ROLE_TEACHER')
  }

  isAdmin() {
    return  this.userRoles.includes('ROLE_ADMIN')
  }

  isAuthorized(): boolean {
    return !this.userService.getToken();
  }
  ngOnInit() {
    this.userService.getRoles().subscribe(
      roles => {
        this.userRoles = roles;
      },
      error => {
        console.log('Error retrieving user roles: ', error);
      }
    );
  }
  isMobileMenu() {
    if (window.innerWidth <= 991) {
      return false;
    }
    return true;
  };

}

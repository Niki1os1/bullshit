import { Component, OnInit } from '@angular/core';
import {UserService} from "../../_services/user.service";

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
    console.log(this.userRoles.includes('ROLE_TEACHER'))

    return  this.userRoles.includes('ROLE_TEACHER')
  }

  ngOnInit() {
    this.userRoles = this.userService.getRoles();
  }
  isMobileMenu() {
    if (window.innerWidth <= 991) {
      return false;
    }
    return true;
  };
}

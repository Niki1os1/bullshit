import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm : FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{5,20}[0-9]{1,10}?$/)]],
      password: ['', Validators.required]
    });
  }

  onSubmit() : void {
    // if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
        .subscribe( () => {
          this.router.navigate(['/']); }
        );
    // }
  }
}

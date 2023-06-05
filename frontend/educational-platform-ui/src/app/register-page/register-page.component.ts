import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  registerForm: FormGroup;
  // selectedRole: Set<string> = new Set<string>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {

    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{3,14}[0-9]{3,14}$/)]],
      email: ['', [Validators.required, Validators.email]],
      // role : [],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.matchPasswords('password', 'confirmPassword')
    });
  }

  onSubmit(): void {
    const registerData = this.registerForm.value;
    delete registerData.confirmPassword;
    this.authService.register(registerData).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  private matchPasswords(passwordKey: string, confirmPasswordKey: string): any {
    return (group: FormGroup) => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordsMismatch: true });
      } else {
        confirmPassword.setErrors(null);
      }
    };
  }
}

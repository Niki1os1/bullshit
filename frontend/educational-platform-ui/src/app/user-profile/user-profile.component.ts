import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../_services/user.service";
import {ErrorStateMatcher} from "@angular/material/core";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{

  editForm: FormGroup;

  private dataLastName: string | undefined;
  private dataFirstName: string | undefined;
  private dataUsername: string | undefined;
  private dataEmail: string | undefined;

  matcherUsername = new MyErrorStateMatcher();
  matcherEmail = new MyErrorStateMatcher();
  matcherLastName = new MyErrorStateMatcher();
  matcherFirstName = new MyErrorStateMatcher();
  private userId: string | null | undefined;


  public getUsername(){
    return this.dataUsername;
  }
  public getEmail(){
    return this.dataEmail;
  }
  public getFirstName(){
    return this.dataFirstName == null ? 'null' : this.dataFirstName;
  }
  public getLastName(){
    return this.dataLastName == null ? 'null' : this.dataLastName;
  }

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,) {


    this.editForm = this.formBuilder.group({
      username: ['', [Validators.pattern(/^[a-zA-Z]{4,14}[0-9]{0,14}$/)]],
      email: ['', [Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      last_name: ['', [Validators.pattern(/^[ёЁа-яА-Я]{2,26}$/)]],
      first_name: ['', [Validators.pattern(/^[ёЁа-яА-Я]{2,19}$/)]],
    });


  }

  ngOnInit() {
    this.userId = localStorage.getItem('id');
    if (this.userId != null) {
      this.userService.getUserById(this.userId).subscribe(data => {
        this.dataEmail = data.email;
        this.dataUsername = data.username;
        this.dataLastName = data.last_name;
        this.dataFirstName = data.first_name;
      });
    }
  }

  editUser() {
    const editData = this.editForm.value;
    if(this.userId!=null)
      this.userService.editUser(editData, this.userId);
  }
}

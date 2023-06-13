import { Component } from '@angular/core';
import {CourseService} from "../_services/course.service";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {ErrorStateMatcher} from "@angular/material/core";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent {
  selectedFile!: File | null;
  data : FormGroup
  selectedFileName = '';
  fileSelected = false;

  matcherTitle = new MyErrorStateMatcher();
  matcherCategory = new MyErrorStateMatcher();

  //titleFormControl = new FormControl('', [Validators.required, Validators.pattern(/^[а-яА-Я\s]{5,100}$/)]);

  constructor(private courseService : CourseService,
              private formBuilder: FormBuilder,
              private router: Router
  ) {

    this.data = this.formBuilder.group({
      category: ['', [Validators.required, Validators.pattern(/^[-а-яА-ЯёЁ,.()\s]{5,300}$/)]],
      title: ['', [Validators.required, Validators.pattern(/^[-а-яА-ЯёЁ\s]{5,100}$/)]],
      userId : localStorage.getItem('id')
    });
  }

  onFileSelected(event: Event) {
    this.selectedFile = (event.target as HTMLInputElement).files?.[0] || null;
    this.selectedFileName = this.selectedFile?.name || '';
    this.fileSelected = true;
  }

  createCourse() {
    const data = this.data.value;
    // @ts-ignore
    this.courseService.createCourse( data, this.selectedFile).subscribe(() => {
      this.router.navigate(['/my-course']);
    });
  }

  selectFile() {
    const fileInput: HTMLInputElement | null = document.getElementById('icon') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Сбросить значение input файла
      fileInput.click();
    }
  }

  clearFile() {
    this.selectedFile = null;
    this.selectedFileName = '';
    this.fileSelected = false;
  }
}

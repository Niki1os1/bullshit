import { Component } from '@angular/core';
import {CourseService} from "../_services/course.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent {
  selectedFile!: File;
  data : FormGroup
  private selectedFileName = '';
  private  fileSelected = false;


  constructor(private courseService : CourseService,
              private formBuilder: FormBuilder,
              private router: Router,
              private cookieService: CookieService
  ) {

    this.data = this.formBuilder.group({
      category: ['', [Validators.required, Validators.pattern(/^[а-яА-Я\s]{5,100}$/)]],
      title: ['', [Validators.required, Validators.pattern(/^[а-яА-Я\s]{5,100}$/)]],
      userId : this.cookieService.get('id')
    });
  }

  onFileSelected(event: Event) {
    // @ts-ignore
    this.selectedFile = event.target.files[0];
    this.selectedFileName = this.selectedFile.name;
    this.fileSelected = true;
  }

  createCourse() {
    const data = this.data.value;
    this.courseService.createCourse( data, this.selectedFile).subscribe(() => {
      this.router.navigate(['/my-course']);
    });
  }
}

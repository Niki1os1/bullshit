import {AfterViewInit, Component} from '@angular/core';
import {Course} from "../_models/course.model";
import {CourseService} from "../_services/course.service";
import { CookieService } from 'ngx-cookie-service';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-my-course',
  templateUrl: './my-course.component.html',
  styleUrls: ['./my-course.component.css']
})
export class MyCourseComponent implements AfterViewInit{

  constructor(
    private courseService: CourseService,
    private cookieService : CookieService,
    public dialog: MatDialog

  ) {
  }

  openDialog(course: Course) {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      data: course
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.courseService.deleteCourse(course.id).subscribe(() => {
          // Курс успешно удален
        }, error => {
          // Обработка ошибки удаления курса
        });
      }
    });
  }

  ngAfterViewInit(): void {
    const id = Number(this.cookieService.get('id'));
    this.courseService.getCourseByUserId(id).subscribe(
      (courses: Course[]) => {
        this.courses = courses;
      },
      (error) => {
        console.log('Error retrieving courses: ', error);
      }
    );
  }
  courses: Course[] | undefined;

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {}



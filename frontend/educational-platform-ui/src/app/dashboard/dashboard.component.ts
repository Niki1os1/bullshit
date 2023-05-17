import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {Course} from "../_models/course.model";
import {CourseService} from "../_services/course.service";
import {FormControl} from "@angular/forms";
import { LowerCasePipe} from "@angular/common";
import { map, startWith } from 'rxjs/operators';
import {Observable} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})



export class DashboardComponent implements AfterViewInit {
  courses: Course[] | undefined;

  filter = new FormControl('', { nonNullable: true });
  filteredCourses$: Observable<Course[]> | undefined;

  constructor(private courseService: CourseService,
              private changeDetectorRef: ChangeDetectorRef,
              private lowerCasePipe: LowerCasePipe) {
  }

  search(text: string): Course[] {
    // @ts-ignore
    return this.courses.filter((course) => {
      const term = this.lowerCasePipe.transform(text);
      const courseTitle = this.lowerCasePipe.transform(course.title);
      const courseCategory = this.lowerCasePipe.transform(course.category);

      return (
        courseTitle.includes(term) ||
        courseCategory.includes(term)
      );
    });
  }


  ngAfterViewInit() {
    this.courseService.getCourses().subscribe(
      (courses: Course[]) => {
        this.courses = courses;
        this.filteredCourses$ = this.filter.valueChanges.pipe(
          startWith(''),
          map((text) => this.search(text))
        );
        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        console.log('Error retrieving courses: ', error);
      }
    );
  }
}

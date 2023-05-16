import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Course} from "../_models/course.model";
import {CourseService} from "../_services/course.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})



export class DashboardComponent implements AfterViewInit {
  courses: Course[] | undefined;

  private cardHeaderColors = ['primary', 'info', 'success', 'warning', 'danger'];
  private currentColorIndex = 0;

  constructor(private courseService: CourseService, private changeDetectorRef: ChangeDetectorRef) { }
  getNextCardHeaderStyle() {
    const currentColor = this.cardHeaderColors[this.currentColorIndex];
    this.currentColorIndex = (this.currentColorIndex + 1) % this.cardHeaderColors.length;
    return { 'border-top-color': currentColor, 'border-left-color': currentColor, 'border-right-color': currentColor };
  }

  ngAfterViewInit() {
    this.courseService.getCourses().subscribe(
      (courses: Course[]) => {
        this.courses = courses;
        this.changeDetectorRef.detectChanges(); // Вызываем метод detectChanges()

      },
      (error) => {
        console.log('Error retrieving courses: ', error);
      }
    );
  }
}

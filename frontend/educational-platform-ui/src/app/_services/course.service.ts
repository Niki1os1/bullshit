import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../_models/course.model';
import {FormControl} from "@angular/forms";

@Injectable()
export class CourseService {
  private apiUrl = 'http://localhost:7777/api/courses';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  getCourseById(id: number): Observable<Course> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Course>(url);
  }

  getCourseByUserId(userId: number): Observable<Course[]> {
    const url = `${this.apiUrl}/my/${userId}`;
    return this.http.get<Course[]>(url);
  }

  createCourse(data : {category : string, title : string, userId : string}, file: File): Observable<any> {
    const formData = new FormData()
    formData.append('file', file, file.name)
    formData.append('category', data.category)
    formData.append('title', data.title)
    formData.append('userId', data.userId)

    return this.http.post(this.apiUrl, formData);
  }

  deleteCourse(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  // uploadVideo(courseId: number) : Observable<any>{
  //   const url = `${this.apiUrl}/my/${userId}`;
  //   return this.http.get<Course[]>(url);
  // }

}

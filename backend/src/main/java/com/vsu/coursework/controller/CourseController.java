package com.vsu.coursework.controller;

import com.vsu.coursework.model.Course;
import com.vsu.coursework.payload.response.UploadFileResponse;
import com.vsu.coursework.service.CourseService;
import com.vsu.coursework.service.VideoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(value = "/api/courses")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @Autowired
    private VideoService videoService;


    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> courses = courseService.getAllCourses();
        return new ResponseEntity<>(courses, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        Course courses = courseService.getCourseById(id);
        return new ResponseEntity<>(courses, HttpStatus.OK);
    }

    @GetMapping("/my/{userId}")
    public ResponseEntity<List<Course>> getCourseByUserId(@PathVariable Long userId) {
        List<Course> courses = courseService.getCoursesByUserId(userId);
        if (!courses.isEmpty()) {
            return new ResponseEntity<>(courses, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public UploadFileResponse createCourse(@Valid @RequestParam("userId") String userId, @RequestParam("category") String category, @RequestParam("title") String title, @RequestParam("file") MultipartFile file) throws IOException {
        return courseService.saveCourse(Long.parseLong(userId), category, title, file);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) throws IOException {
        videoService.deleteVideoInCourse(id);
        courseService.deleteCourse(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

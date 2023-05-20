import {Component, OnInit} from '@angular/core';
import {VideoService} from "../_services/video.service";
import {VideoDto} from "../_models/video-dto";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-video-of-the-course',
  templateUrl: './video-of-the-course.component.html',
  styleUrls: ['./video-of-the-course.component.css']
})
export class VideoOfTheCourseComponent implements OnInit{

  featuredVideos: Array<VideoDto> = [];

  constructor(private videoService: VideoService,
              private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    const courseId = this.activatedRoute.snapshot.paramMap.get('courseId');
    if (courseId != null) {
      this.videoService.getAllVideos(courseId).subscribe(response => {
        this.featuredVideos = response;
      })
    }
  }

}

import {Component, OnInit} from '@angular/core';
import {VideoDto} from "../_models/video-dto";
import {VideoService} from "../_services/video.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-course-videos',
  templateUrl: './course-videos.component.html',
  styleUrls: ['./course-videos.component.css']
})
export class CourseVideosComponent implements OnInit{
  courseId: string | null | undefined;
  featuredVideos: Array<VideoDto> = [];

  constructor(private videoService: VideoService,
              private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.courseId = this.activatedRoute.snapshot.paramMap.get('courseId');
    if (this.courseId != null) {
      this.videoService.getAllVideos(this.courseId).subscribe(response => {
        this.featuredVideos = response;
      })
    }
  }
}

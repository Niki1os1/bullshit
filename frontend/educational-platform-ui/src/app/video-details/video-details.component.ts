import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {VideoService} from "../_services/video.service";
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.css']
})
export class VideoDetailsComponent implements OnInit{
  videoId!: string | null;
  videoUrl!: string;
  videoTitle!: string;
  videoDescription!: string;
  tags: Array<string> = [];
  videoAvailable: boolean = false;
  likeCount: number = 0;
  dislikeCount: number = 0;
  viewCount: number = 0;

  constructor(private activatedRoute: ActivatedRoute,
              private videoService: VideoService,
              ) {
    this.videoId = this.activatedRoute.snapshot.paramMap.get('videoId');
    // @ts-ignore
    this.videoService.getVideo(this.videoId).subscribe(data => {
      this.videoUrl = data.videoUrl;
      this.videoTitle = data.title;
      this.videoDescription = data.description;
      this.videoAvailable = true;
    })
  }

  ngOnInit(): void {
  }
}

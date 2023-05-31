import {Component, Input, OnInit} from '@angular/core';
import {VgApiService} from '@videogular/ngx-videogular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit{

  preload: string = 'auto';
  api!: VgApiService;

  constructor() {}

  onPlayerReady(api: VgApiService) {
    this.api = api;
  }

  @Input()
  videoUrl!: string | '';

  ngOnInit(): void {
    console.log(this.videoUrl)
  }


}

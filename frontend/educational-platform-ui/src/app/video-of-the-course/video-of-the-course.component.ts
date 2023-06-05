import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {VideoService} from "../_services/video.service";
import {VideoDto} from "../_models/video-dto";
import {ActivatedRoute} from "@angular/router";
import {MatMenuTrigger} from "@angular/material/menu";
import {MatDialog} from "@angular/material/dialog";



@Component({
  selector: 'app-video-of-the-course',
  templateUrl: './video-of-the-course.component.html',
  styleUrls: ['./video-of-the-course.component.css']
})
export class VideoOfTheCourseComponent implements OnInit{

  activeMenu: string | null = null;
  @ViewChildren(MatMenuTrigger) menuTriggers!: QueryList<MatMenuTrigger>;



  courseId: string | null | undefined;
  featuredVideos: Array<VideoDto> = [];
  menu: any;

  constructor(private videoService: VideoService,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.courseId = this.activatedRoute.snapshot.paramMap.get('courseId');
    if (this.courseId != null) {
      this.videoService.getAllVideos(this.courseId).subscribe(response => {
        this.featuredVideos = response;
      })
    }
  }

  openMenu(event: MouseEvent, videoId: string): void {
    event.stopPropagation();
    this.activeMenu = this.activeMenu === videoId ? null : videoId;
    this.menuTriggers.forEach((menuTrigger) => {
      if (menuTrigger.menuData?.videoId === videoId) {
        if (this.activeMenu === videoId) {
          menuTrigger.openMenu();
        } else {
          menuTrigger.closeMenu();
        }
      }
    });
  }

  closeMenu(): void {
    this.activeMenu = null;
    this.menuTriggers.forEach((menuTrigger) => {
      menuTrigger.closeMenu();
    });
  }

  openDialog(videoId : string) {
    const dialogRef = this.dialog.open(DialogContentDeleteVideoDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.videoService.deleteVideo(videoId).subscribe(() => {
          window.location.reload();
        });
      }
    });
  }

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentDeleteVideoDialog {}


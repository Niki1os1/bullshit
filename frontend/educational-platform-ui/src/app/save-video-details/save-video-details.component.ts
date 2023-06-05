import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatChipEditedEvent, MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ActivatedRoute, Router} from "@angular/router";
import {VideoService} from "../_services/video.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {VideoDto} from "../_models/video-dto";

@Component({
  selector: 'app-save-video-details',
  templateUrl: './save-video-details.component.html',
  styleUrls: ['./save-video-details.component.css']
})
export class SaveVideoDetailsComponent{

  saveVideoDetailsForm: FormGroup;
  title: FormControl = new FormControl('');
  description: FormControl = new FormControl('');
  // videoStatus: FormControl = new FormControl('');
  selectable = true;
  removable = true;
  fileSelected = false;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];
  selectedFile!: File;
  selectedFileName = '';
  videoId = '';
  videoUrl!: string;
  thumbnailUrl!: string;

  constructor(private activatedRoute: ActivatedRoute, private videoService: VideoService,
              private matSnackBar: MatSnackBar,
              private router: Router,) {
    this.activatedRoute.params.subscribe(params => this.videoId= params['videoId']);
    this.videoService.getVideo(this.videoId).subscribe(data => {
      this.videoUrl = data.videoUrl.valueOf();
      this.thumbnailUrl = data.thumbnailUrl;
    })
    this.saveVideoDetailsForm = new FormGroup({
      title: this.title,
      description: this.description,
      // videoStatus: this.videoStatus,
    })
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tags.push(value);
    }

    event.chipInput!.clear();
  }

  remove(value: string): void {
    const index = this.tags.indexOf(value);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  edit(tag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(tag);
      return;
    }

    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index] = value;
    }
  }

  onFileSelected(event: Event) {
    // @ts-ignore
    this.selectedFile = event.target.files[0];
    this.selectedFileName = this.selectedFile.name;
    this.fileSelected = true;
  }

  saveVideo() {
    const videoMetaData: VideoDto = {
      "id": this.videoId,
      "title": this.saveVideoDetailsForm.get('title')?.value,
      "description": this.saveVideoDetailsForm.get('description')?.value,
      // "tags": this.tags,
      // "videoStatus": this.saveVideoDetailsForm.get('videoStatus')?.value,
      "videoUrl": this.videoUrl,
      "thumbnailUrl": this.thumbnailUrl,
      // "likeCount": 0,
      // "dislikeCount": 0,
      // "viewCount": 0
    }
    this.videoService.saveVideo(videoMetaData).subscribe(data => {
      this.matSnackBar.open("Метаданные видео успешно обновлены", "OK");
    })
  }

  onUpload() {
    this.videoService.uploadThumbnail(this.selectedFile, this.videoId)
      .subscribe(data => {
        this.thumbnailUrl = data.valueOf();

        this.matSnackBar.open("Загрузка заставки произошла успешно", "OK");
      });
  }
}

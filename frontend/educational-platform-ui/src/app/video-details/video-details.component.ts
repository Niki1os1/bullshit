import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {VideoService} from "../_services/video.service";
import {UserService} from "../_services/user.service";
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from "ngx-file-drop";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AnswerDto} from "../_models/answer-dto";

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.css']
})
export class VideoDetailsComponent implements OnInit{
  public file: NgxFileDropEntry[] = [];
  fileUploaded : boolean = false;
  fileEntry: FileSystemFileEntry | undefined;

  videoId!: string | null;
  videoUrl!: string;
  videoTitle!: string;
  videoDescription!: string;
  tags: Array<string> = [];
  videoAvailable: boolean = false;
  likeCount: number = 0;
  dislikeCount: number = 0;
  viewCount: number = 0;

  answers: AnswerDto[] = [];

  id = localStorage.getItem('id');
  // userFirstName : string;
  // userLastName : string;


  constructor(private activatedRoute: ActivatedRoute,
              private videoService: VideoService,
              private userService: UserService,
              private router: Router,
              private matSnackBar: MatSnackBar
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

  public dropped(file: NgxFileDropEntry[]) {
    this.file = file;
    for (const droppedFile of file) {

      if (droppedFile.fileEntry.isFile) {
        this.fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        this.fileEntry.file((file: File) => {

          console.log(droppedFile.relativePath, file);

          this.fileUploaded = true;
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event: any){
    console.log(event);
  }

  public fileLeave(event: any){
    console.log(event);
  }

  clearAnswer() {
    this.file = [];
    this.fileEntry = undefined;
    this.fileUploaded = false;
  }

   addLeadingZero(value : number) {
    return value < 10 ? '0' + value : value;
  }

  uploadAnswer() {
    if(this.fileEntry !== undefined){
      this.fileEntry.file(file => {
        const videoId = this.activatedRoute.snapshot.paramMap.get('videoId');
        if (videoId != null && this.id != null) {
          const currentDate = new Date();
          const currentYear = currentDate.getFullYear();

          const month = this.addLeadingZero(currentDate.getMonth() + 1)
          const day = this.addLeadingZero(currentDate.getDate())
          const hour = this.addLeadingZero(currentDate.getHours())
          const minute = this.addLeadingZero(currentDate.getMinutes())

          const date_upload = `${currentYear}-${month}-${day} ${hour}:${minute}:00`;

          this.videoService.uploadAnswer(videoId, date_upload, this.id, file).subscribe(data => {
            this.matSnackBar.open("Ответ успешно отправлен", "OK");
          })
        }
        else {
          //вывести модальное окно "чтобы оставить ответ - зарегистрируйтесь"
        }
      })
    }
  }

  ngOnInit(): void {

    if (this.videoId != null && this.id != null) {
      this.videoService.getAnswerVideoByUserId(this.videoId, this.id).subscribe(
        (answers: AnswerDto[]) => {
          this.answers = answers;
          console.log(this.answers)
        },
        (error) => {
          console.log('Error retrieving courses: ', error);
        }
      );
    }
  }
}

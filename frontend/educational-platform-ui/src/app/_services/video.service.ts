import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FileSystemFileEntry} from "ngx-file-drop";
import {Observable} from "rxjs";
import {UploadVideoResponse} from "../upload-video/UploadVideoResponse";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private httpClient: HttpClient) {
  }

  uploadVideo(fileEntry: File): Observable<UploadVideoResponse>{

    const formData = new FormData()
    formData.append('file', fileEntry, fileEntry.name)

    //HTTP Post call to upload the video
    return this.httpClient.post<UploadVideoResponse>("http://localhost:7777/api/videos", formData)
  }

  uploadThumbnail(fileEntry: File, videoId : string): Observable<string>{

    const formData = new FormData();
    formData.append('file', fileEntry, fileEntry.name);
    formData.append('videoId', videoId);


    //HTTP Post call to upload the thumbnail
    return this.httpClient.post("http://localhost:7777/api/videos/thumbnail", formData, {
      responseType: 'text'
    });
  }
}

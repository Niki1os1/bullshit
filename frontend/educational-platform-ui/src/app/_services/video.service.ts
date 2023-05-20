import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FileSystemFileEntry} from "ngx-file-drop";
import {Observable} from "rxjs";
import {UploadVideoResponse} from "../upload-video/UploadVideoResponse";
import {VideoDto} from "../_models/video-dto";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private httpClient: HttpClient) {
  }

  getAllVideos(courseId : string): Observable<Array<VideoDto>>{
    return this.httpClient.get<Array<VideoDto>>("http://localhost:7777/api/videos/"+courseId);
  }


  uploadVideo(courseId : string, fileEntry: File): Observable<UploadVideoResponse>{

    const formData = new FormData()
    formData.append('file', fileEntry, fileEntry.name)

    //HTTP Post call to upload the video
    return this.httpClient.post<UploadVideoResponse>("http://localhost:7777/api/videos/"+courseId, formData)
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

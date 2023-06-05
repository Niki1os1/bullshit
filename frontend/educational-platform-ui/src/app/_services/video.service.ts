import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {FileSystemFileEntry} from "ngx-file-drop";
import {Observable} from "rxjs";
import {UploadVideoResponse} from "../upload-video/UploadVideoResponse";
import {VideoDto} from "../_models/video-dto";
import {AnswerDto} from "../_models/answer-dto";

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

    return this.httpClient.post<UploadVideoResponse>("http://localhost:7777/api/videos/"+courseId, formData)
  }

  getAnswerByVideoId(videoId: string){
    return this.httpClient.get<Array<AnswerDto>>("http://localhost:7777/api/videos/answers/"+videoId);
  }

  uploadAnswer(videoId : string, date_upload : string, userId : string, fileEntry: File){

    const formData = new FormData()
    formData.append('date_upload', date_upload.toString())
    formData.append('authorId', userId)
    formData.append('file', fileEntry, fileEntry.name)

    return this.httpClient.post<UploadVideoResponse>("http://localhost:7777/api/videos/upload-answer/"+videoId, formData)
  }

  getVideo(videoId: string): Observable<VideoDto> {
    return this.httpClient.get<VideoDto>("http://localhost:7777/api/videos/video/" + videoId);
  }

  saveVideo(videoMetaData: VideoDto) {
    return this.httpClient.put<VideoDto>("http://localhost:7777/api/videos", videoMetaData);
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

  deleteVideo(videoId: string){
    return this.httpClient.delete("http://localhost:7777/api/videos/delete/" + videoId);
  }

  getAnswerVideoByUserId(videoId: string, userId: string ) {
    const params = new HttpParams().set('userId', userId);
    return this.httpClient.get<Array<AnswerDto>>("http://localhost:7777/api/videos/answers/user/" + videoId, { params });
  }

  editEvaluationUserById(answerId: number, editData: { selectedEvaluation: string}) {
    const formData = new FormData();
    formData.append('selectedEvaluation', editData.selectedEvaluation);
    return this.httpClient.put("http://localhost:7777/api/videos/answer/" + answerId, formData);
  }
}

package com.vsu.coursework.controller;

import com.vsu.coursework.payload.dto.AnswerDto;
import com.vsu.coursework.payload.dto.VideoDto;
import com.vsu.coursework.payload.response.UploadCommentResponse;
import com.vsu.coursework.payload.response.UploadVideoResponse;
import com.vsu.coursework.service.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/videos")
@RequiredArgsConstructor
public class VideoController {

    private final VideoService videoService;

    @GetMapping("/video/{videoId}")
    @ResponseStatus(HttpStatus.OK)
    public VideoDto getVideoDetails(@PathVariable String videoId) {
        return videoService.getVideoDetails(videoId);
    }

    @GetMapping("/{courseId}")
    @ResponseStatus(HttpStatus.OK)
    public List<VideoDto> getAllVideos(@PathVariable Long courseId) {
        return videoService.getAllVideos(courseId);
    }

    @PostMapping("/{courseId}")
    @ResponseStatus(HttpStatus.CREATED)
    public UploadVideoResponse uploadVideo(@PathVariable String courseId, @RequestParam("file")MultipartFile file){
        return videoService.uploadVideo(courseId, file);
    }

    @PostMapping("/upload-answer/{videoId}")
    @ResponseStatus(HttpStatus.CREATED)
    public UploadCommentResponse uploadAnswer(@PathVariable String videoId, @RequestParam("date_upload") String date_upload,
                                              @RequestParam("authorId") String authorId, @RequestParam("file")MultipartFile file){
        return videoService.uploadAnswer(videoId, date_upload, authorId, file);
    }

    @GetMapping("/answers/{videoId}")
    @ResponseStatus(HttpStatus.OK)
    public List<AnswerDto> getAnswersByVideoId(@PathVariable String videoId) {
        return videoService.getAnswersByVideoId(videoId);
    }

    @GetMapping("/answers/user/{videoId}")
    @ResponseStatus(HttpStatus.OK)
    public List<AnswerDto> getAnswerVideoByUserId(@PathVariable String videoId, @RequestParam("userId") String userId) {
        return videoService.getAnswerVideoByUserId(videoId, userId);
    }

    @PutMapping("/answer/{answerId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> editEvaluationUserById(@PathVariable String answerId, @RequestParam("selectedEvaluation") String selectedEvaluation) {
        if (selectedEvaluation == null) {
            String errorMessage = "Ошибка выставления оценки, отсутсвует параметр 'selectedEvaluation'";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
        }

        String result = videoService.editEvaluationUserById(answerId, selectedEvaluation);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/thumbnail")
    @ResponseStatus(HttpStatus.CREATED)
    public String uploadThumbnail(@RequestParam("file")MultipartFile file, @RequestParam("videoId") Long videoId){
        return videoService.uploadThumbnail(file, videoId);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public void editVideoMetadata(@RequestBody VideoDto videoDto){
        videoService.editVideo(videoDto);
    }

    @DeleteMapping("/delete/{videoId}")
    public void deleteVideo(@PathVariable String videoId){
        videoService.deleteVideoById(videoId);
    }
}

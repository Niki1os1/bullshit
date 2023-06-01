package com.vsu.coursework.controller;

import com.vsu.coursework.payload.dto.UploadVideoResponse;
import com.vsu.coursework.payload.dto.VideoDto;
import com.vsu.coursework.service.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
}

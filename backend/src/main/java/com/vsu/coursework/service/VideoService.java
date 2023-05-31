package com.vsu.coursework.service;

import com.vsu.coursework.model.Video;
import com.vsu.coursework.payload.dto.UploadVideoResponse;
import com.vsu.coursework.payload.dto.VideoDto;
import com.vsu.coursework.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VideoService {

    private final S3Service s3Service;
    private final VideoRepository videoRepository;

    private VideoDto mapToVideoDto(Video videoById) {
        VideoDto videoDto = new VideoDto();
        videoDto.setVideoUrl(videoById.getVideoUrl());
        videoDto.setThumbnailUrl(videoById.getThumbnailUrl());
        videoDto.setId(videoById.getId());
        videoDto.setTitle(videoById.getTitle());
        videoDto.setDescription(videoById.getDescription());
        videoDto.setTags(videoById.getTags());

        return videoDto;
    }
    public UploadVideoResponse uploadVideo(String courseId, MultipartFile multipartFile){
        String videoUrl = s3Service.uploadFile(multipartFile);
        var video = new Video();
        video.setVideoUrl(videoUrl);
        video.setCourseId(Long.parseLong(courseId));

        var savedVideo = videoRepository.save(video);
        return new UploadVideoResponse(savedVideo.getId(), savedVideo.getVideoUrl());
    }

    public VideoDto editVideo(VideoDto videoDto) {
        //Find the video by videoId
        Video savedVideo = getVideoById(videoDto.getId());
        //Map the video fields to video
        savedVideo.setTitle(videoDto.getTitle());
        savedVideo.setDescription(videoDto.getDescription());
        savedVideo.setTags(videoDto.getTags());
        savedVideo.setThumbnailUrl(videoDto.getThumbnailUrl());

        //save the video to the database
        videoRepository.save(savedVideo);
        return videoDto;
    }

    public String uploadThumbnail(MultipartFile file, Long videoId) {
        var savedVideo = getVideoById(videoId);
        String thumbnailUrl = s3Service.uploadFile(file);

        savedVideo.setThumbnailUrl(thumbnailUrl);

        videoRepository.save(savedVideo);
        return thumbnailUrl;
    }

    Video getVideoById(Long videoId){
       return videoRepository.findById(videoId)
                .orElseThrow(()-> new IllegalArgumentException("Cannot find video by id - " + videoId));
    }

    public List<VideoDto> getAllVideos(Long courseId) {
        return videoRepository.findByCourseId(courseId).stream().map(this::mapToVideoDto).toList();
    }

    public VideoDto getVideoDetails(String videoId) {
        Video savedVideo = getVideoById(Long.parseLong(videoId));

        return mapToVideoDto(savedVideo);
    }

    private static String extractFileNameFromUrl(String url) {
        try {
            URL fileUrl = new URL(url);
            String path = fileUrl.getPath();
            String[] parts = path.split("/");
            return parts[parts.length - 1];
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public void deleteVideoInCourse(Long courseId){
        ArrayList<String> keys = new ArrayList<>();
        List<Video> deletedVideo= videoRepository.findByCourseId(courseId);
        for(Video video : deletedVideo){
            if(video.getVideoUrl()!=null) {
                keys.add(extractFileNameFromUrl(video.getVideoUrl()));
            }
            if(video.getThumbnailUrl()!=null) {
                keys.add(extractFileNameFromUrl(video.getThumbnailUrl()));
            }
        }
        if(!keys.isEmpty()) {
            s3Service.deleteObjectsFromBucket(keys);
        }
        videoRepository.deleteAll(deletedVideo);
    }

    public void deleteVideoById(){

    }

}

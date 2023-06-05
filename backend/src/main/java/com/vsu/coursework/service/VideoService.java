package com.vsu.coursework.service;

import com.vsu.coursework.model.*;
import com.vsu.coursework.payload.dto.AnswerDto;
import com.vsu.coursework.payload.dto.VideoDto;
import com.vsu.coursework.payload.response.UploadCommentResponse;
import com.vsu.coursework.payload.response.UploadVideoResponse;
import com.vsu.coursework.repository.CommentRepository;
import com.vsu.coursework.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.net.URL;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VideoService {

    private final S3Service s3Service;
    private final VideoRepository videoRepository;
    private final CommentRepository commentRepository;

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

    private AnswerDto mapToAnswerDto(Comment answerById) {
        AnswerDto answerDto = new AnswerDto();
        answerDto.setId(answerById.getId());
        answerDto.setAuthorId(answerById.getAuthorId());
        answerDto.setDate_upload(answerById.getDateUpload().toString());
        answerDto.setFile_url(answerById.getFileUrl());
        if (answerById.getEvaluation() != null) {
            answerDto.setEvaluation(answerById.getEvaluation().toString());
        }

        return answerDto;
    }
    public UploadVideoResponse uploadVideo(String courseId, MultipartFile multipartFile){
        String videoUrl = s3Service.uploadFile(multipartFile);
        var video = new Video();
        video.setVideoUrl(videoUrl);
        video.setCourseId(Long.parseLong(courseId));

        var savedVideo = videoRepository.save(video);
        return new UploadVideoResponse(savedVideo.getId(), savedVideo.getVideoUrl());
    }

    public void editVideo(VideoDto videoDto) {
        Video savedVideo = getVideoById(videoDto.getId());

        if (savedVideo != null) {
            savedVideo.setTitle(videoDto.getTitle());
            savedVideo.setDescription(videoDto.getDescription());
            savedVideo.setTags(videoDto.getTags());
            savedVideo.setThumbnailUrl(videoDto.getThumbnailUrl());

            videoRepository.save(savedVideo);
        } else {
            // Handle the case when the video is not found
            throw new IllegalArgumentException("Video not found");
        }
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

    public void deleteVideoById(String videoId){
        videoRepository.deleteById(Long.parseLong(videoId));
    }

    public UploadCommentResponse uploadAnswer(String videoId, String date_upload, String authorId, MultipartFile file) {
        String videoUrl = s3Service.uploadFile(file);
        var answer = new Comment();
        answer.setDateUpload(Timestamp.valueOf(date_upload));
        answer.setAuthorId(Integer.parseInt(authorId));
        answer.setVideoId(Long.parseLong(videoId));
        answer.setFileUrl(videoUrl);

        var savedAnswer = commentRepository.save(answer);
        return new UploadCommentResponse(savedAnswer.getId(), savedAnswer.getFileUrl());
    }

    public List<AnswerDto> getAnswersByVideoId(String videoId) {
        return commentRepository.findByVideoId(Long.parseLong(videoId)).stream().map(this::mapToAnswerDto).toList();
    }

    public List<AnswerDto> getAnswerVideoByUserId(String videoId, String userId) {
        return commentRepository.findByVideoIdAndAuthorId(Long.parseLong(videoId), Integer.parseInt(userId)).stream().map(this::mapToAnswerDto).toList();
    }

    public String editEvaluationUserById(String answerId, String selectedEvaluation) {
        Optional<Comment> existingCommentOptional = commentRepository.findById(Long.parseLong(answerId));
        Comment savedAnswer = existingCommentOptional.orElse(null);

        if(savedAnswer!= null) {
            savedAnswer.setEvaluation(Integer.parseInt(selectedEvaluation));

            commentRepository.save(savedAnswer);
            return savedAnswer.getId().toString();
        }

        return null;
    }
}

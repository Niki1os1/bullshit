package com.vsu.coursework.repository;

import com.vsu.coursework.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VideoRepository extends JpaRepository<Video, Long> {
    List<Video> findByCourseId(Long courseId);
}

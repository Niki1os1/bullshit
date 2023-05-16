package com.vsu.coursework.repository;

import com.vsu.coursework.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoRepository extends JpaRepository<Video, String> {

}

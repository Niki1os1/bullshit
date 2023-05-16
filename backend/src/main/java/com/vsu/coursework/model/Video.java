package com.vsu.coursework.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "video")
@NoArgsConstructor
@AllArgsConstructor
public class Video {
    @Id
    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "user_id")
    private String userId;

    @OneToMany
    @JoinColumn(name = "video_id")
    private Set<Tag> tags = new HashSet<>();

    @Column(name = "video_url")
    private String videoUrl;

    @Column(name = "view_count")
    private Integer viewCount;

    @Column(name = "thumbnail_url")
    private String thumbnailUrl;

    @OneToMany
    @JoinColumn(name = "video_id")
    private List<Comment> commentList;
}

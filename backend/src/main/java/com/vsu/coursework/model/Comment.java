package com.vsu.coursework.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "video_comments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

    @Id
    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "video_id")
    private Long videoId;

    @Column(name = "file_url")
    private String fileUrl;

    @Column(name = "date_upload")
    private Timestamp dateUpload;

    @Column(name = "author_id")
    private Integer authorId;

    @Column(name = "evaluation")
    private Integer evaluation;
}

package com.vsu.coursework.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import javax.persistence.*;

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

    @Column(name = "text")
    private String text;

    @Column(name = "video_id")
    private Long video_id;

    @Column(name = "author_id")
    private String authorId;
}

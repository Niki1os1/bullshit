package com.vsu.coursework.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name = "video_tags")
@NoArgsConstructor
@AllArgsConstructor
public class Tag {
    @org.springframework.data.annotation.Id
    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "video_id")
    private Long video_id;

    @Column(name = "title")
    private String title;

}

package com.vsu.coursework.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;

import javax.persistence.*;

@Data
@Entity
@Table(name = "course")
@AllArgsConstructor
public class Course {
    @Id
    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "category")
    private String category;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "title")
    private String title;

    @Column(name = "icon")
    private String icon;

    public Course(int userId, String category, String title, String icon) {
        this.category = category;
        this.title = title;
        this.icon = icon;
    }

    public Course() {

    }
}
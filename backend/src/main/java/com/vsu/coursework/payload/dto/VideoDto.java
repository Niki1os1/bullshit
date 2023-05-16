package com.vsu.coursework.payload.dto;


import com.vsu.coursework.model.Tag;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VideoDto {
    private String id;
    private String title;
    private String description;
    private Set<Tag> tags;
    private String videoUrl;
    private String thumbnailUrl;
}

package com.vsu.coursework.payload.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnswerDto {
    private Long id;
    private String file_url;
    private String date_upload;
    private Integer authorId;
    private String evaluation;
}

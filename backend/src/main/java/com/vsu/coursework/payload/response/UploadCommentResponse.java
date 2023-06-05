package com.vsu.coursework.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UploadCommentResponse {
    private Long answerId;
    private String answerUrl;
}

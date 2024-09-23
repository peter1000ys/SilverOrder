package com.silverorder.domain.review.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestOwnerReviewDto {
    private Long userReviewId;
    private String content;
}

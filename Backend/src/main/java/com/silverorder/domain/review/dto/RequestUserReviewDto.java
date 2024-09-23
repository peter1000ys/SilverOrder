package com.silverorder.domain.review.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestUserReviewDto {
    private String content;
    private int rating;
    private Long orderId;
}

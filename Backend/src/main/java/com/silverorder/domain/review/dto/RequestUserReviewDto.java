package com.silverorder.domain.review.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

/**
 * <pre>
 *     리뷰 Request DTO 클래스
 * </pre>
 *
 * @author 박봉균
 * @since JDK17 Eclipse Temurin
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestUserReviewDto {
    /** 리뷰 내용 */
    @NotBlank(message = "리뷰 내용은 필수입니다.")
    private String content;

    /** 평점 */
    @Max(value = 5, message = "최대 평점은 5점입니다.")
    @Min(value = 1, message = "최소 평점은 1입니다.")
    private int rating;

    /** 주문 번호 */
    @NotNull(message = "주문 번호는 필수입니다.")
    private Long orderId;

    /** 리뷰 사진 */
    private MultipartFile reviewThumb;
}

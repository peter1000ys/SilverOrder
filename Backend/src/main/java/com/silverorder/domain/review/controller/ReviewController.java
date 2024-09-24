package com.silverorder.domain.review.controller;

import com.silverorder.domain.review.dto.RequestOwnerReviewDto;
import com.silverorder.domain.review.dto.RequestUserReviewDto;
import com.silverorder.domain.review.dto.ResponseMyReviewDto;
import com.silverorder.domain.review.dto.ResponseReviewDto;
import com.silverorder.domain.review.service.ReviewService;
import com.silverorder.domain.user.dto.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * <pre>
 *     리뷰 관리 컨트롤러 클래스
 * </pre>
 * @author 노명환
 * @since JDK17
 */

@Tag(name = "Review", description = "리뷰 관리")
@RestController
@RequestMapping("/review")
@CrossOrigin("*")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @Operation(summary = "리뷰 리스트 조회", description="가맹점의 리뷰들을 조회합니다.")
    @GetMapping("/list/{storeId}")
    public ResponseEntity<?> listReview(
            @PathVariable Long storeId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) throws Exception {
        long userId = userDetails.getUser().getUserId();
        List<ResponseReviewDto> responseReviewDtoList = reviewService.listReview(userId, storeId);
        return ResponseEntity.ok(responseReviewDtoList);
    }

    @Operation(summary = "내 리뷰 조회", description="유저가 작성한 리뷰 및 사장님 댓글을 조회합니다.")
    @GetMapping("/myReviews")
    public ResponseEntity<?> myReviews(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) throws Exception {
        long userId = userDetails.getUser().getUserId();
        List<ResponseMyReviewDto> responseMyReviewDtoList = reviewService.myReviews(userId);
        return ResponseEntity.ok(responseMyReviewDtoList);
    }

    @Operation(summary = "고객 리뷰 입력", description="자신의 주문을 기준으로 리뷰를 입력합니다.")
    @PostMapping("/userRegist")
    public ResponseEntity<?> registUserReview(
            @RequestBody @Valid RequestUserReviewDto requestUserReviewDto,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) throws Exception {
        long userId = userDetails.getUser().getUserId();
        reviewService.registUserReview(userId, requestUserReviewDto);
        return new ResponseEntity<>("고객 리뷰 등록 완료", HttpStatus.OK);
    }

    @Operation(summary = "사장님 댓글 입력", description="고객 리뷰에 사장님 댓글을 입력합니다.")
    @PostMapping("/ownerRegist")
    public ResponseEntity<?> registOwnerReview(
            @RequestBody @Valid RequestOwnerReviewDto requestOwnerReviewDto,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) throws Exception {
        long userId = userDetails.getUser().getUserId();
        reviewService.registOwnerReview(userId, requestOwnerReviewDto);
        return new ResponseEntity<>("사장님 댓글 등록 완료", HttpStatus.OK);
    }
}

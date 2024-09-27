package com.silverorder.domain.review.service;

import com.silverorder.domain.order.entity.Order;
import com.silverorder.domain.review.dto.*;
import jakarta.persistence.PersistenceException;

import java.util.List;

/**
 * <pre>
 *      리뷰 관리 서비스 인터페이스
 * </pre>
 * @author 노명환
 * @since JDK17
 */
public interface ReviewService {
    List<ResponseReviewDto> listReview(long userId, long storeId) throws Exception;
    List<ResponseMyReviewDto> myReviews(long userId) throws Exception;

    /** 리뷰 단건 조회 */
    ResponseReviewDto userReview(Long userId, Long orderId) throws Exception;

    void registUserReview(long userId, UserReviewDto userReviewDto) throws Exception;
    void registOwnerReview(long userId, RequestOwnerReviewDto requestOwnerReviewDto) throws Exception;
}

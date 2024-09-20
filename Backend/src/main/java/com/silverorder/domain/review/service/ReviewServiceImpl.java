package com.silverorder.domain.review.service;

import com.silverorder.domain.order.entity.Order;
import com.silverorder.domain.order.repository.OrderJpaRepository;
import com.silverorder.domain.review.dto.RequestOwnerReviewDto;
import com.silverorder.domain.review.dto.RequestUserReviewDto;
import com.silverorder.domain.review.dto.ResponseReviewDto;
import com.silverorder.domain.review.entity.UserReview;
import com.silverorder.domain.review.repository.ReviewRepository;
import com.silverorder.domain.review.repository.UserReviewJpaRepository;
import com.silverorder.domain.store.entity.Store;
import com.silverorder.domain.store.repository.StoreJpaRepository;
import com.silverorder.domain.user.entity.User;
import com.silverorder.domain.user.repository.UserJpaRepository;
import com.silverorder.global.exception.CustomException;
import com.silverorder.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * <pre>
 *      리뷰 관리 서비스 구현
 * </pre>
 * @author 노명환
 * @since JDK17
 */
@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService{
    private final ReviewRepository reviewRepository;
    private final UserJpaRepository userJpaRepository;
    private final StoreJpaRepository storeJpaRepository;
    private final OrderJpaRepository orderJpaRepository;
    private final UserReviewJpaRepository userReviewJpaRepository;

    /**
     * 리뷰 조회
     * @param userId : 유저 id
     * @param storeId : 가맹점 id
     * @return : 리뷰 list
     * @throws Exception
     */
    @Override
    public List<ResponseReviewDto> listReview(long userId, long storeId) throws Exception {
        //유저 확인 로직
        User user = userJpaRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        //주문 확인 로직
        Store store = storeJpaRepository.findById(storeId)
                .orElseThrow(() -> new CustomException(ErrorCode.STORE_NOT_FOUND));

        return reviewRepository.listUserReview(store);
    }

    /**
     * 사용자 리뷰 등록
     * @param userId : 유저 id
     * @param requestUserReviewDto : 사용자 리뷰 등록 정보
     * @throws Exception
     */
    @Override
    @Transactional
    public void registUserReview(long userId, RequestUserReviewDto requestUserReviewDto) throws Exception {
        //유저 확인 로직
        User user = userJpaRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        //주문 확인 로직
        Order order = orderJpaRepository.findById(requestUserReviewDto.getOrderId())
                .orElseThrow(() -> new CustomException(ErrorCode.ORDER_NOT_FOUND));

        //주문고객 확인 로직
        if(!order.getPayment().getUser().equals(user))
            throw new CustomException(ErrorCode.ORDER_USER_NOT_AUTHENTICATED);

        reviewRepository.registUserReview(user, order, requestUserReviewDto);
    }

    /**
     * 사장님 리뷰 등록
     * @param userId : 유저 id
     * @param requestOwnerReviewDto : 사장님 리뷰 정보 dto
     * @throws Exception
     */
    @Override
    public void registOwnerReview(long userId, RequestOwnerReviewDto requestOwnerReviewDto) throws Exception {
        //유저 확인
        User user = userJpaRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        //리뷰 확인
        UserReview userReview = userReviewJpaRepository.findById(requestOwnerReviewDto.getUserReviewId())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_REVIEW_NOT_FOUND));

        //주문 확인
        Order order = orderJpaRepository.findById(userReview.getOrder().getId())
                .orElseThrow(() -> new CustomException(ErrorCode.ORDER_NOT_FOUND));

        //가맹점 확인
        Store store = storeJpaRepository.findById(order.getStore().getId())
                .orElseThrow(() -> new CustomException(ErrorCode.STORE_NOT_FOUND));
        //가맹점주 확인
        if(!store.getUser().getId().equals(user.getId()))
            throw new CustomException(ErrorCode.STORE_NOT_AUTHENTICATED);

        reviewRepository.registOwnerReview(userReview, requestOwnerReviewDto);
    }
}

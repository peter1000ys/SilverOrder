package com.silverorder.domain.review.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.silverorder.domain.menu.entity.Menu;
import com.silverorder.domain.order.entity.Order;
import com.silverorder.domain.review.dto.RequestOwnerReviewDto;
import com.silverorder.domain.review.dto.RequestUserReviewDto;
import com.silverorder.domain.review.dto.ResponseMyReviewDto;
import com.silverorder.domain.review.dto.ResponseReviewDto;
import com.silverorder.domain.review.entity.OwnerReview;
import com.silverorder.domain.review.entity.UserReview;
import com.silverorder.domain.store.entity.Store;
import com.silverorder.domain.user.entity.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.PersistenceException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

import static com.silverorder.domain.review.entity.QOwnerReview.ownerReview;
import static com.silverorder.domain.review.entity.QUserReview.userReview;

/**
 * <pre>
 *      리뷰 관리 레포지토리 구현
 * </pre>
 * @author 노명환
 * @since JDK17
 */
@Repository
@RequiredArgsConstructor
public class ReviewRepositoryImpl implements ReviewRepository{
    @PersistenceContext
    private final EntityManager em;
    private final JPAQueryFactory queryFactory;


    /**
     * 가맹점 리뷰 조회
     * <pre>
     *      가맹점에 등록된 사용자 리뷰 및 사장님 댓글을 조회한다.
     * </pre>
     * @param store : 가맹점 정보 entity
     * @return : 유저 리뷰 리스트
     * @throws PersistenceException : JPA 표준 예외
     */
    @Override
    public List<ResponseReviewDto> listUserReview(Store store) throws PersistenceException {
        try{
            return queryFactory
                    .select(Projections.constructor(ResponseReviewDto.class,
                            userReview.id,
                            userReview.content,
                            userReview.rating,
                            userReview.order.id,
                            userReview.user.id,
                            userReview.user.userEmail,
                            ownerReview.id,
                            ownerReview.content,
                            ownerReview.createdDate,
                            ownerReview.modifiedDate
                            )
                    )
                    .from(userReview)
                    .leftJoin(ownerReview).on(ownerReview.userReview.id.eq(userReview.id))
                    .where(userReview.order.store.eq(store))
                    .fetch();
        }catch(Exception e) {
            //e.printStackTrace();
            throw new PersistenceException("유저 리뷰 조회 중 에러 발생", e);
        }
    }

    /**
     * 내 작성 리뷰 조회
     * <pre>
     *      내가 작성한 리뷰 및 사장님 댓글을 조회한다
     * </pre>
     * @param user : 유저 정보 entity
     * @return : 내 리뷰 리스트
     * @throws PersistenceException : JPA 표준 예외
     */
    @Override
    public List<ResponseMyReviewDto> listMyReview(User user) throws PersistenceException {
        try{
            return queryFactory
                    .select(Projections.constructor(ResponseMyReviewDto.class,
                            userReview.id,
                            userReview.content,
                            userReview.rating,
                            userReview.order.id,
                            userReview.order.store.id,
                            userReview.order.store.storeName,
                            ownerReview.id,
                            ownerReview.content,
                            ownerReview.createdDate,
                            ownerReview.modifiedDate
                            ))
                    .from(userReview)
                    .leftJoin(ownerReview).on(ownerReview.userReview.id.eq(userReview.id))
                    .where(userReview.user.eq(user))
                    .fetch();
        }catch(Exception e) {
            //e.printStackTrace();
            throw new PersistenceException("내 리뷰 조회 중 에러 발생", e);
        }
    }

    /**
     * 고객 리뷰 등록
     * <pre>
     *      주문 내역을 통해 리뷰를 등록합니다.
     * </pre>
     * @param order : 주문 entity
     * @param user : 유저 entity
     * @param requestUserReviewDto : 리뷰정보 dto
     * @return : 유저 리뷰 리스트
     * @throws PersistenceException : JPA 표준 예외
     */
    @Override
    public void registUserReview(User user, Order order, RequestUserReviewDto requestUserReviewDto) throws PersistenceException {
        try {
             UserReview userReview = new UserReview(
                     null,
                     requestUserReviewDto.getContent(),
                     requestUserReviewDto.getRating(),
                     order,
                     user
            );

            em.persist(userReview);
            em.flush();
        } catch(Exception e){
            throw new PersistenceException("고객 리뷰 등록 중 에러 발생", e);
        }
    }

    /**
     * 사장님 리뷰 등록
     * <pre>
     *      고객 리뷰에 사장님 답글을 등록합니다.
     * </pre>
     * @param requestOwnerReviewDto : 사장님 리뷰 dto
     * @param userReview : 유저리뷰 entity
     * @return : 유저 리뷰 리스트
     * @throws PersistenceException : JPA 표준 예외
     */
    @Override
    public void registOwnerReview(UserReview userReview, RequestOwnerReviewDto requestOwnerReviewDto) throws PersistenceException {
        try {
            OwnerReview ownerReview = new OwnerReview(
                    null,
                    requestOwnerReviewDto.getContent(),
                    LocalDate.now(),
                    LocalDate.now(),
                    userReview
            );

            em.persist(ownerReview);
            em.flush();
        } catch(Exception e){
            throw new PersistenceException("사장님 댓글 등록 중 에러 발생", e);
        }
    }
}

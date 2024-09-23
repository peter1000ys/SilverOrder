package com.silverorder.domain.review.repository;

import com.silverorder.domain.review.entity.UserReview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserReviewJpaRepository extends JpaRepository<UserReview, Long> {
}

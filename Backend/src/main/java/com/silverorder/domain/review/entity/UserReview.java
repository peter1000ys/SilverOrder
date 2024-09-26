package com.silverorder.domain.review.entity;

import com.silverorder.domain.order.entity.Order;
import com.silverorder.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "T_REVIEW")
public class UserReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "REVIEW_ID", nullable = false)
    private Long id;

    @Column(name = "CONTENT", length = 2000)
    private String content;

    @Column(name = "RATING", nullable = false)
    private int rating;

    @Column(name = "REVIEW_THUMB", length = 100)
    private String reviewThumb;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ORDER_ID", nullable = false)
    private Order order; //외래키

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", nullable = false)
    private User user; //외래키

    @Column(name = "CREATED_DATE", nullable = false)
    @CreationTimestamp
    private LocalDate createdDate;

    @Column(name = "MODIFIED_DATE", nullable = false)
    @UpdateTimestamp
    private LocalDate modifiedDate;

}



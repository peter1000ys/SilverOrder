package com.silverorder.domain.payment.entity;

import com.silverorder.domain.payment.dto.PaymentType;
import com.silverorder.domain.user.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="T_PAYMENT", indexes =
@Index(name = "IDX_USER_ID", columnList = "USER_ID"))
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PAYMENT_ID",nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", nullable = false)
    @NotNull
    private User user;

    @Column(name = "PAYMENT_TYPE", nullable = false)
    @NotNull
    @Enumerated(EnumType.STRING)
    private PaymentType paymentType;
}

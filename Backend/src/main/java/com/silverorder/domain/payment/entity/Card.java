package com.silverorder.domain.payment.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="T_CARD")
public class Card {
    @Id
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PAYMENT_ID", nullable = false)
    private Payment payment;

    @Column(name = "CARD_NUM", nullable = false)
    @NotNull
    private String cardNum;

    @Column(name = "CARD_CVC", length = 7, nullable = false)
    @NotNull
    private String cardCVC;

    @Column(name = "DISCOUNT_CATEGORY", length = 50)
    private String discountCategory;

    @Column(name = "DISCOUNT_RATE")
    private Double discountRate;
}

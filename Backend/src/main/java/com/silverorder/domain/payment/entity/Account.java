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
@Table(name="T_ACCOUNT")
public class Account {
    @Id
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PAYMENT_ID", nullable = false)
    private Payment payment;

    @Column(name = "ACCOUNT_NUM", length = 30, nullable = false)
    @NotNull
    private String accountNum;

    @Column(name = "ACCOUNT_PASS", length = 200, nullable = false)
    @NotNull
    private String accountPass;
}

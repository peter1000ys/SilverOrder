package com.silverorder.domain.store.entity;

import com.silverorder.domain.user.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="T_STORE")
public class Store {
    @Id
    @Column(name = "STORE_ID",nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", nullable = true)
    private User user;

    @Column(name = "STORE_NAME", length = 100, nullable = false)
    @NotNull
    private String storeName;

    @Column(name = "STORE_DESC", length = 200)
    private String storeDesc;

    @Column(name = "STORE_CATEGORY", length = 50, nullable = false)
    @NotNull
    private String storeCategory;

    @Column(name = "STORE_RATE",nullable = false)
    @NotNull
    private double storeRate;

    @Column(name = "STORE_STATUS", length = 50, nullable = false)
    @NotNull
    private String storeStatus;

    @Column(name = "ADDRESS", nullable = false)
    @NotNull
    private String address;

    @Column(name = "LATITUDE")
    private double latitude;

    @Column(name = "LONGITUDE")
    private double longitude;

    @Column(name = "ACCOUNT_NUM", length = 30)
    private String accountNum;

    @Column(name = "OPEN_TIME", length = 4, nullable = false)
    @NotNull
    private String openTime;

    @Column(name = "CLOSE_TIME", length = 4, nullable = false)
    @NotNull
    private String closeTime;
}

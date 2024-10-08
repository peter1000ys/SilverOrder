package com.silverorder.domain.store.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class StoreDto {
    private Long storeId;

    private String storeName;

    private String storeDesc;

    private String storeCategory;

    private Double storeRate;

    private String storeStatus;

    private String address;

    private Double latitude;

    private Double longitude;

    private String accountNum;

    private String openTime;

    private String closeTime;
}

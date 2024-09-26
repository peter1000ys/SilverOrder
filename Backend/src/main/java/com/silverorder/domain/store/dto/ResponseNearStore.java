package com.silverorder.domain.store.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Range;

import java.util.List;

/**
 * 사용자 기준 근처 매장 조회용 DTO
 */
@Getter
@Setter
public class ResponseNearStore extends ResponseLatitudeLongitudeDTO{

    @NotNull
    Long storeId;

    @NotNull
    String storeName;
}

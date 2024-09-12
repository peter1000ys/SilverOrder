package com.silverorder.domain.store.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

/**
 * 위도 경도 조회 요청용 DTO
 */
@Getter
@Builder
public class RequestLatitudeLongitudeDTO {


    @NotNull
    private Long storeId;
}

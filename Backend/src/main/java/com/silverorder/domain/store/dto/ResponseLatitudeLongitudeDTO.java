package com.silverorder.domain.store.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Range;

/**
 * 위도 경도 등록 응답 DTO
 * @author 채기훈
 * @since JDK17 Eclipse Temurin
 */
@Getter
@Setter
public class ResponseLatitudeLongitudeDTO {

    @NotNull
    @Range(min = -90, max = 90)
    private double latitude;

    @NotNull
    @Range(min = -180, max = 180)
    private double longitude;
}

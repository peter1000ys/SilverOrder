package com.silverorder.domain.payment.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * <pre>
 *  결제 요청 DTO
 * </pre>
 *
 * @author 박봉균
 * @since JDK17 Eclipse Temurin
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CardRequestDto {

    /** 결제 수단 기본키 */
    @NotNull(message = "결제수단은 필수입니다.")
    private Long paymentId;

    /** 가맹점 번호 */
    @NotNull
    private Long storeId;

    /** 결제 요청 금액 */
    @NotNull
    private Long paymentBalance;

    /** SSAFY 금융망 API UserKey */
    @Schema(hidden = true)
    private String userApiKey;

}

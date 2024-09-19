package com.silverorder.domain.payment.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.silverorder.global.dto.HeaderApiDto;
import com.silverorder.global.dto.HeaderDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TransactionRequestDto {
    @JsonProperty("Header")
    private HeaderApiDto headerApiDto;
    private String cardNo;
    private String cvc;
    private Long merchantId;
    private Long paymentBalance;

}
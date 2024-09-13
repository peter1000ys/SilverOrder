package com.silverorder.domain.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CardRequestDto {
    private String cardNo;
    private String cvc;
    private Long merchantId;
    private Long paymentBalance;
}

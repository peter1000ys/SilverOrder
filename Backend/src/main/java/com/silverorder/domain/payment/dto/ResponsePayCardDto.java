package com.silverorder.domain.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponsePayCardDto {
    private Long paymentId;
    private String cardNum;
    private String cardCvc;
    private String cardIssuerName;
    private String cardName;
    private Double discountRate;
}

package com.silverorder.global.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CardDto {
    private String cardNo;
    private String cvc;
    private String cardUniqueNo;
    private String cardIssuerName;
    private String cardName;
    private String baselinePerformance;
    private String maxBenefitLimit;
    private String cardDescription;
    private String cardExpiryDate;
    @JsonProperty("cardBenefitsInfo")
    private List<ResponseCardBenefit> responseCardBenefits;

    public CardDto(String cardNo, String cvc, String cardUniqueNo, String cardIssuerName,
                   String cardName, String baselinePerformance, String maxBenefitLimit,
                   String cardDescription, String cardExpiryDate){
        this.cardNo = cardNo;
        this.cvc = cvc;
        this.cardUniqueNo = cardUniqueNo;
        this.cardIssuerName = cardIssuerName;
        this.cardName = cardName;
        this.baselinePerformance = baselinePerformance;
        this.maxBenefitLimit = maxBenefitLimit;
        this.cardDescription = cardDescription;
        this.cardExpiryDate = cardExpiryDate;
        this.responseCardBenefits = null;
    }
}

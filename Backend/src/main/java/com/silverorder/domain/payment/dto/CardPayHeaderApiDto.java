package com.silverorder.domain.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Random;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CardPayHeaderApiDto {
    private String apiName;
    private String transmissionDate;
    private String transmissionTime;
    private String institutionCode;
    private String fintechAppNo;
    private String apiServiceCode;
    private String institutionTransactionUniqueNo;
    private String apiKey;

    public CardPayHeaderApiDto(String apiName, String apiKey) {
        Random random = new Random();

        this.apiName = apiName;
        this.transmissionDate = LocalDate.now()
                .format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        this.transmissionTime = LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("HHmmss"));
        this.institutionCode = "00100";
        this.fintechAppNo = "001";
        this.apiServiceCode = apiName;
        this.institutionTransactionUniqueNo = LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"))
                + String.format("%06d", random.nextInt(1000000));
        this.apiKey = apiKey;
    }

}

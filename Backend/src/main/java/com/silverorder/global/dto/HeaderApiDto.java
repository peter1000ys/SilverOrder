package com.silverorder.global.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Random;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class HeaderApiDto {
    private String apiName;
    private String transmissionDate;
    private String transmissionTime;
    private String institutionCode;
    private String fintechAppNo;
    private String apiServiceCode;
    private String institutionTransactionUniqueNo;
    private String apiKey;
    private String userKey;

    public HeaderApiDto(String apiName, String apiKey, String userKey){
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
        this.userKey = userKey;
    }

}

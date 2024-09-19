package com.silverorder.domain.payment.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.silverorder.global.dto.CardDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestCardListDto {
    @JsonProperty("REC")
    private List<CardDto> cardDtoList;
}

package com.silverorder.global.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseCardListDto {
    @JsonProperty("Header")
    private ResponseHeaderDto responseHeaderDto;
    @JsonProperty("REC")
    private List<CardDto> cardDtoList;
}

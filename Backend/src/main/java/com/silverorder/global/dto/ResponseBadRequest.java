package com.silverorder.global.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseBadRequest {
    private String responseCode;
    private String responseMessage;
}

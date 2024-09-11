package com.silverorder.global.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseCardBenefit {
    private String categoryId;
    private String categoryName;
    private double discountRate;
}

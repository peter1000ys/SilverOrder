package com.silverorder.domain.store.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProcSalesDto {
    private Long todaySales;
    private Long weekSales;
    private Long monthSales;
    private Long yearSales;
}

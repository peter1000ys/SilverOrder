package com.silverorder.domain.store.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseProcAgeDto {
    private Long menuId;
    private String menuName;
    private Integer amount;
}

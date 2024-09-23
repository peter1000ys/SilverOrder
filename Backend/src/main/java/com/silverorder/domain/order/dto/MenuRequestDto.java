package com.silverorder.domain.order.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MenuRequestDto {
    private Long menuId;
    private int menuAmount;
    private List<OptionRequestDto> optionList;
}

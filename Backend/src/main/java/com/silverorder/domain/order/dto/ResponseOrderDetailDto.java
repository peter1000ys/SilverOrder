package com.silverorder.domain.order.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ResponseOrderDetailDto {
    private Long orderMenuId;
    private Long menuId;
    private String menuName;
    private int menuAmount;
    private Long menuPrice;
    private Long optionCount;
    private List<OrderOptionDto> optionList;

    public ResponseOrderDetailDto(Long orderMenuId, Long menuId, String menuName,
                                  int menuAmount, Long menuPrice, Long optionCount){
        this.orderMenuId = orderMenuId;
        this.menuId = menuId;
        this.menuName = menuName;
        this.menuAmount = menuAmount;
        this.menuPrice = menuPrice;
        this.optionCount = optionCount;
        this.optionList = null;
    }
}

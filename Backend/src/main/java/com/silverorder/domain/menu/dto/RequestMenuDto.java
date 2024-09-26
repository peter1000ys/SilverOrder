package com.silverorder.domain.menu.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestMenuDto {
    private Long storeId;
    private Long menuCategoryId;
    private String menuName;
    private String simpleName;
    private String menuDesc;
    private MenuStatus menuStatus;
    private int menuPrice;
    private int recommend;
    private String MenuThumb;
    private long[] useOptionCategory;
}

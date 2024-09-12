package com.silverorder.domain.menu.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseMenuCategory {
    private Long menuCategoryId;
    private String menuCategoryName;
}

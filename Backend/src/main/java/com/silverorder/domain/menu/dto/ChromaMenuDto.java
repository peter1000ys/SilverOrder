package com.silverorder.domain.menu.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChromaMenuDto {
    private String menuId;
    private String menuDesc;
    private String storeId;
}

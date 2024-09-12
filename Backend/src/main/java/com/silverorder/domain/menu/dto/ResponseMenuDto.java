package com.silverorder.domain.menu.dto;

import com.silverorder.domain.option.dto.ResponseOptionDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseMenuDto {
    private Long menuId;
    private Long menuCategoryId;
    private String menuCategoryName;
    private String menuName;
    private String simpleName;
    private String menuDesc;
    private MenuStatus menuStatus;
    private int menuPrice;
    private int recommend;
    private String menuThumb;
    //private List<Long> optionCategoryIds;

    /*public ResponseMenuDto(Long menuId, Long menuCategoryId, String menuName, String simpleName,
                           String menuDesc, MenuStatus menuStatus, int menuPrice, int recommend,
                           String menuThumb){
        this.menuId = menuId;
        this.menuCategoryId = menuCategoryId;
        this.menuName = menuName;
        this.simpleName = simpleName;
        this.menuDesc = menuDesc;
        this.menuStatus = menuStatus;
        this.menuPrice = menuPrice;
        this.recommend = recommend;
        this.menuThumb = menuThumb;
        this.optionCategoryIds = null;
    }*/
}

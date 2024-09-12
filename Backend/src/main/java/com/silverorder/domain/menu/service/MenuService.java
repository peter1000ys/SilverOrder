package com.silverorder.domain.menu.service;

import com.silverorder.domain.menu.dto.RequestMenuCategoryDto;
import com.silverorder.domain.menu.dto.RequestMenuDto;
import com.silverorder.domain.menu.dto.ResponseMenuCategory;
import com.silverorder.domain.menu.dto.ResponseMenuDto;
import com.silverorder.domain.option.dto.ResponseOptionDto;

import java.util.List;

/**
 * <pre>
 *      메뉴 관리 서비스 인터페이스
 * </pre>
 * @author 노명환
 * @since JDK17
 */
public interface MenuService {
    void saveMenu(long userId, RequestMenuDto requestMenuDto) throws Exception;

    void saveMenuCategory(long userId, RequestMenuCategoryDto requestMenuCategoryDto) throws Exception;

    List<ResponseMenuDto> listMenu(long userId, long storeId) throws Exception;

    List<ResponseOptionDto> menuOptionList(long menuId) throws Exception;

    List<ResponseMenuCategory> menuCategoryList(long storeId) throws Exception;
}

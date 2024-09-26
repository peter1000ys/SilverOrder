package com.silverorder.domain.menu.repository;

import com.silverorder.domain.menu.dto.MenuDto;
import com.silverorder.domain.menu.dto.RequestMenuDto;
import com.silverorder.domain.menu.dto.ResponseMenuCategory;
import com.silverorder.domain.menu.dto.ResponseMenuDto;
import com.silverorder.domain.menu.entity.Menu;
import com.silverorder.domain.option.entity.OptionCategory;
import com.silverorder.domain.store.entity.Store;
import com.silverorder.domain.store.entity.StoreMenuCategory;
import com.silverorder.domain.user.entity.User;
import jakarta.persistence.PersistenceException;

import java.util.List;

public interface MenuRepository {
    Menu saveMenu(StoreMenuCategory storeMenuCategory, MenuDto MenuDto) throws PersistenceException;

    void saveMenuOptionCategory(Menu menu, OptionCategory optionCategory);

    void saveStoreMenuCategory(Store store, String menuCategoryName) throws PersistenceException;

    List<ResponseMenuDto> listMenu(Store store, User user) throws PersistenceException;

    List<OptionCategory> menuOptions(Menu menu) throws PersistenceException;

    List<ResponseMenuCategory> menuCategoryList(Store store) throws PersistenceException;
}

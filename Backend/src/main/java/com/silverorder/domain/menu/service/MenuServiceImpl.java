package com.silverorder.domain.menu.service;

import com.silverorder.domain.menu.dto.*;
import com.silverorder.domain.menu.entity.Menu;
import com.silverorder.domain.menu.repository.MenuJpaRepository;
import com.silverorder.domain.menu.repository.MenuRepository;
import com.silverorder.domain.menu.repository.StoreMenuCategoryJpaRepository;
import com.silverorder.domain.option.dto.OptionDto;
import com.silverorder.domain.option.dto.ResponseOptionDto;
import com.silverorder.domain.option.entity.OptionCategory;
import com.silverorder.domain.option.repository.OptionCategoryJpaRepository;
import com.silverorder.domain.option.repository.OptionRepository;
import com.silverorder.domain.store.entity.Store;
import com.silverorder.domain.store.entity.StoreMenuCategory;
import com.silverorder.domain.store.repository.StoreJpaRepository;
import com.silverorder.domain.user.dto.UserRole;
import com.silverorder.domain.user.entity.User;
import com.silverorder.domain.user.repository.UserJpaRepository;
import com.silverorder.global.dto.ResponseCardListDto;
import com.silverorder.global.exception.CustomException;
import com.silverorder.global.exception.ErrorCode;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

/**
 * <pre>
 *      메뉴 관리 서비스 구현
 * </pre>
 * @author 노명환
 * @since JDK17
 */
@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MenuServiceImpl implements MenuService{
    private final MenuRepository menuRepository;
    private final MenuJpaRepository menuJpaRepository;
    private final StoreMenuCategoryJpaRepository storeMenuCategoryJpaRepository;
    private final OptionCategoryJpaRepository optionCategoryJpaRepository;
    private final UserJpaRepository userJpaRepository;
    private final StoreJpaRepository storeJpaRepository;
    private final OptionRepository optionRepository;
    private final RestTemplate restTemplate;

    @Value("${jupiter.api.url}")
    private String jupiterApiUrl;

    private String apiUrl;

    /**
     * 메뉴 등록
     * @param userId : 유저 id
     * @param menuDto : 메뉴 등록 dto
     * @throws Exception
     */
    @Override
    @Transactional
    public void saveMenu(Long userId, MenuDto menuDto) throws Exception {
        //유저 확인 로직
        User user = userJpaRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        if(user.getUserRole() != UserRole.ROLE_ADMIN)
            throw new CustomException(ErrorCode.NOT_AUTHENTICATED);

        //가맹점 확인 로직
        Store store = storeJpaRepository.findById(menuDto.getStoreId())
                .orElseThrow(() -> new CustomException(ErrorCode.STORE_NOT_FOUND));
        if(!store.getUser().equals(user))
            throw new CustomException(ErrorCode.STORE_NOT_AUTHENTICATED);

        //메뉴 카테고리 확인 로직
        StoreMenuCategory storeMenuCategory = storeMenuCategoryJpaRepository.findById(
                menuDto.getMenuCategoryId())
                .orElseThrow(() -> new CustomException(ErrorCode.MENU_CATEGORY_NOT_FOUND));

        //메뉴 등록
        Menu menu = menuRepository.saveMenu(storeMenuCategory, menuDto);
        log.info("return menuId : {}", menu.getId());

        //사용 옵션 확인
        long[] optionCategoryIds = menuDto.getUseOptionCategory();

        //사용 옵션 존재 시
        if(optionCategoryIds != null
                && optionCategoryIds.length >= 1) {
            for (long optionCategoryId : optionCategoryIds) {
                OptionCategory optionCategory = optionCategoryJpaRepository.findById(
                        optionCategoryId)
                        .orElseThrow(() -> new CustomException(ErrorCode.OPTION_CATEGORY_NOT_FOUND));
                //메뉴의 사용 옵션 등록
                menuRepository.saveMenuOptionCategory(menu, optionCategory);
            }
        }

        //saveMenuChromaDb(menu, store.getId());
    }

    /**
     * 메뉴 수정
     * @param userId : 유저 id
     * @param menuDto : 메뉴 등록 dto
     * @throws Exception
     */
    @Override
    @Transactional
    public void changeMenu(Long userId, Long menuId, MenuDto menuDto) throws Exception {
        //유저 확인 로직
        User user = userJpaRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        if(user.getUserRole() != UserRole.ROLE_ADMIN)
            throw new CustomException(ErrorCode.NOT_AUTHENTICATED);

        //가맹점 확인 로직
        Store store = storeJpaRepository.findById(menuDto.getStoreId())
                .orElseThrow(() -> new CustomException(ErrorCode.STORE_NOT_FOUND));
        if(!store.getUser().equals(user))
            throw new CustomException(ErrorCode.STORE_NOT_AUTHENTICATED);

        //메뉴 카테고리 확인 로직
        StoreMenuCategory storeMenuCategory = storeMenuCategoryJpaRepository.findById(
                        menuDto.getMenuCategoryId())
                .orElseThrow(() -> new CustomException(ErrorCode.MENU_CATEGORY_NOT_FOUND));

        //메뉴 등록
        Menu menu = menuRepository.updateMenu(menuId, storeMenuCategory, menuDto);
        log.info("return menuId : {}", menu.getId());

        //사용 옵션 확인
        long[] optionCategoryIds = menuDto.getUseOptionCategory();

        //사용 옵션 존재 시
        if(optionCategoryIds != null
                && optionCategoryIds.length >= 1) {
            for (long optionCategoryId : optionCategoryIds) {
                OptionCategory optionCategory = optionCategoryJpaRepository.findById(
                                optionCategoryId)
                        .orElseThrow(() -> new CustomException(ErrorCode.OPTION_CATEGORY_NOT_FOUND));
                //메뉴의 사용 옵션 등록
                menuRepository.saveMenuOptionCategory(menu, optionCategory);
            }
        }

        //saveMenuChromaDb(menu, store.getId());
    }

    /**
     * 메뉴 카테고리 등록
     * @param userId : 유저 id
     * @param requestMenuCategoryDto : 메뉴 카테고리 dto
     * @throws Exception
     */
    @Override
    @Transactional
    public void saveMenuCategory(long userId, RequestMenuCategoryDto requestMenuCategoryDto) throws Exception {
        //유저 확인 로직
        User user = userJpaRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        if(user.getUserRole() != UserRole.ROLE_ADMIN)
            throw new CustomException(ErrorCode.NOT_AUTHENTICATED);

        //가맹점 확인 로직
        Store store = storeJpaRepository.findById(requestMenuCategoryDto.getStoreId())
                .orElseThrow(() -> new CustomException(ErrorCode.STORE_NOT_FOUND));
        if(!store.getUser().equals(user))
            throw new CustomException(ErrorCode.STORE_NOT_AUTHENTICATED);

        //메뉴 카테고리 등록
        menuRepository.saveStoreMenuCategory(store, requestMenuCategoryDto.getMenuCategoryName());
    }

    /**
     * 메뉴 리스트 조회
     * @param userId : 유저 id
     * @param storeId : 가맹점 id
     * @throws Exception
     */
    @Override
    public List<ResponseMenuDto> listMenu(long userId, long storeId) throws Exception {
        //유저 확인 로직
        User user = userJpaRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        //가맹점 확인 로직
        Store store = storeJpaRepository.findById(storeId)
                .orElseThrow(() -> new CustomException(ErrorCode.STORE_NOT_FOUND));

        //옵션을 제외한 메뉴 조회
        return menuRepository.listMenu(store, user);
    }

    @Override
    public List<ResponseMenuDto> listMenuIds(Long[] menuIds) throws Exception {
        return menuRepository.listMenuIds(menuIds);
    }

    /**
     * 메뉴의 옵션 조회
     * @param menuId : 메뉴id
     * @throws Exception
     */
    @Override
    public List<ResponseOptionDto> menuOptionList(long menuId) throws Exception {
        //메뉴 확인 로직
        Menu menu = menuJpaRepository.findById(menuId)
                .orElseThrow(() -> new CustomException(ErrorCode.MENU_NOT_FOUND));

        //메뉴가 사용하는 옵션 카테고리 조회
        List<OptionCategory> optionCategoryList = menuRepository.menuOptions(menu);

        //사용하는 옵션이 있을 경우
        if(optionCategoryList != null && !optionCategoryList.isEmpty()){
            //옵션리스트 선언
            List<ResponseOptionDto> responseOptionDtoList = new ArrayList<>();

            for(OptionCategory optionCategory : optionCategoryList) {
                responseOptionDtoList.add(new ResponseOptionDto(
                        optionCategory.getId(),
                        optionCategory.getOptionCategoryTitle(),
                        optionCategory.getOptionType()
                ));
            }

            //옵션 카테고리의 옵션들 조회
            for(ResponseOptionDto options : responseOptionDtoList){
                //옵션 카테고리 확인 로직
                OptionCategory optionCategory = optionCategoryJpaRepository.findById(
                                options.getOptionCategoryId())
                        .orElseThrow(() -> new CustomException(ErrorCode.OPTION_CATEGORY_NOT_FOUND));

                //옵션리스트 조회
                options.setOptionDtoList(optionRepository.detailOptionCategory(optionCategory));
            }

            return responseOptionDtoList;

        //사용 옵션이 없을경우 그대로 반환
        }else return null;
    }

    @Override
    public List<ResponseMenuCategory> menuCategoryList(long storeId) throws Exception {
        //가맹점 확인 로직
        Store store = storeJpaRepository.findById(storeId)
                .orElseThrow(() -> new CustomException(ErrorCode.STORE_NOT_FOUND));

        //옵션을 제외한 메뉴 조회
        return menuRepository.menuCategoryList(store);
    }

    private void saveMenuChromaDb(Menu menu, Long storeId) throws Exception{
        ChromaMenuDto chromaMenuDto = new ChromaMenuDto(
                menu.getId().toString(), menu.getMenuDesc(), storeId.toString()
        );

        apiUrl = "/insert/menu";
        String url = jupiterApiUrl + apiUrl;
        restTemplate.postForEntity(url, chromaMenuDto, Void.class);
    }
}

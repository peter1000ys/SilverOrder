package com.silverorder.domain.menu.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.silverorder.domain.menu.dto.RequestMenuDto;
import com.silverorder.domain.menu.dto.ResponseMenuCategory;
import com.silverorder.domain.menu.dto.ResponseMenuDto;
import com.silverorder.domain.menu.entity.Menu;
import com.silverorder.domain.menu.entity.MenuOptionCategory;
import com.silverorder.domain.option.entity.OptionCategory;
import com.silverorder.domain.store.entity.Store;
import com.silverorder.domain.store.entity.StoreMenuCategory;
import com.silverorder.domain.user.entity.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.PersistenceException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.silverorder.domain.menu.entity.QMenu.menu;
import static com.silverorder.domain.menu.entity.QMenuOptionCategory.menuOptionCategory;
import static com.silverorder.domain.store.entity.QStoreMenuCategory.storeMenuCategory;

/**
 * <pre>
 *      메뉴 관리 레포지토리 구현
 * </pre>
 * @author 노명환
 * @since JDK17
 */
@Repository
@RequiredArgsConstructor
public class MenuRepositoryImpl implements MenuRepository{

    @PersistenceContext
    private final EntityManager em;
    private final JPAQueryFactory queryFactory;

    /**
     * 메뉴 신규 등록
     * <pre>
     *      가게에서 사용할 메뉴를 등록한다
     * </pre>
     * @param storeMenuCategory : 메뉴 카테고리 entity
     * @param requestMenuDto : 메뉴정보 dto
     * @return : 메뉴 entity
     * @throws PersistenceException : JPA 표준 예외
     */
    @Override
    public Menu saveMenu(StoreMenuCategory storeMenuCategory, RequestMenuDto requestMenuDto) throws PersistenceException {
        try {
            Menu menu = new Menu(
                    null,
                    storeMenuCategory,
                    requestMenuDto.getMenuName(),
                    requestMenuDto.getSimpleName(),
                    requestMenuDto.getMenuDesc(),
                    requestMenuDto.getMenuStatus(),
                    requestMenuDto.getMenuPrice(),
                    requestMenuDto.getRecommend(),
                    requestMenuDto.getMenuThumb()
            );

            em.persist(menu);
            em.flush();

            return menu;
        } catch(Exception e){
            throw new PersistenceException("메뉴 등록 중 에러 발생", e);
        }
    }

    /**
     * 메뉴 옵션 관계 등록
     * <pre>
     *      메뉴에서 사용할 메뉴 카테고리를 저장한다
     * </pre>
     * @param menu : 메뉴 entity
     * @param optionCategory : 옵션 카테고리 entity
     * @throws PersistenceException : JPA 표준 예외
     */
    @Override
    public void saveMenuOptionCategory(Menu menu, OptionCategory optionCategory) {
        try {
            MenuOptionCategory menuOptionCategory = new MenuOptionCategory(
                    null,
                    optionCategory,
                    menu
            );

            em.persist(menuOptionCategory);
            em.flush();
        } catch(Exception e){
            throw new PersistenceException("메뉴 옵션 관계 등록 중 에러 발생", e);
        }
    }

    /**
     * 메뉴 카테고리 등록
     * <pre>
     *      가맹점에서 사용할 메뉴의 카테고리를 저장한다
     * </pre>
     * @param store : 가맹점 entity
     * @param menuCategoryName : 메뉴 카테고리 이름
     * @throws PersistenceException : JPA 표준 예외
     */
    @Override
    public void saveStoreMenuCategory(Store store, String menuCategoryName) throws PersistenceException {
        try{
            //메뉴 카테고리 생성 전처리
            StoreMenuCategory storeMenuCategory = new StoreMenuCategory(
                    null,
                    store,
                    menuCategoryName
            );

            //메뉴 카테고리 insert
            em.persist(storeMenuCategory);
            em.flush();

        }catch(Exception e){
            throw new PersistenceException("메뉴 카테고리 등록 중 에러 발생", e);
        }
    }

    /**
     * 메뉴 리스트 조회
     * <pre>
     *      가맹점에서 판매하는 메뉴들을 조회한다.
     *
     * </pre>
     * @param store : 가맹점 entity
     * @param user : 유저 entity
     * @throws PersistenceException : JPA 표준 예외
     */
    @Override
    public List<ResponseMenuDto> listMenu(Store store, User user) throws PersistenceException {
        try{
            return queryFactory
                    .select(Projections.constructor(ResponseMenuDto.class,
                            menu.id,
                            menu.storeMenuCategory.id,
                            menu.storeMenuCategory.menuCategoryName,
                            menu.menuName,
                            menu.simpleName,
                            menu.menuDesc,
                            menu.menuStatus,
                            menu.menuPrice,
                            menu.recommend,
                            menu.thumb
                    ))
                    .from(menu)
                    .where(menu.storeMenuCategory.store.eq(store))
                    .fetch();
        }catch(Exception e){
            throw new PersistenceException("메뉴 조회 중 에러 발생", e);
        }
    }

    @Override
    public List<OptionCategory> menuOptions(Menu menu) throws PersistenceException {
        try{
            return queryFactory
                    .select(menuOptionCategory.optionCategory)
                    .from(menuOptionCategory)
                    .where(menuOptionCategory.menu.eq(menu))
                    .fetch();
        }catch(Exception e){
            throw new PersistenceException("메뉴 옵션 조회 중 에러 발생", e);
        }
    }

    @Override
    public List<ResponseMenuCategory> menuCategoryList(Store store) throws Exception {
        try{
            return queryFactory
                    .select(Projections.constructor(ResponseMenuCategory.class,
                            storeMenuCategory.id,
                            storeMenuCategory.menuCategoryName
                            ))
                    .from(storeMenuCategory)
                    .where(storeMenuCategory.store.eq(store))
                    .fetch();
        }catch(Exception e){
            throw new PersistenceException("메뉴 카테고리 조회 중 에러 발생", e);
        }
    }


}

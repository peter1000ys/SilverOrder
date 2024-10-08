package com.silverorder.domain.store.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.silverorder.domain.store.dto.ResponseProcAgeDto;
import com.silverorder.domain.store.dto.ProcSalesDto;
import com.silverorder.domain.store.dto.ProcWeekDto;
import com.silverorder.domain.store.dto.StoreDto;
import com.silverorder.domain.store.entity.Store;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.PersistenceException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

import static com.silverorder.domain.menu.entity.QMenu.menu;
import static com.silverorder.domain.store.entity.QStore.store;
import static com.silverorder.domain.store.entity.QStoreAgeSalesCalculate.storeAgeSalesCalculate;
import static com.silverorder.domain.store.entity.QStoreSalesCalculate.storeSalesCalculate;

@Repository
@RequiredArgsConstructor
public class StoreRepositoryImpl implements StoreRepository{
    @PersistenceContext
    private final EntityManager em;
    private final JPAQueryFactory queryFactory;

    /**
     * 가맹점 매출현황
     *
     * @param store
     */
    @Override
    public ProcSalesDto storeSales(Store store) throws PersistenceException {
        try {
            return queryFactory
                    .select(Projections.constructor(ProcSalesDto.class,
                            new CaseBuilder()
                                    .when(storeSalesCalculate.procDate.eq(LocalDate.now()))
                                    .then(storeSalesCalculate.procDailySales)
                                    .otherwise(0L).sum(),
                            new CaseBuilder()
                                    .when(storeSalesCalculate.procDate.between(
                                            LocalDate.now().minusWeeks(1),
                                            LocalDate.now()
                                    ))
                                    .then(storeSalesCalculate.procDailySales)
                                    .otherwise(0L).sum(),
                            new CaseBuilder()
                                    .when(storeSalesCalculate.procDate.between(
                                            LocalDate.now().minusMonths(1),
                                            LocalDate.now()
                                    ))
                                    .then(storeSalesCalculate.procDailySales)
                                    .otherwise(0L).sum(),
                            storeSalesCalculate.procDailySales.sum()
                    ))
                    .from(storeSalesCalculate)
                    .where(storeSalesCalculate.store.eq(store).and(
                            storeSalesCalculate.procDate.between(
                                    LocalDate.now().minusYears(1),
                                    LocalDate.now()
                            )
                    ))
                    .fetchOne();
        }catch(Exception e){
            e.printStackTrace();
            throw new PersistenceException("가맹점 매출 조회 중 에러 발생", e);
        }
    }

    /**
     * 최근 1주일간의 매출 현황
     *
     * @param store
     */
    @Override
    public List<ProcWeekDto> procWeekSales(Store store) throws PersistenceException {
        try {
            return queryFactory
                    .select(Projections.constructor(ProcWeekDto.class,
                            storeSalesCalculate.id,
                            storeSalesCalculate.procDate,
                            storeSalesCalculate.procDailySales
                    ))
                    .from(storeSalesCalculate)
                    .where(storeSalesCalculate.store.eq(store).and(
                            storeSalesCalculate.procDate.between(
                                    LocalDate.now().minusWeeks(1),
                                    LocalDate.now()
                            )
                    ))
                    .orderBy(storeSalesCalculate.procDate.asc())
                    .fetch();
        }catch(Exception e){
            e.printStackTrace();
            throw new PersistenceException("가맹점 매출 조회 중 에러 발생", e);
        }
    }

    /**
     * 연령별 메뉴 매출
     *
     * @param store
     * @param purchaseAge
     */
    @Override
    public List<ResponseProcAgeDto> procAgeSales(Store store, Integer purchaseAge) throws PersistenceException {
        try {
            return queryFactory
                    .select(Projections.constructor(ResponseProcAgeDto.class,
                            storeAgeSalesCalculate.menu.id,
                            menu.menuName,
                            storeAgeSalesCalculate.procMenuAmount.sum()
                    ))
                    .from(storeAgeSalesCalculate)
                    .innerJoin(menu).on(storeAgeSalesCalculate.menu.id.eq(menu.id))
                    .where(storeAgeSalesCalculate.store.eq(store).and(
                            storeAgeSalesCalculate.procDate.between(
                                    LocalDate.now().minusMonths(1),
                                    LocalDate.now()
                            )).and(
                            storeAgeSalesCalculate.purchaseAge.eq(purchaseAge)
                    ))
                    .groupBy(storeAgeSalesCalculate.menu.id, menu.menuName)
                    .orderBy(storeAgeSalesCalculate.procMenuAmount.sum().desc())
                    .fetch();
        }catch(Exception e){
            e.printStackTrace();
            throw new PersistenceException("연령별 구매 메뉴 조회 중 에러 발생", e);
        }
    }
}

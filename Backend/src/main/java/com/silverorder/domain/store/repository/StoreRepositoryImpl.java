package com.silverorder.domain.store.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.silverorder.domain.order.dto.ResponseOrderDetailDto;
import com.silverorder.domain.store.dto.ResponseProcSalesDto;
import com.silverorder.domain.store.entity.Store;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.PersistenceException;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

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
    public ResponseProcSalesDto storeSales(Store store) throws PersistenceException {
        try {
            return queryFactory
                    .select(Projections.constructor(ResponseProcSalesDto.class,
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
            throw new PersistenceException("주문 상세내역 조회 중 에러 발생", e);
        }
    }
}

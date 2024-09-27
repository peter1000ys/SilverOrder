package com.silverorder.domain.store.repository;

import com.silverorder.domain.store.dto.ResponseProcAgeDto;
import com.silverorder.domain.store.dto.ProcSalesDto;
import com.silverorder.domain.store.dto.ProcWeekDto;
import com.silverorder.domain.store.entity.Store;
import jakarta.persistence.PersistenceException;

import java.util.List;

public interface StoreRepository {
    /** 가맹점 매출현황 */
    ProcSalesDto storeSales(Store store) throws PersistenceException;

    /** 최근 1주일간의 매출 현황 */
    List<ProcWeekDto> procWeekSales(Store store) throws PersistenceException;

    /** 연령별 메뉴 매출 */
    List<ResponseProcAgeDto> procAgeSales(Store store, Integer purchaseAge) throws PersistenceException;
}

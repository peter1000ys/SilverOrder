package com.silverorder.domain.store.repository;

import com.silverorder.domain.store.dto.ResponseProcSalesDto;
import com.silverorder.domain.store.entity.Store;
import jakarta.persistence.PersistenceException;

import java.util.List;

public interface StoreRepository {
    /** 가맹점 매출현황 */
    ResponseProcSalesDto storeSales(Store store) throws PersistenceException;
}

package com.silverorder.domain.store.service;

import com.silverorder.domain.store.dto.*;
import com.silverorder.domain.store.entity.Store;

import java.util.List;

/**
 * 스토어 관련 서비스
 * @author 채기훈
 * @since JDK17 Eclipse Temurin
 */
public interface StoreService {
    ResponseLatitudeLongitudeDTO getStoreLocate(RequestLatitudeLongitudeDTO request);
    List<Store> getAllStore();
    List<ResponseNearStore> calculateStoreDistance(ResponseLatitudeLongitudeDTO request);

    /** 가맹점 매출현황 */
    ResponseProcSalesDto storeSales(Long userId, Long storeId) throws Exception;

    /** 연령별 메뉴 매출 */
    List<ResponseProcAgeDto> procAgeSales(Long userId, Long storeId, Integer purchaseAge) throws Exception;

    StoreDto getStore(Long storeId) throws Exception;
}

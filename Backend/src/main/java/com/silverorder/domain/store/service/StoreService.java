package com.silverorder.domain.store.service;

import com.silverorder.domain.store.dto.RequestLatitudeLongitudeDTO;
import com.silverorder.domain.store.dto.ResponseLatitudeLongitudeDTO;
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
    List<ResponseLatitudeLongitudeDTO> calculateStoreDistance(ResponseLatitudeLongitudeDTO request);
}

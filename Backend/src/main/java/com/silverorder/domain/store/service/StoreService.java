package com.silverorder.domain.store.service;

import com.silverorder.domain.store.dto.ResponseLatitudeLongitudeDTO;

/**
 * 스토어 관련 서비스
 * @author 채기훈
 * @since JDK17 Eclipse Temurin
 */
public interface StoreService {
    ResponseLatitudeLongitudeDTO getStoreLocate(ResponseLatitudeLongitudeDTO request);
}

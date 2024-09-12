package com.silverorder.domain.store.service;

import com.silverorder.domain.store.dto.RequestLatitudeLongitudeDTO;
import com.silverorder.domain.store.dto.ResponseLatitudeLongitudeDTO;
import com.silverorder.domain.store.entity.Store;
import com.silverorder.domain.store.repository.StoreJpaRepository;
import com.silverorder.global.exception.CustomException;
import com.silverorder.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 매장 관련 서비스
 * @author 채기훈
 * @since JDK17 Eclipse Temurin
 */
@Service
@Transactional
@RequiredArgsConstructor
public class StoreServiceImpl {

    private final StoreJpaRepository storeJpaRepository;

    /**
     * 매장 위,경도 반환
     * @param request
     * @return
     */
    public ResponseLatitudeLongitudeDTO getStoreLocate(RequestLatitudeLongitudeDTO request) {

        Long storeId = request.getStoreId();


        Store store= storeJpaRepository.findById(storeId).orElseThrow(()->new CustomException(ErrorCode.NO_ELEMENT));

        double latitude = store.getLatitude();
        double longitude = store.getLongitude();

        ResponseLatitudeLongitudeDTO response = ResponseLatitudeLongitudeDTO.builder()
                .latitude(latitude)
                .longitude(longitude)
                .build();

        return response;
    }
}

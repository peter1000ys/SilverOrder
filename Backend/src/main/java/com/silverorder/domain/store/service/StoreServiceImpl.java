package com.silverorder.domain.store.service;

import com.silverorder.domain.store.dto.RequestLatitudeLongitudeDTO;
import com.silverorder.domain.store.dto.ResponseLatitudeLongitudeDTO;
import com.silverorder.domain.store.dto.ResponseNearStore;
import com.silverorder.domain.store.entity.Store;
import com.silverorder.domain.store.repository.StoreJpaRepository;
import com.silverorder.global.exception.CustomException;
import com.silverorder.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

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

    public List<Store> getAllStore(){
        List<Store> stores = storeJpaRepository.findAll();

        return stores;
    }

    public List<ResponseNearStore> calculateStoreDistance(ResponseLatitudeLongitudeDTO request) {
        double userLatitude = request.getLatitude();
        double userLongitude = request.getLongitude();

        List<Store> stores = getAllStore();
        List<ResponseNearStore> response = new ArrayList<>();

        for (Store store : stores) {
            double storeLatitude = store.getLatitude();
            double storeLongitude = store.getLongitude();

            double distance = calculateDistance(userLatitude, userLongitude, storeLatitude, storeLongitude);

            if (distance <= 1.0) { // 1km 이내인 경우
                ResponseNearStore dto = new ResponseNearStore();
                dto.setLatitude(storeLatitude);
                dto.setLongitude(storeLongitude);
                dto.setStoreId(store.getId());
                dto.setStoreName(store.getStoreName());
                response.add(dto);
            }

        }

        return response;
    }

    /**
     * Haversine 공식 적용
     * @param lat1
     * @param lon1
     * @param lat2
     * @param lon2
     * @return
     */
    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // 지구의 반지름 (km)

        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double distance = R * c;

        return distance;
    }
}

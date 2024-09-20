package com.silverorder.domain.store.controller;

import com.silverorder.domain.store.dto.RequestLatitudeLongitudeDTO;
import com.silverorder.domain.store.dto.ResponseLatitudeLongitudeDTO;
import com.silverorder.domain.store.service.StoreServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Store", description = "가게 관리")
@RestController
@RequestMapping("/store")
@CrossOrigin("*")
@RequiredArgsConstructor
public class StoreController {

    private final StoreServiceImpl storeService;

    @Operation(summary = "매장 위치 조회",description = "매장의 자세한 위치를 위도와 경도로 반환합니다.")
    @GetMapping("/list/api")
    public ResponseEntity<?> getLatitudeLongitude(@AuthenticationPrincipal UserDetails userDetails, @Valid RequestLatitudeLongitudeDTO request) {

        ResponseLatitudeLongitudeDTO response = storeService.getStoreLocate(request);

        return ResponseEntity.ok(response);
    }


}

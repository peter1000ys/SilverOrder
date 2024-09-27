package com.silverorder.domain.store.controller;

import com.silverorder.domain.store.dto.*;
import com.silverorder.domain.store.service.StoreServiceImpl;
import com.silverorder.domain.user.dto.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Store", description = "가게 관리")
@RestController
@RequestMapping("/store")
@CrossOrigin("*")
@RequiredArgsConstructor
public class StoreController {

    private final StoreServiceImpl storeService;

    @Operation(summary = "매장 위치 조회",description = "매장의 자세한 위치를 위도와 경도로 반환합니다.")
    @GetMapping("/list/")
    public ResponseEntity<?> getLatitudeLongitude(@AuthenticationPrincipal UserDetails userDetails, @Valid RequestLatitudeLongitudeDTO request) {

        ResponseLatitudeLongitudeDTO response = storeService.getStoreLocate(request);

        return ResponseEntity.ok(response);
    }

    @Operation(summary = "가게 매출현황 조회", description="일, 주, 월, 년의 총 매출을 조회합니다.")
    @GetMapping("/mySales/{storeId}")
    public ResponseEntity<?> userOrderList(
            @PathVariable Long storeId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) throws Exception {
        long userId = userDetails.getUser().getUserId();
        ResponseProcSalesDto responseProcSalesDto = storeService.storeSales(userId, storeId);
        return ResponseEntity.ok(responseProcSalesDto);
    }

    @Operation(summary = "근처 매장 조회", description = "사용자 위치 기준 1km 이내의 매장을 표시합니다")
    @GetMapping("/list/near")
    public ResponseEntity<?> getNear(@AuthenticationPrincipal UserDetails userDetails, @Valid ResponseLatitudeLongitudeDTO request){

        List<ResponseNearStore> response = storeService.calculateStoreDistance(request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "연령별 판매 메뉴 조회", description="한달동안 연령별로 판매된 메뉴의 개수를 조회합니다.")
    @GetMapping("/procAge/{storeId}/{purchaseAge}")
    public ResponseEntity<?> procAgeList(
            @PathVariable Long storeId,
            @PathVariable Integer purchaseAge,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) throws Exception {
        long userId = userDetails.getUser().getUserId();
        List<ResponseProcAgeDto> responseProcAgeDtoList = storeService.procAgeSales(userId, storeId, purchaseAge);
        return ResponseEntity.ok(responseProcAgeDtoList);
    }

}

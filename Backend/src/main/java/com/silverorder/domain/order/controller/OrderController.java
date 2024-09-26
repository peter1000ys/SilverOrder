package com.silverorder.domain.order.controller;

import com.silverorder.domain.menu.dto.ResponseMenuDto;
import com.silverorder.domain.order.dto.*;
import com.silverorder.domain.order.service.OrderService;
import com.silverorder.domain.user.dto.CustomUserDetails;
import com.silverorder.domain.user.dto.UserRole;
import com.silverorder.global.exception.CustomException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * <pre>
 *     주문 관리 컨트롤러 클래스
 * </pre>
 *
 * @author 박봉균
 * @since JDK17 Eclipse Temurin
 */
@Tag(name = "Order", description = "주문 관리")
@RestController
@RequestMapping("/order")
//@CrossOrigin("*")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @Operation(
            summary = "주문(결제) 진행",
            description = "가맹점ID, 간편결제수단ID, 메뉴, 요청사항, 금액 등을 입력 받아 결제를 진행하고, 성공 시, 주문 정보를 저장합니다.")
    @PostMapping("/transaction")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> orderTransaction(
            @RequestBody OrderDto orderDto,
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) throws Exception {
        orderService.saveOrder(orderDto, customUserDetails.getUser().getUserApiKey());
        return new ResponseEntity<>("주문 완료", HttpStatus.OK);
    }

    @Operation(
            summary = "주문 상태 변경",
            description = "'ORDER_IN', 'ORDER_CANCELED', ORDER_DENIED', 'ORDER_ACCEPTED', 'ORDER_IN_PROGRESS', 'ORDER_DONE' 중 하나로 상태 변경.")
    @PatchMapping("/change-status")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> changeOrderStatus(
            @RequestBody OrderStatusChangeDto orderStatusChangeDto
    ) throws Exception {

        orderService.changeOrderStatus(orderStatusChangeDto);
        return new ResponseEntity<>("주문 상태 변경 성공", HttpStatus.OK);
    }

    @Operation(summary = "주문 내역 조회", description="유저가 주문한 내역을 조회합니다.")
    @GetMapping("/myOrder")
    public ResponseEntity<?> userOrderList(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) throws Exception {
        long userId = userDetails.getUser().getUserId();
        List<ResponseOrderDto> userOrderList = orderService.userOrderList(userId);
        return ResponseEntity.ok(userOrderList);
    }

    @Operation(summary = "주문 내역 상세조회", description="주문한 메뉴를 조회합니다.")
    @GetMapping("/orderDetail/{orderId}")
    public ResponseEntity<?> storeOrderList(
            @PathVariable Long orderId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) throws Exception {
        long userId = userDetails.getUser().getUserId();
        List<ResponseOrderDetailDto> orderDetailList = orderService.userOrderDetailList(userId, orderId);
        return ResponseEntity.ok(orderDetailList);
    }

    @Operation(summary = "금일의 가게 주문 내역 조회", description="금일 가게의 주문 내역을 조회합니다.")
    @GetMapping("/storeOrder/{storeId}")
    public ResponseEntity<?> userOrderDetailList(
            @PathVariable Long storeId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) throws Exception {
        long userId = userDetails.getUser().getUserId();
        List<ResponseOrderStoreDto> responseOrderStoreDtoList = orderService.storeOrderList(userId, storeId);
        return ResponseEntity.ok(responseOrderStoreDtoList);
    }

}

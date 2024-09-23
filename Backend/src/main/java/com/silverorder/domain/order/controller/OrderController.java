package com.silverorder.domain.order.controller;

import com.silverorder.domain.order.dto.OrderPayRequestDto;
import com.silverorder.domain.order.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;


@Tag(name = "Order", description = "주문 관리")
@RestController
@RequestMapping("/order")
@CrossOrigin("*")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @MessageMapping("/order-complete-message/{storeId}")
    @SendTo("/topic/order-complete/{storeId}")
    public String message(@DestinationVariable Long storeId, String message) {
        System.out.println("가게번호 : " + storeId);
        System.out.println("메세지 도착 :" + message);
        return message;
    }


    @Operation(
            summary = "주문(결제) 진행",
            description = "가맹점ID, 간편결제수단ID, 메뉴, 요청사항, 금액 등을 입력 받아 결제를 진행하고, 성공 시, 주문 정보를 저장합니다.")
    @PostMapping("/transaction")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> orderTransaction(
            @RequestBody OrderPayRequestDto orderPayRequestDto
    ) throws Exception {

        return new ResponseEntity<>("", HttpStatus.OK);
    }


}

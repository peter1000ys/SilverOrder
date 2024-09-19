package com.silverorder.domain.order.controller;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class OrderController {

    @MessageMapping("/order-complete-message/{storeId}")
    @SendTo("/topic/order-complete/{storeId}")
    public String message(@DestinationVariable Long storeId, String message) {
        System.out.println("가게번호 : " + storeId);
        System.out.println("메세지 도착 :" + message);
        return message;
    }

}

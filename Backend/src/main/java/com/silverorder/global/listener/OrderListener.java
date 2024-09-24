package com.silverorder.global.listener;

import com.silverorder.domain.order.entity.Order;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class OrderListener {
    private final SimpMessagingTemplate messagingTemplate;

    public OrderListener(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @RabbitListener(queues = "order-status-queue")
    public void handleOrderStatusChange(Order order) {
        messagingTemplate.convertAndSend("/topic/orderStatus", order);
    }
}

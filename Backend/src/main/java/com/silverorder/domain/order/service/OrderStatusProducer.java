package com.silverorder.domain.order.service;

import com.silverorder.global.config.RabbitMQConfig;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderStatusProducer {

    private final AmqpTemplate amqpTemplate;

    @Autowired
    public OrderStatusProducer(AmqpTemplate amqpTemplate) {
        this.amqpTemplate = amqpTemplate;
    }

    public void sendOrderStatusUpdate(OrderStatusProducer event) {
        amqpTemplate.convertAndSend(RabbitMQConfig.ORDER_EXCHANGE,
                RabbitMQConfig.ORDER_ROUTING_KEY, event);
    }

}

package com.silverorder.domain.order.service;

import com.silverorder.domain.order.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {
    private final OrderStatusProducer orderStatusProducer;
    private final OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderStatusProducer orderStatusProducer, OrderRepository orderRepository) {
        this.orderStatusProducer = orderStatusProducer;
        this.orderRepository = orderRepository;
    }

}

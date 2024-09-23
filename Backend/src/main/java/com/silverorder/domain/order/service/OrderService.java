package com.silverorder.domain.order.service;

import com.silverorder.domain.order.dto.OrderDto;

public interface OrderService {
    void saveOrder(OrderDto orderDto, String userKey) throws Exception;
}

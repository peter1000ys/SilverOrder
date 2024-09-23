package com.silverorder.domain.order.service;

import com.silverorder.domain.order.dto.OrderDto;
import com.silverorder.domain.order.dto.OrderRequestDto;

public interface OrderService {
    void saveOrder(OrderDto orderDto) throws Exception;
}

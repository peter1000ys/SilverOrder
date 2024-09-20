package com.silverorder.domain.order.service;

import com.silverorder.domain.order.dto.OrderRequestDto;

public interface OrderService {
    void saveOrder(OrderRequestDto orderRequestDto) throws Exception;
}

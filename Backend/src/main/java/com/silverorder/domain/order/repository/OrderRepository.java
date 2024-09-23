package com.silverorder.domain.order.repository;


import com.silverorder.domain.order.dto.OrderRequestDto;
import jakarta.persistence.PersistenceException;

public interface OrderRepository {
    void insertOrder(OrderRequestDto orderRequestDto) throws PersistenceException;
}

package com.silverorder.domain.order.repository;
import com.silverorder.domain.order.dto.OrderDto;
import jakarta.persistence.PersistenceException;

public interface OrderRepository {
    void insertOrder(OrderDto orderDto) throws PersistenceException;

}

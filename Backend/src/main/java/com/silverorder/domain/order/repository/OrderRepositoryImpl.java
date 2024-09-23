package com.silverorder.domain.order.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.silverorder.domain.order.dto.OrderRequestDto;
import com.silverorder.domain.order.entity.Order;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.PersistenceException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class OrderRepositoryImpl implements OrderRepository {
    @PersistenceContext
    private final EntityManager em;
    private final JPAQueryFactory queryFactory;

    @Override
    public void insertOrder(OrderRequestDto orderRequestDto) throws PersistenceException {

    }

}

package com.silverorder.domain.order.service;

import com.silverorder.domain.order.dto.OrderRequestDto;
import com.silverorder.domain.order.entity.Order;
import com.silverorder.domain.order.repository.OrderJpaRepository;
import com.silverorder.domain.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final OrderJpaRepository orderJpaRepository;

    @Transactional
    @Override
    public void saveOrder(OrderRequestDto orderRequestDto) throws Exception {
        // 1. Order 엔티티 생성 및 저장
        // 2. OrderMenu 및 OrderOption 생성
        // 3. OrderMenu 벌크 삽입
        // 4. OrderOption 벌크 삽입
    }

}

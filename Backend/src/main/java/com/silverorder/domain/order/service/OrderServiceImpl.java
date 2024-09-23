package com.silverorder.domain.order.service;

import com.silverorder.domain.order.dto.OrderDto;
import com.silverorder.domain.order.repository.OrderRepository;
import com.silverorder.domain.payment.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final PaymentService paymentService;

    @Transactional
    @Override
    public void saveOrder(OrderDto orderDto) throws Exception {
        orderRepository.insertOrder(orderDto);
    }

}

package com.silverorder.domain.order.service;

import com.silverorder.domain.order.dto.OrderDto;
import com.silverorder.domain.order.repository.OrderRepository;
import com.silverorder.domain.payment.dto.CardRequestDto;
import com.silverorder.domain.payment.service.PaymentService;
import com.silverorder.global.exception.CustomException;
import com.silverorder.global.exception.ErrorCode;
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
    public void saveOrder(OrderDto orderDto, String userKey) throws Exception {
        CardRequestDto cardRequestDto = new CardRequestDto(
                orderDto.getPaymentId(),
                orderDto.getStoreId(),
                orderDto.getTotalPrice(),
                userKey
                );

        Long transactionUniqueNo = paymentService.payCard(cardRequestDto);
        if(transactionUniqueNo != null) {
            orderDto.setTradeNum(transactionUniqueNo);
            orderRepository.insertOrder(orderDto);
        }
    }

}

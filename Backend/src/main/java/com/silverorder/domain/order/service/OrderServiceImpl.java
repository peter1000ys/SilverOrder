package com.silverorder.domain.order.service;

import com.silverorder.domain.order.dto.OrderDto;
import com.silverorder.domain.order.dto.OrderStatusChangeDto;
import com.silverorder.domain.order.repository.OrderJpaRepository;
import com.silverorder.domain.order.repository.OrderRepository;
import com.silverorder.domain.payment.dto.CardRequestDto;
import com.silverorder.domain.payment.service.PaymentService;
import com.silverorder.global.exception.CustomException;
import com.silverorder.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * <pre>
 *     주문 관리 서비스 구현 클래스
 * </pre>
 *
 * @author 박봉균
 * @since JDK17 Eclipse Temurin
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final OrderJpaRepository orderJpaRepository;
    private final PaymentService paymentService;
    private final RabbitTemplate rabbitTemplate;


    /**
     * 결제 및 주문 진행, 주문 정보 DB 영속화
     * @param orderDto 주문DTO
     * @param userKey 금융망 API 연동 유저키
     * @throws Exception
     */
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

    /**
     * 주문 상태 변경
     *
     * @param orderStatusChangeDto 상태변경DTO
     */
    @Override
    public void changeOrderStatus(OrderStatusChangeDto orderStatusChangeDto) throws Exception {
        // 주문 존재 유효성 검사
        orderJpaRepository.findById(orderStatusChangeDto.getOrderId())
                .orElseThrow(() -> new CustomException(ErrorCode.ORDER_NOT_FOUND));

        // 주문 상태 변경 로직
        orderRepository.updateOrderStatus(orderStatusChangeDto);

        // 주문 ID에 따라 특정 경로로 메시지 발송 -> 클라이언트는 주문 ID 기반 구독
        rabbitTemplate.convertAndSend("/topic/orderStatus/" + orderStatusChangeDto.getOrderId(), orderStatusChangeDto);
    }
}

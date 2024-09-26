package com.silverorder.domain.order.service;

import com.silverorder.domain.order.dto.*;
import com.silverorder.domain.order.entity.Order;
import com.silverorder.domain.order.repository.OrderJpaRepository;
import com.silverorder.domain.order.repository.OrderRepository;
import com.silverorder.domain.payment.dto.CardRequestDto;
import com.silverorder.domain.payment.service.PaymentService;
import com.silverorder.domain.store.entity.Store;
import com.silverorder.domain.store.repository.StoreJpaRepository;
import com.silverorder.domain.user.entity.User;
import com.silverorder.domain.user.repository.UserJpaRepository;
import com.silverorder.global.exception.CustomException;
import com.silverorder.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


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
    private final SimpMessagingTemplate messagingTemplate;
    private final UserJpaRepository userJpaRepository;
    private final StoreJpaRepository storeJpaRepository;


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
        //rabbitTemplate.convertAndSend("/topic/orderStatus/" + String.valueOf(orderStatusChangeDto.getOrderId()), orderStatusChangeDto);

        messagingTemplate.convertAndSend("/topic/orderStatus/" + String.valueOf(orderStatusChangeDto.getOrderId()), orderStatusChangeDto);

    }

    /**
     * 유저 주문 내역 조회
     *
     * @param userId
     */
    @Override
    public List<ResponseOrderDto> userOrderList(Long userId) throws Exception {
        // 유저 검사
        User user = userJpaRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        return orderRepository.userOrderList(user);
    }

    /**
     * 주문 메뉴 조회
     *
     * @param userId
     * @param orderId
     */
    @Override
    public List<ResponseOrderDetailDto> userOrderDetailList(Long userId, Long orderId) throws Exception {
        // 유저 검사
        User user = userJpaRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        Order order = orderJpaRepository.findById(orderId)
                .orElseThrow(() -> new CustomException(ErrorCode.ORDER_NOT_FOUND));

        List<ResponseOrderDetailDto> orderDetailList =  orderRepository.userOrderDetailList(order);

        if(orderDetailList != null && !orderDetailList.isEmpty()){
            for(ResponseOrderDetailDto orderMenus : orderDetailList){
                if(orderMenus.getOptionCount() > 0)
                    orderMenus.setOptionList(orderRepository.orderMenuOption(orderMenus.getMenuId()));
            }
        }
        return orderDetailList;
    }

    /**
     * 가게 주문 리스트
     *
     * @param userId
     * @param storeId
     */
    @Override
    public List<ResponseOrderStoreDto> storeOrderList(Long userId, Long storeId) throws Exception {
        // 유저 검사
        User user = userJpaRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // 가게 검사
        Store store = storeJpaRepository.findById(storeId)
                .orElseThrow(() -> new CustomException(ErrorCode.STORE_NOT_FOUND));

        // 금일 가게의 주문내역 조회
        List<ResponseOrderStoreDto> responseOrderStoreDtoList
                = orderRepository.storeOrderList(store);


        if(responseOrderStoreDtoList != null && !responseOrderStoreDtoList.isEmpty()){
            // 주문 상세조회
            for(ResponseOrderStoreDto orders : responseOrderStoreDtoList){
                Order order = orderJpaRepository.findById(orders.getOrderId())
                        .orElseThrow(() -> new CustomException(ErrorCode.ORDER_NOT_FOUND));
                orders.setMenuList(orderRepository.userOrderDetailList(order));

                for(ResponseOrderDetailDto orderDetails : orders.getMenuList()){
                    if(orderDetails.getOptionCount() > 0){
                        // 주문 메뉴의 옵션 조회
                        orderDetails.setOptionList(orderRepository.orderMenuOption(orderDetails.getOrderMenuId()));
                    }
                }
            }
        }

        return responseOrderStoreDtoList;
    }

}

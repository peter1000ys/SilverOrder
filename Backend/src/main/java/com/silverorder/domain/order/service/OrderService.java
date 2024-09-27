package com.silverorder.domain.order.service;

import com.silverorder.domain.order.dto.*;

import java.util.List;
import java.util.Optional;

/**
 * <pre>
 *     주문 관리 서비스 인터페이스
 * </pre>
 *
 * @author 박봉균
 * @since JDK17 Eclipse Temurin
 */
public interface OrderService {

    /** 결제 및 주문 진행, 주문 정보 DB 영속화 */
    Optional<OrderInDto> saveOrder(OrderDto orderDto, String userKey) throws Exception;

    /** 주문 상태 변경 */
    void changeOrderStatus(OrderStatusChangeDto orderStatusChangeRequestDto) throws Exception;

    /** 유저 주문 내역 조회 */
    List<ResponseOrderDto> userOrderList(Long userId) throws Exception;

    /** 주문 상세내역 조회 */
    ResponseOrderStoreDto userOrderDetailList(Long userId, Long orderId) throws Exception;

    /** 가게 주문 리스트 */
    List<ResponseOrderStoreDto> storeOrderList(Long userId, Long storeId) throws Exception;

}

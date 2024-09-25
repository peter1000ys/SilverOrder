package com.silverorder.domain.order.service;

import com.silverorder.domain.order.dto.*;

import java.util.List;

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
    void saveOrder(OrderDto orderDto, String userKey) throws Exception;

    /** 주문 상태 변경 */
    void changeOrderStatus(OrderStatusChangeDto orderStatusChangeRequestDto) throws Exception;

    /** 유저 주문 내역 조회 */
    List<ResponseOrderDto> userOrderList(Long userId) throws Exception;

    /** 주문 메뉴 조회 */
    List<ResponseOrderDetailDto> userOrderDetailList(Long userId, Long orderId) throws Exception;

}

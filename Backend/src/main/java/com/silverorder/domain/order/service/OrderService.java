package com.silverorder.domain.order.service;

import com.silverorder.domain.order.dto.OrderDto;
import com.silverorder.domain.order.dto.OrderStatusChangeDto;

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
}

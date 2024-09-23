package com.silverorder.domain.order.repository;
import com.silverorder.domain.order.dto.OrderDto;
import com.silverorder.domain.order.dto.OrderStatusChangeDto;
import jakarta.persistence.PersistenceException;

/**
 * <pre>
 *     주문 관리 레포지토리 인터페이스
 * </pre>
 *
 * @author 박봉균
 * @since JDK17 Eclipse Temurin
 */
public interface OrderRepository {
    /** 주문 정보 영속화 */
    void insertOrder(OrderDto orderDto) throws PersistenceException;

    /** 주문 상태 변경 */
    void updateOrderStatus(OrderStatusChangeDto orderStatusChangeDto) throws PersistenceException;

}

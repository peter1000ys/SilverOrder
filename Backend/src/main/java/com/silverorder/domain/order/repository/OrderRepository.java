package com.silverorder.domain.order.repository;
import com.silverorder.domain.order.dto.*;
import com.silverorder.domain.order.entity.Order;
import com.silverorder.domain.store.entity.Store;
import com.silverorder.domain.user.entity.User;
import jakarta.persistence.PersistenceException;

import java.util.List;

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
    Long insertOrder(OrderDto orderDto) throws PersistenceException;

    /** 주문 상태 변경 */
    void updateOrderStatus(OrderStatusChangeDto orderStatusChangeDto) throws PersistenceException;

    /** 유저 주문 내역 */
    List<ResponseOrderDto> userOrderList(User user) throws PersistenceException;

    /** 주문 메뉴 리스트 */
    List<ResponseOrderDetailDto> userOrderDetailList(Order userOrder) throws PersistenceException;

    /** 주문 메뉴의 옵션 리스트 */
    List<OrderOptionDto> orderMenuOption(Long orderMenuId) throws PersistenceException;

    /** 가게의 주문 리스트 */
    List<ResponseOrderStoreDto> storeOrderList(Store store) throws PersistenceException;

    /** 유저의 가장 최근 주문내역 조회 */
    Order userRecentOrder(User user, Store store) throws PersistenceException;

    /** 주문의 메뉴리스트 조회 */
    Long[] userRecentMenuIds(Order order) throws PersistenceException;
}

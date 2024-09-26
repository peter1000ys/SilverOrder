package com.silverorder.domain.order.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.silverorder.domain.menu.entity.Menu;
import com.silverorder.domain.option.entity.Option;
import com.silverorder.domain.order.dto.*;

import com.silverorder.domain.order.entity.Order;
import com.silverorder.domain.order.entity.OrderMenu;
import com.silverorder.domain.order.entity.OrderOption;
import com.silverorder.domain.order.entity.QOrder;
import com.silverorder.domain.payment.entity.Payment;
import com.silverorder.domain.store.entity.Store;
import com.silverorder.domain.user.entity.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.PersistenceException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

import static com.silverorder.domain.option.entity.QOption.option;
import static com.silverorder.domain.order.entity.QOrder.order;
import static com.silverorder.domain.order.entity.QOrderMenu.orderMenu;
import static com.silverorder.domain.order.entity.QOrderOption.orderOption;
import static com.silverorder.domain.payment.entity.QCard.card;
import static com.silverorder.domain.payment.entity.QPayment.payment;

@Repository
@RequiredArgsConstructor
public class OrderRepositoryImpl implements OrderRepository {
    @PersistenceContext
    private final EntityManager em;
    private final JPAQueryFactory queryFactory;

    /**
     * 주문 정보 영속화
     *
     * @param orderDto 주문정보DTO
     * @throws PersistenceException JPA 표준 예외
     */
    @Override
    public void insertOrder(OrderDto orderDto) throws PersistenceException {
        // Order 저장
        Store store = em.find(Store.class, orderDto.getStoreId());
        Payment payment = em.find(Payment.class, orderDto.getPaymentId());
        Order order = orderDto.toEntity(store, payment);
        em.persist(order);

        // Menu 저장
        if(orderDto.getMenuList() != null && !orderDto.getMenuList().isEmpty()) {
            for (OrderMenuDto menuRequestDto : orderDto.getMenuList()) {
                Menu menu = em.find(Menu.class, menuRequestDto.getMenuId());
                OrderMenu orderMenu = menuRequestDto.toEntity(menu, order);
                em.persist(orderMenu);


                // Option 저장
                if (menuRequestDto.getOptionList() != null && !menuRequestDto.getOptionList().isEmpty()) {
                    for (OrderOptionDto optionRequestDto : menuRequestDto.getOptionList()) {
                        Option option = em.find(Option.class, optionRequestDto.getOptionId());
                        OrderOption orderOption = optionRequestDto.toEntity(orderMenu, option);
                        em.persist(orderOption);
                    }
                }
            }
        }
    }

    /**
     * 주문 상태 변경
     *
     * @param orderStatusChangeDto 주문상태 변경 DTO
     * @throws PersistenceException JPA 표준 예외
     */
    @Override
    public void updateOrderStatus(OrderStatusChangeDto orderStatusChangeDto) throws PersistenceException {
        queryFactory
                .update(order)
                .set(order.orderStatus, orderStatusChangeDto.getOrderStatus())
                .where(order.id.eq(orderStatusChangeDto.getOrderId()))
                .execute();
    }

    /**
     * 유저 주문 내역
     *
     * @param user
     */
    @Override
    public List<ResponseOrderDto> userOrderList(User user) throws PersistenceException {
        try {
            return queryFactory
                    .select(Projections.constructor(ResponseOrderDto.class,
                            order.id,
                            order.store.id,
                            order.store.storeName,
                            payment.id,
                            card.cardName,
                            order.payPrice,
                            order.orderDate,
                            order.orderStatus
                    ))
                    .from(order)
                    .innerJoin(payment).on(order.payment.id.eq(payment.id))
                    .innerJoin(card).on(card.payment.id.eq(payment.id))
                    .where(order.payment.user.eq(user))
                    .orderBy(order.id.desc())
                    .fetch();
        }catch(Exception e){
            e.printStackTrace();
            throw new PersistenceException("주문내역 조회 중 에러 발생", e);
        }
    }

    /**
     * 주문 메뉴 리스트
     *
     * @param userOrder
     */
    @Override
    public List<ResponseOrderDetailDto> userOrderDetailList(Order userOrder) throws PersistenceException {
        try {
            return queryFactory
                    .select(Projections.constructor(ResponseOrderDetailDto.class,
                            orderMenu.id,
                            orderMenu.menu.id,
                            orderMenu.menu.menuName,
                            orderMenu.menuAmount,
                            orderMenu.menuPrice,
                            orderOption.id.count()
                    ))
                    .from(orderMenu)
                    .innerJoin(orderOption).on(orderMenu.id.eq(orderOption.orderMenu.id))
                    .where(orderMenu.order.eq(userOrder))
                    .groupBy(orderMenu.id, orderMenu.menu.id, orderMenu.menu.menuName,
                            orderMenu.menuAmount, orderMenu.menuPrice)
                    .fetch();
        }catch(Exception e){
            e.printStackTrace();
            throw new PersistenceException("주문 상세내역 조회 중 에러 발생", e);
        }
    }

    /**
     * 주문 메뉴의 옵션 리스트
     *
     * @param orderMenuId
     */
    @Override
    public List<OrderOptionDto> orderMenuOption(Long orderMenuId) throws PersistenceException {
        try {
            return queryFactory
                    .select(Projections.constructor(OrderOptionDto.class,
                            orderOption.option.id,
                            orderOption.option.optionName
                    ))
                    .from(orderOption)
                    .where(orderOption.orderMenu.id.eq(orderMenuId))
                    .fetch();
        }catch(Exception e){
            e.printStackTrace();
            throw new PersistenceException("주문메뉴 옵션 조회 중 에러 발생", e);
        }
    }

    /**
     * 가게의 주문 리스트
     *
     * @param store
     */
    @Override
    public List<ResponseOrderStoreDto> storeOrderList(Store store) throws PersistenceException {
        try {
            return queryFactory
                    .select(Projections.constructor(ResponseOrderStoreDto.class,
                            order.id,
                            order.payment.id,
                            order.tradeNum,
                            order.payPrice,
                            order.orderTime,
                            order.orderDate,
                            order.orderStatus
                    ))
                    .from(order)
                    .where(order.store.eq(store).and(
                            order.orderDate.between(LocalDate.now().minusDays(1), LocalDate.now())
                    ))
                    .orderBy(order.id.desc())
                    .fetch();
        }catch(Exception e){
            e.printStackTrace();
            throw new PersistenceException("가게 주문 조회 중 에러 발생", e);
        }
    }
}

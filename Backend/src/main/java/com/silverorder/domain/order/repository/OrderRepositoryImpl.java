package com.silverorder.domain.order.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.silverorder.domain.menu.entity.Menu;
import com.silverorder.domain.option.entity.Option;
import com.silverorder.domain.order.dto.MenuRequestDto;
import com.silverorder.domain.order.dto.OptionRequestDto;
import com.silverorder.domain.order.dto.OrderDto;

import com.silverorder.domain.order.entity.Order;
import com.silverorder.domain.order.entity.OrderMenu;
import com.silverorder.domain.order.entity.OrderOption;
import com.silverorder.domain.payment.entity.Payment;
import com.silverorder.domain.store.entity.Store;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.PersistenceException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static com.silverorder.domain.order.entity.QOrder.order;
import static com.silverorder.domain.order.entity.QOrderMenu.orderMenu;
import static com.silverorder.domain.order.entity.QOrderOption.orderOption;

@Repository
@RequiredArgsConstructor
public class OrderRepositoryImpl implements OrderRepository {
    @PersistenceContext
    private final EntityManager em;
    private final JPAQueryFactory queryFactory;

    @Override
    public void insertOrder(OrderDto orderDto) throws PersistenceException {
        // Order 저장
        Store store = em.find(Store.class, orderDto.getStoreId());
        Payment payment = em.find(Payment.class, orderDto.getPaymentId());
        Order order = orderDto.toEntity(store, payment);
        em.persist(order);

        // Menu 저장
        for (MenuRequestDto menuRequestDto : orderDto.getMenuList()) {
            Menu menu = em.find(Menu.class, menuRequestDto.getMenuId());
            OrderMenu orderMenu = menuRequestDto.toEntity(menu, order);
            em.persist(orderMenu);
            
            // Option 저장
            for (OptionRequestDto optionRequestDto : menuRequestDto.getOptionList()) {
                Option option = em.find(Option.class, optionRequestDto.getOptionId());
                OrderOption orderOption= optionRequestDto.toEntity(orderMenu, option);
                em.persist(orderOption);
            }
        }
    }

}

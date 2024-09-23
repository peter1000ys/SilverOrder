package com.silverorder.domain.order.entity;

import com.silverorder.domain.payment.entity.Payment;
import com.silverorder.domain.store.entity.Store;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * <pre>
 *     주문 도메인 클래스
 * </pre>
 *
 * @author 박봉균
 * @since JDK17 Eclipse Temurin
 */

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "T_ORDER")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ORDER_ID", nullable = false)
    private Long id;

    @Column(name = "TRADE_NUM", nullable = false)
    private Long tradeNum;

    @Column(name = "ORDER_DATE", nullable = false)
    @CreationTimestamp
    private LocalDate orderDate;

    @Column(name = "PAY_PRICE", nullable = false)
    private Long payPrice;

    @Column(name = "ORDER_STATUS", nullable = false)
    private int orderStatus;

    @Column(name = "REQUIRE", length = 200)
    private String require;

    @Column(name = "ORDER_TIME", nullable = false)
    @CreationTimestamp
    private LocalDateTime orderTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "STORE_ID", nullable = false)
    private Store store; //외래키

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PAYMENT_ID", nullable = false)
    private Payment payment; // 외래키

}

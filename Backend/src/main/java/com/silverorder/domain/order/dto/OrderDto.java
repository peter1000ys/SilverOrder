package com.silverorder.domain.order.dto;

import com.silverorder.domain.order.entity.Order;
import com.silverorder.domain.payment.entity.Payment;
import com.silverorder.domain.store.entity.Store;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderDto {

    private Long storeId;
    private Long totalPrice;
    private Long paymentId;
    private LocalDate orderDate;
    private String require;
    private int orderStatus;
    private List<OrderMenuDto> menuList;

    @Schema(hidden = true)
    private Long tradeNum;

    public Order toEntity(Store store, Payment payment) {
        return Order.builder()
                .orderStatus(this.orderStatus)
                .require(this.require)
                .payPrice(this.totalPrice)
                .tradeNum(this.tradeNum)
                .store(store)
                .payment(payment)
                .build();
    }

}

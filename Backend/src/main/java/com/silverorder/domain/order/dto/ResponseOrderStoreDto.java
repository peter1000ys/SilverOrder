package com.silverorder.domain.order.dto;

import com.silverorder.domain.order.entity.Order;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseOrderStoreDto {
    private Long orderId;
    private Long paymentId;
    private Long tradeNum;
    private Long totalPrice;
    private LocalDate orderDate;
    private LocalDateTime orderTime;
    private OrderStatus orderStatus;
    private List<ResponseOrderDetailDto> menuList;

    public ResponseOrderStoreDto(Long orderId, Long paymentId, Long tradeNum, Long totalPrice,
                                 LocalDateTime orderTime, LocalDate orderDate, OrderStatus orderStatus){
        this.orderId = orderId;
        this.paymentId = paymentId;
        this.tradeNum = tradeNum;
        this.totalPrice = totalPrice;
        this.orderTime = orderTime;
        this.orderDate = orderDate;
        this.orderStatus = orderStatus;
        this.menuList = null;
    }
}

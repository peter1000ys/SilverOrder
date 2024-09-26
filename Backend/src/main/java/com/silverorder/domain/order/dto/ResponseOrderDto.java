package com.silverorder.domain.order.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseOrderDto {
    private Long orderId;
    private Long storeId;
    private String storeName;
    private Long paymentId;
    private String cardName;
    private Long totalPrice;
    private LocalDate orderDate;
    private OrderStatus orderStatus;
}

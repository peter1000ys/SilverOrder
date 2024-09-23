package com.silverorder.domain.order.dto;

import com.silverorder.domain.order.entity.Order;
import com.silverorder.domain.order.entity.OrderMenu;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderPayRequestDto {
    private Long storeId;
    private Long totalPrice;
    private List<MenuRequestDto> menuList;
    private Long paymentId;
    private String require;
}

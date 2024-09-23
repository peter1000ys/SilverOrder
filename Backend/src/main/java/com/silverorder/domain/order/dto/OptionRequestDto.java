package com.silverorder.domain.order.dto;

import com.silverorder.domain.menu.entity.Menu;
import com.silverorder.domain.option.entity.Option;
import com.silverorder.domain.order.entity.Order;
import com.silverorder.domain.order.entity.OrderMenu;
import com.silverorder.domain.order.entity.OrderOption;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OptionRequestDto {
    private Long optionId;

    public OrderOption toEntity(OrderMenu orderMenu, Option option) {
        return OrderOption.builder()
                .option(option)
                .orderMenu(orderMenu)
                .build();
    }
}

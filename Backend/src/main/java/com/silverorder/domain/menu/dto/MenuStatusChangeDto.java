package com.silverorder.domain.menu.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class MenuStatusChangeDto {
    private Long menuId;
    private MenuStatus menuStatus;
}

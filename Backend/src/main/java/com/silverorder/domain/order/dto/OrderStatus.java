package com.silverorder.domain.order.dto;

public enum OrderStatus {
    ORDER_IN("주문 접수"),
    ORDER_CANCELED("주문 취소"),
    ORDER_ACCEPTED("주문 승인"),
    ORDER_DENIED("주문 거절"),
    ORDER_IN_PROGRESS("주문 진행 중"),
    ORDER_DONE("주문 완료");


    private final String description;

    OrderStatus(String description){
        this.description = description;
    }

    public String description(){
        return description;
    }

}

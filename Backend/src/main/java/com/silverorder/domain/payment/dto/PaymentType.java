package com.silverorder.domain.payment.dto;

public enum PaymentType {
    PAYMENT_CARD("카드"),
    PAYMENT_ACCOUNT("계좌");

    private final String description;

    PaymentType(String description){
        this.description = description;
    }

    public String description(){
        return description;
    }
}

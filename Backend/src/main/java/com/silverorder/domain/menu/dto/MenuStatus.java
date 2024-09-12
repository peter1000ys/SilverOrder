package com.silverorder.domain.menu.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

public enum MenuStatus {
    MENU_READY("준비됨"),
    MENU_SOLD_OUT("매진"),
    MENU_DISCONTINUED("판매 중지");

    private final String description;

    MenuStatus(String description){
        this.description = description;
    }

    public String description(){
        return description;
    }
}

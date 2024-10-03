package com.silverorder.domain.voice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestJupyter {
    private String text;
    /*private String storeId;

    public RequestJupyter(String voidText, Long storeId){
        this.text = voidText;
        this.storeId = storeId.toString();
    }*/
}

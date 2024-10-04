package com.silverorder.domain.voice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.silverorder.domain.menu.dto.ResponseMenuDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseJupyter {
    @JsonProperty("intent")
    private String responseString;
    @JsonProperty("recommended_menu_id")
    private String recommendMenuId;
    @JsonProperty("qa_result")
    private String qaResult;

    private Long menuId;
    private List<ResponseMenuDto> menuList;

    public ResponseJupyter(String responseString, String recommendMenuId, String qaResult){
        this.responseString = responseString;
        this.recommendMenuId = recommendMenuId;
        this.qaResult = qaResult;
        this.menuId = null;
        this.menuList = null;
    }
}

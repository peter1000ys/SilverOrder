package com.silverorder.domain.menu.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * <pre>
 *     메뉴 DTO 클래스
 * </pre>
 *
 * @author 박봉균
 * @since JDK17 Eclipse Temurin
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MenuDto {
    /** 가맹점 ID */
    private Long storeId;

    /** 메뉴 카테고리 */
    private Long menuCategoryId;

    /** 메뉴명 */
    private String menuName;

    /** 축약 메뉴명 */
    private String simpleName;

    /** 메뉴 설명 */
    private String menuDesc;

    /** 메뉴 상태 */
    private MenuStatus menuStatus;

    /** 가격 */
    private int menuPrice;

    /** 평점 */
    private int recommend;

    /** 메뉴 이미지 */
    private String menuThumb;

    /** 사용 옵션 카테고리 ID */
    private long[] useOptionCategory;

}

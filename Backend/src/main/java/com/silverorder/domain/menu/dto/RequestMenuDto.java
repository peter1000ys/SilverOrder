package com.silverorder.domain.menu.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

/**
 * <pre>
 *     메뉴 RequestDTO 클래스
 * </pre>
 *
 * @author 박봉균
 * @since JDK17 Eclipse Temurin
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestMenuDto {

    /** 가맹점 ID */
    @NotNull(message = "가맹점 번호는 필수입니다.")
    private Long storeId;

    /** 메뉴 카테고리 */
    @NotNull(message = "메뉴 카테고리는 필수입니다.")
    private Long menuCategoryId;

    /** 메뉴명 */
    @NotBlank(message = "메뉴명은 필수입니다.")
    private String menuName;

    /** 축약 메뉴명 */
    @NotBlank(message = "축약 메뉴명은 필수입니다.")
    private String simpleName;

    /** 메뉴 설명 */
    private String menuDesc;

    /** 메뉴 상태 */
    @NotNull(message = "메뉴 상태는 필수입니다.")
    private MenuStatus menuStatus;

    /** 가격 */
    @Max(value = Integer.MAX_VALUE, message = "최대 가격은 20억입니다.")
    @Min(value = 0, message = "최소 가격은 0입니다.")
    private int menuPrice;

    /** 평점 */
    @Max(value = 5, message = "최대 평점은 5입니다.")
    @Min(value = 1, message = "최소 평점은 1입니다.")
    private int recommend;

    /** 메뉴 이미지 */
    private MultipartFile menuThumb;

    /** 사용 옵션 카테고리 ID */
    private long[] useOptionCategory;

}

package com.silverorder.domain.option.controller;

import com.silverorder.domain.option.dto.OptionType;
import com.silverorder.domain.option.dto.RequestOptionCategoryDto;
import com.silverorder.domain.option.dto.ResponseOptionDto;
import com.silverorder.domain.option.service.OptionService;
import com.silverorder.domain.user.dto.CustomUserDetails;
import com.silverorder.domain.user.entity.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * <pre>
 *     옵션 관리 컨트롤러 클래스
 * </pre>
 * @author 노명환
 * @since JDK17
 */

@Tag(name = "Option", description = "옵션 관리")
@RestController
@RequestMapping("/option")
@CrossOrigin("*")
@RequiredArgsConstructor
public class OptionController {
    private final OptionService optionService;

    @Operation(summary = "옵션 카테고리 등록", description="가게에서 사용할 옵션 카테고리와 옵션들을 등록합니다.")
    @PostMapping("/category")
    public ResponseEntity<?> registOptionCategory (
            @RequestBody @Valid RequestOptionCategoryDto requestOptionCategoryDto,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) throws Exception {
        long userId = userDetails.getUser().getUserId();
        requestOptionCategoryDto.setOptionType(OptionType.OPTION_RADIO);
        optionService.saveOptionCategory(userId, requestOptionCategoryDto);
        return new ResponseEntity<>("옵션 카테고리 등록 완료", HttpStatus.OK);
    }

    @Operation(summary = "옵션 카테고리 수정", description="가게에서 사용할 옵션 카테고리와 옵션들을 수정합니다.")
    @PatchMapping("/category/{optionCategoryId}")
    public ResponseEntity<?> modifyOptionCategory (
            @RequestBody @Valid RequestOptionCategoryDto requestOptionCategoryDto,
            @PathVariable Long optionCategoryId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) throws Exception {
        long userId = userDetails.getUser().getUserId();
        optionService.modifyOptionCategory(userId, optionCategoryId, requestOptionCategoryDto);
        return new ResponseEntity<>("옵션 카테고리 수정 완료", HttpStatus.OK);
    }

    @Operation(summary = "옵션 카테고리 삭제", description="가게에서 사용하는 옵션 카테고리와 해당 카테고리의 옵션들을 삭제합니다.")
    @DeleteMapping("/category/{optionCategoryId}")
    public ResponseEntity<?> deleteOptionCategory (
            @PathVariable Long optionCategoryId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) throws Exception {
        long userId = userDetails.getUser().getUserId();
        optionService.deleteOptionCategory(userId, optionCategoryId);
        return new ResponseEntity<>("옵션 카테고리 삭제 완료", HttpStatus.OK);
    }

    @Operation(summary = "옵션 카테고리 리스트 조회", description="가게에서 사용하는 옵션 카테고리들을 조회합니다.")
    @GetMapping("/category/{storeId}")
    public ResponseEntity<?> listOptionCategory (
            @PathVariable Long storeId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) throws Exception {
        long userId = userDetails.getUser().getUserId();
        List<ResponseOptionDto> responseOptionDtoList = optionService.listOptionCategory(storeId);
        return ResponseEntity.ok(responseOptionDtoList);
    }

    @Operation(summary = "옵션 카테고리 상세 조회", description="옵션 카테고리에서 사용되는 옵션들을 조회합니다.")
    @GetMapping("/category/detail/{optionCategoryId}")
    public ResponseEntity<?> detailOptionCategory (
            @PathVariable Long optionCategoryId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) throws Exception {
        long userId = userDetails.getUser().getUserId();
        ResponseOptionDto responseOptionDto = optionService.detailOptionCategory(optionCategoryId);
        return ResponseEntity.ok(responseOptionDto);
    }
}

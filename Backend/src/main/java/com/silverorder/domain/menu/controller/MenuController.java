package com.silverorder.domain.menu.controller;

import com.silverorder.domain.file.service.FileService;
import com.silverorder.domain.menu.dto.*;
import com.silverorder.domain.menu.service.MenuService;
import com.silverorder.domain.option.dto.ResponseOptionDto;
import com.silverorder.domain.user.dto.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <pre>
 *     메뉴 관리 컨트롤러 클래스
 * </pre>
 * @author 노명환
 * @since JDK17
 */

@Tag(name = "Menu", description = "메뉴 관리")
@RestController
@RequestMapping("/menu")
@CrossOrigin("*")
@RequiredArgsConstructor
public class MenuController {
    private final MenuService menuService;
    private final FileService fileService;

    @Operation(summary = "메뉴 카테고리 등록", description="가게에서 사용할 메뉴의 카테고리를 등록합니다.")
    @PostMapping("/category")
    public ResponseEntity<?> registMenuCategory (
            @RequestBody @Valid RequestMenuCategoryDto requestMenuCategoryDto,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) throws Exception {
        long userId = userDetails.getUser().getUserId();
        menuService.saveMenuCategory(userId, requestMenuCategoryDto);
        return new ResponseEntity<>("메뉴 카테고리 등록 완료", HttpStatus.OK);
    }

    /*@Operation(summary = "메뉴 카테고리 수정", description="가게에서 사용할 메뉴의 카테고리를 등록합니다.")
    @PatchMapping("/category/{menuCategoryId}")
    public ResponseEntity<?> modifyMenuCategory (
            @RequestBody @Valid RequestMenuCategoryDto requestMenuCategoryDto,
            @PathVariable Long menuCategoryId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) throws Exception {
        long userId = userDetails.getUser().getUserId();
        //menuService.saveMenuCategory(userId, requestMenuCategoryDto);
        return new ResponseEntity<>("메뉴 카테고리 수정 완료", HttpStatus.OK);
    }*/

    @Operation(summary = "메뉴 등록", description="가게에서 판매할 메뉴를 등록합니다.")
    @PostMapping("/regist")
    public ResponseEntity<?> registMenu(
            @ModelAttribute @Valid RequestMenuDto requestMenuDto,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) throws Exception {
        MenuDto menuDto = new MenuDto(
                requestMenuDto.getStoreId(),
                requestMenuDto.getMenuCategoryId(),
                requestMenuDto.getMenuName(),
                requestMenuDto.getSimpleName(),
                requestMenuDto.getMenuDesc(),
                requestMenuDto.getMenuStatus(),
                requestMenuDto.getMenuPrice(),
                requestMenuDto.getRecommend(),
                null,
                requestMenuDto.getUseOptionCategory()
        );

        // 요청에 파일 있을 경우 클라우드에 업로드 후 링크 생성
        if (requestMenuDto.getMenuThumb() != null) {
            String fileLink = fileService.uploadFile(requestMenuDto.getMenuThumb());
            menuDto.setMenuThumb(fileLink);
        }

        // 메뉴 저장
        Long userId = userDetails.getUser().getUserId();
        menuService.saveMenu(userId, menuDto);
        return new ResponseEntity<>("메뉴 등록 완료", HttpStatus.OK);
    }

    @Operation(summary = "메뉴 리스트 조회", description="가게에서 판매하는 메뉴를 조회합니다.")
    @GetMapping("{storeId}/list")
    public ResponseEntity<?> listMenu(
            @PathVariable Long storeId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) throws Exception {
        long userId = userDetails.getUser().getUserId();
        List<ResponseMenuDto> responseMenuDtoList = menuService.listMenu(userId, storeId);
        return ResponseEntity.ok(responseMenuDtoList);
    }

    @Operation(summary = "메뉴 옵션 조회", description="메뉴 상세보기 시 선택할 수 있는 옵션들을 조회합니다.")
    @GetMapping("detail/{menuId}")
    public ResponseEntity<?> menuOptionList(
            @PathVariable Long menuId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) throws Exception {
        long userId = userDetails.getUser().getUserId();
        List<ResponseOptionDto> responseOptionDtoList = menuService.menuOptionList(menuId);
        return ResponseEntity.ok(responseOptionDtoList);
    }

    @Operation(summary = "메뉴 카테고리 조회", description="가게에서 사용하는 카테고리를 조회합니다.")
    @GetMapping("category/{storeId}")
    public ResponseEntity<?> menuCategoryList(
            @PathVariable Long storeId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) throws Exception {
        long userId = userDetails.getUser().getUserId();
        List<ResponseMenuCategory> responseMenuCategoryList = menuService.menuCategoryList(storeId);
        return ResponseEntity.ok(responseMenuCategoryList);
    }

    @Operation(summary = "메뉴 상태 조회", description="메뉴의 상태리스트를 불러옵니다.")
    @GetMapping("/status")
    public ResponseEntity<?> listMenuStatus(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) throws Exception {
        long userId = userDetails.getUser().getUserId();
        List<Map<String, String>> statuses = Arrays.stream(MenuStatus.values())
                .map(status -> {
                    Map<String, String> statusMap = new HashMap<>();
                    statusMap.put("status", status.name());
                    statusMap.put("description", status.description());
                    return statusMap;
                }).toList();
        return ResponseEntity.ok(statuses);
    }
}

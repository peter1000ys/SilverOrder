package com.silverorder.domain.user.controller;

import com.silverorder.domain.user.dto.CustomUserDetails;
import com.silverorder.domain.user.dto.UserDto;
import com.silverorder.domain.user.dto.UserRole;
import com.silverorder.domain.user.service.UserService;
import com.silverorder.global.config.security.JwtUtil;
import com.silverorder.global.exception.CustomException;
import com.silverorder.global.exception.ErrorCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

/**
 * <pre>
 *     회원 관리 컨트롤러 클래스
 * </pre>
 *
 * @author 박봉균
 * @since JDK17
 */
@Tag(name = "User", description = "회원 관리")
@RestController
@RequestMapping("/user")
@CrossOrigin("*")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @Operation(summary = "회원 정보 조회", description = "현재 로그인한 회원 조회")
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/me")
    public ResponseEntity<?> getUser(
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) throws Exception {
        UserDto userDto = userService.getUserInfo(customUserDetails.getUser().getUserId());
        userDto.setUserPassword(null);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @Operation(summary = "회원 탈퇴", description = "회원 고유번호로 회원 삭제")
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/me")
    public ResponseEntity<?> deleteUser(@RequestParam("id") Long id) throws Exception {
        userService.deleteUser(id);
        return new ResponseEntity<>("회원 탈퇴 성공", HttpStatus.OK);
    }

    @Operation(
            summary = "금융 연동",
            description = "은행 이메일로 은행과 연동합니다. <br> { \"userApiEmail\" : \"String\" } 전달")
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/me/connect")
    public ResponseEntity<?> connectBank(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestBody Map<String, String> requestBody
    ) throws Exception {
        userService.connectBank(customUserDetails.getUser().getUserId(), requestBody.get("userApiEmail"));

        return new ResponseEntity<>("은행 연동 성공", HttpStatus.OK);
    }

    @Operation(
            summary = "가맹점 고유번호",
            description = "userId로 storeId를 조회합니다. 관리자인 경우만 가능합니다.")
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/me/store")
    public ResponseEntity<?> getStoreId(
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) throws Exception {
        if(customUserDetails.getUser().getUserRole() != UserRole.ROLE_ADMIN) {
            throw new CustomException(ErrorCode.UNAUTHORIZED_ADMIN);
        }

        Long storeId = userService.getStoreIdByUserId(customUserDetails.getUser().getUserId());

        Map<String, Long> responseBody = new HashMap<>();
        responseBody.put("storeId", storeId);
        return ResponseEntity.ok(responseBody);
    }

}

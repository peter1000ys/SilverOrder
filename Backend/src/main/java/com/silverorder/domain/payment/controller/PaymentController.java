package com.silverorder.domain.payment.controller;

import com.silverorder.domain.payment.dto.CardRequestDto;
import com.silverorder.domain.payment.service.PaymentService;
import com.silverorder.domain.user.dto.CustomUserDetails;
import com.silverorder.global.dto.CardDto;
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
import com.silverorder.domain.payment.dto.CardRequestDto;

import java.util.List;

@Tag(name = "Payment", description = "결제 관리")
@RestController
@RequestMapping("/payment")
@CrossOrigin("*")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @Operation(summary = "헤더 테스트", description = "금융api 사용을 위한 Header 확인")
    @GetMapping("/test")
    public ResponseEntity<?> registMenu(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) throws Exception {
        long userId = userDetails.getUser().getUserId();
        return ResponseEntity.ok(paymentService.testingHeader(userId));
    }

    @Operation(summary = "카드 결제", description = "카드 번호, cvc, 가맹점번호, 가격을 입력 받아 결제를 진행합니다.")
    @PostMapping("/pay/card")
    public ResponseEntity<?> payCard(
            @RequestBody @Valid CardRequestDto cardRequestDto,
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) throws Exception {
        // 금융망 userKey 설정
        String userApiKey = customUserDetails.getUser().getUserApiKey();
        cardRequestDto.setUserApiKey(userApiKey);

        // 결제 요청
        if(paymentService.payCard(cardRequestDto) != null) {
            return new ResponseEntity<>("정상 결제되었습니다.", HttpStatus.OK);
        } else {
            throw new CustomException(ErrorCode.CARD_PAY_FAILED);
        }
    }

    @Operation(summary = "금융권 카드 조회", description="ssafy금융에서 보유한 카드들을 조회합니다.")
    @GetMapping("/cardList")
    public ResponseEntity<?> ssafyCards(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) throws Exception {
        long userId = userDetails.getUser().getUserId();
        return ResponseEntity.ok(paymentService.myCards(userId));
    }

    @Operation(summary = "간편결제 카드 등록", description="조회한 카드정보를 토대로 간편결제를 등록합니다.")
    @PostMapping("/cardRegist")
    public ResponseEntity<?> registCard(
            @RequestBody @Valid List<CardDto> cardDtoList,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) throws Exception {
        long userId = userDetails.getUser().getUserId();
        paymentService.registCard(userId, cardDtoList);
        return new ResponseEntity<>("간편결제 카드 등록 완료", HttpStatus.OK);
    }

    @Operation(summary = "간편결제 카드 조회", description="간편결제로 등록한 카드들을 조회합니다.")
    @GetMapping("/myCardList")
    public ResponseEntity<?> paymentCard(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) throws Exception {
        long userId = userDetails.getUser().getUserId();
        return ResponseEntity.ok(paymentService.payCardList(userId));
    }
}


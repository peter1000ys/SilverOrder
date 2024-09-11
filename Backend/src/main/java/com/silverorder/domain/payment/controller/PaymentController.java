package com.silverorder.domain.payment.controller;

import com.silverorder.domain.payment.service.PaymentService;
import com.silverorder.domain.user.dto.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Payment", description = "결제 관리")
@RestController
@RequestMapping("/payment")
@CrossOrigin("*")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @Operation(summary = "헤더 테스트", description="금융api 사용을 위한 Header 확인")
    @PostMapping("/test")
    public ResponseEntity<?> registMenu(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) throws Exception {
        long userId = userDetails.getUser().getUserId();
        return ResponseEntity.ok(paymentService.testingHeader(userId));
    }
}

package com.silverorder.domain.payment.service;

import com.silverorder.domain.user.entity.User;
import com.silverorder.domain.user.repository.UserJpaRepository;
import com.silverorder.global.dto.HeaderApiDto;
import com.silverorder.global.dto.HeaderDto;
import com.silverorder.global.exception.CustomException;
import com.silverorder.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Random;

/**
 * <pre>
 *      결제 관리 서비스 구현
 * </pre>
 * @author 노명환
 * @since JDK17
 */
@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService{
    private final UserJpaRepository userJpaRepository;

    @Value("${ssafy.api.key}")
    private String apiKey;


    @Override
    @Transactional
    public HeaderDto testingHeader(long userId) throws Exception {
        //유저 확인 로직
        User user = userJpaRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        Random random = new Random();
        String ranNum = String.format("%06d", random.nextInt(1000000));
        HeaderDto headerDto = new HeaderDto();
        headerDto.setHeader(new HeaderApiDto("testing", apiKey, user.getUserApiKey(), ranNum));

        //return new HeaderApiDto("testing", apiKey, user.getUserApiKey(), ranNum);
        return headerDto;
    }
}

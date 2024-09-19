package com.silverorder.domain.payment.service;

import com.silverorder.domain.payment.dto.CardRequestDto;
import com.silverorder.domain.payment.dto.ResponsePayCardDto;
import com.silverorder.domain.user.entity.User;
import com.silverorder.global.dto.CardDto;
import com.silverorder.global.dto.HeaderApiDto;
import com.silverorder.global.dto.HeaderDto;
import com.silverorder.domain.payment.dto.RequestCardListDto;
import com.silverorder.global.dto.ResponseCardListDto;

import java.util.List;

/**
 * <pre>
 *      결제 관리 서비스 인터페이스
 * </pre>
 * @author 노명환
 * @since JDK17
 */
public interface PaymentService {
    HeaderDto testingHeader(long userId) throws Exception;
    String payCard(CardRequestDto cardRequestDto) throws Exception;

    ResponseCardListDto myCards(long userId) throws Exception;

    ResponseCardListDto ssafyCards(User user) throws Exception;

    List<ResponsePayCardDto> payCardList(long userId) throws Exception;

    void registCard(long userId, List<CardDto> cardDtoList) throws Exception;
}

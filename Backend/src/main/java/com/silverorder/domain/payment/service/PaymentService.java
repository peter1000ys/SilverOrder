package com.silverorder.domain.payment.service;

import com.silverorder.domain.user.entity.User;
import com.silverorder.global.dto.HeaderDto;
import com.silverorder.global.dto.RequestCardListDto;
import com.silverorder.global.dto.ResponseCardListDto;

/**
 * <pre>
 *      결제 관리 서비스 인터페이스
 * </pre>
 * @author 노명환
 * @since JDK17
 */
public interface PaymentService {
    HeaderDto testingHeader(long userId) throws Exception;

    ResponseCardListDto myCards(long userId) throws Exception;

    ResponseCardListDto ssafyCards(User user) throws Exception;

    void registCard(long userId, RequestCardListDto requestCardListDto) throws Exception;
}

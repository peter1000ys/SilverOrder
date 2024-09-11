package com.silverorder.domain.payment.service;

import com.silverorder.global.dto.HeaderApiDto;
import com.silverorder.global.dto.HeaderDto;

/**
 * <pre>
 *      결제 관리 서비스 인터페이스
 * </pre>
 * @author 노명환
 * @since JDK17
 */
public interface PaymentService {
    HeaderDto testingHeader(long userId) throws Exception;
}

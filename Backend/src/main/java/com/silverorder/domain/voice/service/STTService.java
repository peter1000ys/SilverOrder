package com.silverorder.domain.voice.service;

import com.silverorder.domain.voice.dto.ResponseJupyter;

/**
 * <pre>
 *  클로바 STT 서비스 인터페이스
 * </pre>
 *
 * @author 박봉균
 * @since JDK17 Eclipse Temurin
 */
public interface STTService {
    String clovaSpeechToText(String filePathName) throws Exception;
    ResponseJupyter menuRecommand(Long storeId, String filePathName, Long userId) throws Exception;
}

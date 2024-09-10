package com.silverorder.domain.voice.service;

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
}

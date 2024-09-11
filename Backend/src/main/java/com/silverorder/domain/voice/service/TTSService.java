package com.silverorder.domain.voice.service;

/**
 * <pre>
 *  구글 TTS 서비스 인터페이스
 * </pre>
 *
 * @author 박봉균
 * @since JDK17 Eclipse Temurin
 */
public interface TTSService {
    byte[] generateSpeech(String text) throws Exception;
}

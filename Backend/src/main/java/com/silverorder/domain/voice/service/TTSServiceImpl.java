package com.silverorder.domain.voice.service;

import com.google.cloud.texttospeech.v1.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * <pre>
 *  구글 TTS 서비스 구현 클래스
 *  </pre>
 *
 * @author 박봉균
 * @since JDK17 Eclipse Temurin
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class TTSServiceImpl implements TTSService {

    private final TextToSpeechClient textToSpeechClient;

    public byte[] generateSpeech(String text) throws Exception {
        SynthesisInput input = SynthesisInput.newBuilder()
                .setText(text)
                .build();

        VoiceSelectionParams voice = VoiceSelectionParams.newBuilder()
                .setLanguageCode("ko-KR")
                .setSsmlGender(SsmlVoiceGender.NEUTRAL)
                .build();

        AudioConfig audioConfig = AudioConfig.newBuilder()
                .setAudioEncoding(AudioEncoding.MP3)
                .build();

        SynthesizeSpeechResponse response = textToSpeechClient.synthesizeSpeech(input, voice, audioConfig);
        return response.getAudioContent().toByteArray();
    }

}

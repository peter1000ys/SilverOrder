package com.silverorder.domain.voice.service;

import com.google.cloud.texttospeech.v1.*;
import com.google.protobuf.ByteString;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;

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

    public String synthesizeSpeech(String text) throws Exception {
        String filePath = "/home/ubuntu/backOutput/output.mp3"; // 생성할 파일 경로

        // 디렉토리 존재 여부 확인 및 생성
        File outputDir = new File("/home/ubuntu/backOutput"); // 디렉토리 경로
        if (!outputDir.exists()) {
            outputDir.mkdirs(); // 디렉토리 생성
        }

        // 요청 설정
        SynthesisInput input = SynthesisInput.newBuilder().setText(text).build();
        VoiceSelectionParams voice = VoiceSelectionParams.newBuilder()
                .setLanguageCode("ko-KR")  // 한국어
                .setSsmlGender(SsmlVoiceGender.NEUTRAL)
                .build();
        AudioConfig audioConfig = AudioConfig.newBuilder()
                .setAudioEncoding(AudioEncoding.MP3) // 출력 형식
                .build();

        // TTS 요청
        SynthesizeSpeechResponse response = textToSpeechClient.synthesizeSpeech(input, voice, audioConfig);
        ByteString audioContents = response.getAudioContent();

        // 파일로 저장
        try (OutputStream out = new FileOutputStream(filePath)) {
            out.write(audioContents.toByteArray());
        }

        return filePath; // 생성된 파일 경로 반환
    }

}

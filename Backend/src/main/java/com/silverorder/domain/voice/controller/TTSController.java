package com.silverorder.domain.voice.controller;

import com.silverorder.domain.voice.service.TTSService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * <pre>
 *     TTS 컨트롤러 클래스
 * </pre>
 *
 * @author 박봉균
 * @since JDK17 Eclipse Temurin
 */

@Tag(name = "TTS", description = "CLOVA Text To Speech")
@RestController
@RequestMapping("/voice/tts")
@RequiredArgsConstructor
@CrossOrigin("*")
public class TTSController {

    private final TTSService ttsService;

    @Operation(summary = "음성 변환", description = "입력한 텍스트를 받아 음성으로 변환합니다.")
    @PostMapping("/generate")
    public ResponseEntity<byte[]> generateSpeech(@RequestBody String text) throws Exception {
        byte[] audioData = ttsService.generateSpeech(text);

        System.out.println(audioData);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"speech.mp3\"")
                .body(audioData);
    }

}

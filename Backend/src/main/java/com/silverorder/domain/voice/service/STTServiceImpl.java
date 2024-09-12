package com.silverorder.domain.voice.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;


/**
 * <pre>
 *     클로바 STT 서비스 구현 클래스
 * </pre>
 *
 * @author 박봉균
 * @since JDK17 Eclipse Temurin
 */
@Service
@Slf4j
public class STTServiceImpl implements STTService {

    @Value("${clova.client.id}")
    private String clientId;
    @Value("${clova.client.secret}")
    private String clientSecret;

    /**
     * 음성 파일을 받아서 텍스트로 변환
     *
     * @param filePathName
     * @return
     * @throws Exception
     */
    @Override
    public String clovaSpeechToText(String filePathName) throws Exception {
        String resultText = "";

        String imgFile = filePathName;
        File voiceFile = new File(imgFile);
        String language = "Kor";
        String apiURL = "https://naveropenapi.apigw.ntruss.com/recog/v1/stt?lang=" + language;
        URL url = new URL(apiURL);

        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setUseCaches(false);
        conn.setDoOutput(true);
        conn.setDoInput(true);
        conn.setRequestProperty("Content-Type", "application/octet-stream");
        conn.setRequestProperty("X-NCP-APIGW-API-KEY-ID", clientId);
        conn.setRequestProperty("X-NCP-APIGW-API-KEY", clientSecret);

        OutputStream outputStream = conn.getOutputStream();
        FileInputStream inputStream = new FileInputStream(voiceFile);
        byte[] buffer = new byte[4096];
        int bytesRead = -1;
        while ((bytesRead = inputStream.read(buffer)) != -1) {
            outputStream.write(buffer, 0, bytesRead);
        }
        outputStream.flush();
        inputStream.close();

        BufferedReader br;
        int responseCode = conn.getResponseCode();
        if (responseCode == 200) {
            br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            br = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }

        String inputLine;
        StringBuffer response = new StringBuffer();
        while ((inputLine = br.readLine()) != null) {
            response.append(inputLine);
        }
        br.close();

        resultText = response.toString();

        return resultText;
    }

}
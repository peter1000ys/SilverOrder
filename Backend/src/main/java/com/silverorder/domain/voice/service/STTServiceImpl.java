package com.silverorder.domain.voice.service;

import com.silverorder.domain.menu.dto.ResponseMenuDto;
import com.silverorder.domain.menu.service.MenuService;
import com.silverorder.domain.order.service.OrderService;
import com.silverorder.domain.store.entity.Store;
import com.silverorder.domain.store.repository.StoreJpaRepository;
import com.silverorder.domain.user.entity.User;
import com.silverorder.domain.user.repository.UserJpaRepository;
import com.silverorder.domain.voice.dto.RequestJupyter;
import com.silverorder.domain.voice.dto.ResponseJupyter;
import com.silverorder.global.exception.CustomException;
import com.silverorder.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;


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
@RequiredArgsConstructor
public class STTServiceImpl implements STTService {
    private final RestTemplate restTemplate;
    private final UserJpaRepository userJpaRepository;
    private final StoreJpaRepository storeJpaRepository;
    private final OrderService orderService;
    private final MenuService menuService;

    @Value("${clova.client.id}")
    private String clientId;
    @Value("${clova.client.secret}")
    private String clientSecret;

    @Value("${jupiter.api.url}")
    private String jupiterApiUrl;

    private String apiUrl;

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

    @Override
    public ResponseJupyter menuRecommand(Long storeId, String filePathName, Long userId) throws Exception {
        //유저 확인 로직
        User user = userJpaRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        //가맹점 확인 로직
        Store store = storeJpaRepository.findById(storeId)
                .orElseThrow(() -> new CustomException(ErrorCode.STORE_NOT_FOUND));

        //음성을 텍스트로 변환
        String voiceText = clovaSpeechToText(filePathName);

        //post 요청할 dto 생성
        //RequestJupyter requestJupyter = new RequestJupyter(voiceText, storeId);
        RequestJupyter requestJupyter = new RequestJupyter(voiceText);

        apiUrl = "/process_order";
        String url = jupiterApiUrl + apiUrl;

        //post 요청
        ResponseJupyter responseJupyter =
                restTemplate.postForObject(url, requestJupyter, ResponseJupyter.class);

        //조회할 메뉴의 ids
        Long[] menuIds = null;

        if(responseJupyter != null) {
            if (responseJupyter.getResponseString() != null &&
                    responseJupyter.getResponseString().equals("user_experience_based")) {

                menuIds = orderService.userRecentOrder(user, store);
            } else {
                menuIds = new Long[1];
                menuIds[0] = Long.parseLong(responseJupyter.getRecommendMenuId());
            }

            if(menuIds.length == 0){
                responseJupyter.setQaResult("최근 주문한 내역이 없습니다.");
            }else{
                responseJupyter.setMenuList(menuService.listMenuIds(menuIds));
            }
        }else{
            new ResponseJupyter(null, null, "서버 연결 실패");
        }
        return responseJupyter;
    }

}
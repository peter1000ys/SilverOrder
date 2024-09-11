package com.silverorder.domain.manage.service;

import com.silverorder.domain.manage.dto.ManageRequestDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

/**
 * 은행 API 서비스 구현체
 * @author 채기훈
 * @since JDK17 Eclipse Temurin
 */
@Service
public class ManageServiceImpl implements ManageService {

    @Value("${external.api.url}")
    private String externalApiUrl;

    public String apiUrl = "app/";

    public ManageServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    private final RestTemplate restTemplate;

    @Override
    public String getApiKey(ManageRequestDto requestDto) {
        String url = externalApiUrl + apiUrl + "issuedApiKey";
        return restTemplate.postForObject(url, requestDto, String.class);
    }

    @Override
    public String getApiKeyReissue(ManageRequestDto requestDto) {
        String url = externalApiUrl + apiUrl + "reIssuedApiKey";
        return restTemplate.postForObject(url, requestDto, String.class);
    }

}

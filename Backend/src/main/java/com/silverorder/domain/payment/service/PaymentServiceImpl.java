package com.silverorder.domain.payment.service;

import com.silverorder.domain.user.entity.User;
import com.silverorder.domain.user.repository.UserJpaRepository;
import com.silverorder.global.dto.*;
import com.silverorder.global.exception.CustomException;
import com.silverorder.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

/**
 * <pre>
 *      결제 관리 서비스 구현
 * </pre>
 * @author 노명환
 * @since JDK17
 */
@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService{
    private final UserJpaRepository userJpaRepository;
    private final RestTemplate restTemplate;

    @Value("${ssafy.api.key}")
    private String apiKey;

    @Value("${external.api.url}")
    private String externalApiUrl;

    public String apiUrl;


    @Override
    public HeaderDto testingHeader(long userId) throws Exception {
        //유저 확인 로직
        User user = userJpaRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        //필수 헤더dto
        HeaderDto headerDto = new HeaderDto();
        headerDto.setHeader(new HeaderApiDto("testing", apiKey, user.getUserApiKey()));

        return headerDto;
    }

    @Override
    public ResponseCardListDto myCards(long userId) throws Exception {
        //유저 확인 로직
        User user = userJpaRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        apiUrl = "creditCard/";

        //내 카드조회 url 설정
        String apiName = "inquireSignUpCreditCardList";
        String url = externalApiUrl + apiUrl + apiName;

        //필수 헤더dto
        HeaderDto headerDto = new HeaderDto();
        headerDto.setHeader(new HeaderApiDto(apiName, apiKey, user.getUserApiKey()));

        try {
            //내 카드목록 조회 api
            ResponseCardListDto myCardListDto =
                    restTemplate.postForObject(url, headerDto, ResponseCardListDto.class);

            if(myCardListDto.getCardDtoList() == null
            || myCardListDto.getCardDtoList().isEmpty())
                return myCardListDto;

            //ssafy금융의 카드상품 조회
            ResponseCardListDto ssafyCardListDto = ssafyCards(user);

            if(ssafyCardListDto.getCardDtoList() != null
                && !ssafyCardListDto.getCardDtoList().isEmpty()){

                for (CardDto myCard : myCardListDto.getCardDtoList()) {
                    for (CardDto card : ssafyCardListDto.getCardDtoList()) {
                        //내 카드의 상품번호와 금융의 카드상품번호를 비교하여 일치할 경우
                        if (myCard.getCardUniqueNo().equals(card.getCardUniqueNo())) {
                            //카드 혜택을 setter를 통해 복사
                            myCard.setResponseCardBenefits(card.getResponseCardBenefits());
                            break; // 동일한 cardUniqueNo를 찾았으니 내부 루프를 중단
                        }
                    }
                }
            }

            return myCardListDto;
        }catch(HttpClientErrorException e){
            if (e.getStatusCode().value() == 400) {
                return null;
            } else {
                throw e;  // 다른 상태 코드는 다시 던짐
            }
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public ResponseCardListDto ssafyCards(User user) throws Exception {
        apiUrl = "creditCard/";

        //ssafy금융 카드상품 조회 url
        String apiName = "inquireCreditCardList";
        String url = externalApiUrl + apiUrl + apiName;

        HeaderDto headerDto = new HeaderDto();
        headerDto.setHeader(new HeaderApiDto(apiName, apiKey, user.getUserApiKey()));

        try {
            //ssafy금융 카드상품 조회api 호출
            ResponseCardListDto ssafyCardListDto =
                    restTemplate.postForObject(url, headerDto, ResponseCardListDto.class);

            return ssafyCardListDto;
        }catch(HttpClientErrorException e){
            if (e.getStatusCode().value() == 400) {
                return null;
            } else {
                throw e;  // 다른 상태 코드는 다시 던짐
            }
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    @Transactional
    public void registCard(long userId, RequestCardListDto requestCardListDto) throws Exception {
        //유저 확인 로직
        User user = userJpaRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));


    }
}
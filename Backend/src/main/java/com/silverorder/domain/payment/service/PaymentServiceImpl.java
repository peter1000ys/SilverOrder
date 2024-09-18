package com.silverorder.domain.payment.service;

import com.silverorder.domain.payment.dto.*;
import com.silverorder.domain.payment.dto.RequestCardListDto;
import com.silverorder.domain.payment.dto.CardRequestDto;
import com.silverorder.domain.payment.dto.TransactionRequestDto;
import com.silverorder.domain.payment.entity.Payment;
import com.silverorder.domain.payment.repository.PaymentRepository;
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

import java.util.List;
import java.util.Map;
import java.util.Random;

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
public class PaymentServiceImpl implements PaymentService {
    private final UserJpaRepository userJpaRepository;
    private final RestTemplate restTemplate;
    private final PaymentRepository paymentRepository;

    @Value("${ssafy.api.key}")
    private String apiKey;

    @Value("${external.api.url}")
    private String externalApiUrl;

    public String apiUrl;


    /**
     * 헤더 테스트
     * <pre>
     *     ssafy 금융 api 사용을 위한 공통 header 생성 테스트
     * </pre>
     * @param userId : 유저 id
     * @throws Exception
     */
    @Override
    @Transactional
    public HeaderDto testingHeader(long userId) throws Exception {
        //유저 확인 로직
        User user = userJpaRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        //필수 헤더dto
        HeaderDto headerDto = new HeaderDto();
        headerDto.setHeader(new HeaderApiDto("testing", apiKey, user.getUserApiKey()));

        return headerDto;
    }

    /**
     * ssafy 금융 내 카드 조회
     * <pre>
     *     ssafy 금융에서 생성한 내 카드를 조회한다.
     *     카드상품까지 조회하여 혜택내역 또한 갱신한다.
     * </pre>
     * @param userId : 유저 id
     * @throws Exception
     */
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

    /**
     * ssafy 금융 카드 상품 조회
     * <pre>
     *     ssafy 금융의 카드 상품들을 조회한다.
     * </pre>
     * @param user : 유저 entity
     * @throws Exception
     */
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

    /**
     * 간편결제 카드 조회
     * <pre>
     *     간편결제로 등록된 내 카드를 조회한다.
     * </pre>
     * @param userId : 유저 id
     * @throws Exception
     */
    @Override
    public List<ResponsePayCardDto> payCardList(long userId) throws Exception {
        //유저 확인 로직
        User user = userJpaRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        return paymentRepository.myPayCardList(user);
    }

    /**
     * 간편결제 카드 등록
     * <pre>
     *     조회된 카드를 선택하여
     *     간편결제에 사용할 카드를 등록한다
     * </pre>
     * @param userId : 유저 id
     * @param cardDtoList : 카드정보 dto 리스트
     * @throws Exception
     */
    @Override
    @Transactional
    public void registCard(long userId, List<CardDto> cardDtoList) throws Exception {
        //유저 확인 로직
        User user = userJpaRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        if(cardDtoList != null && !cardDtoList.isEmpty()){
            for(CardDto cardDto : cardDtoList){
                Payment payment = paymentRepository.registPayment(user, PaymentType.PAYMENT_CARD);
                paymentRepository.registCard(user, cardDto, payment);
            }
        }
    }


    @Override
    public String payCard(CardRequestDto cardRequestDto) throws Exception {
        // 요청 Header
//        CardPayHeaderApiDto cardPayHeaderApiDto = new CardPayHeaderApiDto("createCreditCardTransaction", apiKey);

        HeaderApiDto headerApiDto = new HeaderApiDto("createCreditCardTransaction", apiKey, "22f1a7e1-4461-453a-8b22-4e377f35761f");

        // 요청 JSON
        TransactionRequestDto transactionRequestDto = new TransactionRequestDto(
//              cardPayHeaderApiDto,
                headerApiDto,
                cardRequestDto.getCardNo(),
                cardRequestDto.getCvc(),
                cardRequestDto.getMerchantId(),
                cardRequestDto.getPaymentBalance()
        );

        // 외부 API 호출
        String url = "https://finopenapi.ssafy.io/ssafy/api/v1/edu/creditCard/createCreditCardTransaction";
        Map<String, Map<String, Object>> response
                = restTemplate.postForObject(url, transactionRequestDto, Map.class);

        // responseMessage 추출
        if (response != null && response.get("Header") != null) {
            return (String) response.get("Header").get("responseMessage");
        }
        return null; // 응답이 없을 경우 처리
    }

}

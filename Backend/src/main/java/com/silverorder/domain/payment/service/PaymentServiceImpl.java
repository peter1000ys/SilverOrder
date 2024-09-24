package com.silverorder.domain.payment.service;

import com.silverorder.domain.payment.dto.*;
import com.silverorder.domain.payment.dto.CardRequestDto;
import com.silverorder.domain.payment.dto.TransactionRequestDto;
import com.silverorder.domain.payment.entity.Card;
import com.silverorder.domain.payment.entity.Payment;
import com.silverorder.domain.payment.repository.PaymentJpaRepository;
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

/**
 * <pre>
 *      결제 관리 서비스 구현
 * </pre>
 *
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
    private final PaymentJpaRepository paymentJpaRepository;

    @Value("${ssafy.api.key}")
    private String apiKey;

    @Value("${external.api.url}")
    private String externalApiUrl;

    private String apiUrl;
    private String apiName;


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
     *     간편결제로 등록된 카드의 경우 리스트에 조회되지 않는다.
     * </pre>
     * @param userId : 유저 id
     * @throws Exception
     */
    @Override
    public ResponseCardListDto myCards(long userId) throws Exception {
        //유저 확인 로직
        User user = userJpaRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        //내 카드조회 url 설정
        apiUrl = "creditCard/";
        apiName = "inquireSignUpCreditCardList";
        String url = externalApiUrl + apiUrl + apiName;

        //필수 헤더dto
        HeaderDto headerDto = new HeaderDto();
        headerDto.setHeader(new HeaderApiDto(apiName, apiKey, user.getUserApiKey()));

        try {
            //내 카드목록 조회 api
            ResponseCardListDto myCardListDto =
                    restTemplate.postForObject(url, headerDto, ResponseCardListDto.class);

            if (myCardListDto.getCardDtoList() == null
                    || myCardListDto.getCardDtoList().isEmpty())
                return myCardListDto;

            //간편결제로 등록된 카드 조회
            List<ResponsePayCardDto> myPaymentCardDtoList = payCardList(userId);

            if(myPaymentCardDtoList != null
            && !myPaymentCardDtoList.isEmpty()){
                //간편결제 카드번호와 금융카드번호 일치 시 리스트 노출하지 않음
                for(ResponsePayCardDto payCard : myPaymentCardDtoList){
                    myCardListDto.getCardDtoList().removeIf(
                            myCard -> payCard.getCardNum().equals(myCard.getCardNo())
                    );
                }
            }

            //내 금융카드 리스트가 비어있을 경우 상품조회 건너뜀
            if(myCardListDto.getCardDtoList().isEmpty()) return myCardListDto;

            //ssafy금융의 카드상품 조회
            ResponseCardListDto ssafyCardListDto = ssafyCards(user);

            if (ssafyCardListDto.getCardDtoList() != null
                    && !ssafyCardListDto.getCardDtoList().isEmpty()) {

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
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode().value() == 400) {
                return null;
            } else {
                throw e;  // 다른 상태 코드는 다시 던짐
            }
        } catch (Exception e) {
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
        //ssafy금융 카드상품 조회 url
        apiUrl = "creditCard/";
        apiName = "inquireCreditCardList";
        String url = externalApiUrl + apiUrl + apiName;

        HeaderDto headerDto = new HeaderDto();
        headerDto.setHeader(new HeaderApiDto(apiName, apiKey, user.getUserApiKey()));

        try {
            //ssafy금융 카드상품 조회api 호출
            ResponseCardListDto ssafyCardListDto =
                    restTemplate.postForObject(url, headerDto, ResponseCardListDto.class);

            return ssafyCardListDto;
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode().value() == 400) {
                return null;
            } else {
                throw e;  // 다른 상태 코드는 다시 던짐
            }
        } catch (Exception e) {
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

    /**
     * 등록된 간편결제 카드로 결제 진행
     * @param cardRequestDto 요청DTO
     * @throws Exception
     */
    @Override
    public Long payCard(CardRequestDto cardRequestDto) throws Exception {
        // 요청 Header
        HeaderApiDto headerApiDto = new HeaderApiDto("createCreditCardTransaction", apiKey, cardRequestDto.getUserApiKey());

        // 등록 카드 유무 체크
        Payment payment = paymentJpaRepository.findById(cardRequestDto.getPaymentId()).orElseThrow(() -> new CustomException(ErrorCode.CARD_NOT_FOUND));

        // 카드번호, cvc 조회
        ResponsePayCardDto card = paymentRepository.selectPayCard(payment.getId());

        // 요청 JSON
        TransactionRequestDto transactionRequestDto = new TransactionRequestDto(
                headerApiDto,
                card.getCardNum(),
                card.getCardNum(),
                cardRequestDto.getStoreId(),
                cardRequestDto.getPaymentBalance()
        );

        // ssafy금융 카드 결제 url
        apiUrl = "creditCard/";
        apiName = "createCreditCardTransaction";
        String url = externalApiUrl + apiUrl + apiName;
        Map<String, Map<String, Object>> response
                = restTemplate.postForObject(url, transactionRequestDto, Map.class);

        // responseHeader 추출, 처리
        if (response != null && response.get("Header") != null) {
            Map<String, Object> header= response.get("Header");

            if(header.get("responseCode").equals("H0000")) {
                //정상 처리 -> 트랜잭션 고유 번호 반환
                return (Long) response.get("REC").get("transactionUniqueNo");
            } else {
                // 실패
                throw new CustomException(ErrorCode.CARD_PAY_FAILED);
            }
        }
        // 응답이 없을 경우 처리
        return null;
    }

}

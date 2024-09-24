package com.silverorder.domain.payment.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.silverorder.domain.menu.dto.ResponseMenuDto;
import com.silverorder.domain.menu.entity.Menu;
import com.silverorder.domain.payment.dto.PaymentType;
import com.silverorder.domain.payment.dto.ResponsePayCardDto;
import com.silverorder.domain.payment.entity.Card;
import com.silverorder.domain.payment.entity.Payment;
import com.silverorder.domain.user.entity.User;
import com.silverorder.global.dto.CardDto;
import com.silverorder.global.dto.ResponseCardBenefit;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.PersistenceException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.silverorder.domain.payment.entity.QCard.card;
import static com.silverorder.domain.payment.entity.QPayment.payment;

/**
 * <pre>
 *      결제 관리 레포지토리 구현
 * </pre>
 *
 * @author 노명환
 * @since JDK17
 */
@Repository
@RequiredArgsConstructor
public class PaymentRepositoryImpl implements PaymentRepository {

    @PersistenceContext
    private final EntityManager em;
    private final JPAQueryFactory queryFactory;

    /**
     * 내 간편결제 카드 조회
     * <pre>
     *      간편결제로 등록한 카드를 조회합니다
     * </pre>
     *
     * @param user : 유저 entity
     * @return : 메뉴 entity
     * @throws PersistenceException : JPA 표준 예외
     */
    @Override
    public List<ResponsePayCardDto> myPayCardList(User user) throws PersistenceException {
        return queryFactory
                .select(Projections.constructor(ResponsePayCardDto.class,
                        card.payment.id,
                        card.cardNum,
                        card.cardCVC,
                        card.cardIssuerName,
                        card.cardName,
                        card.discountRate
                ))
                .from(card)
                .where(card.payment.user.eq(user))
                .fetch();
    }

    /**
     * 간편결제 수단 등록
     * <pre>
     *      간편결제 수단을 등록합니다. 이후 카드 또는 계좌정보를 입력합니다.
     * </pre>
     *
     * @param user        : 유저 entity
     * @param paymentType : 결제수단 enum
     * @return : 간편결제 entity
     * @throws PersistenceException : JPA 표준 예외
     */
    @Override
    public Payment registPayment(User user, PaymentType paymentType) {
        try {
            Payment payment = new Payment(
                    null,
                    user,
                    paymentType
            );
            em.persist(payment);
            em.flush();

            return payment;
        } catch (Exception e) {
            throw new PersistenceException("간편결제 등록 중 에러 발생", e);
        }
    }

    /**
     * 간편결제 카드 등록
     * <pre>
     *      간편결제 카드를 등록합니다.
     * </pre>
     *
     * @param user    : 유저 entity
     * @param cardDto : 카드정보 dto
     * @param payment : 간편결제 entity
     * @throws PersistenceException : JPA 표준 예외
     */
    @Override
    public void registCard(User user, CardDto cardDto, Payment payment) throws PersistenceException {
        try {
            List<ResponseCardBenefit> benefits = cardDto.getResponseCardBenefits();

            Double discountRate = null;
            if (benefits != null && !benefits.isEmpty()) {
                for (ResponseCardBenefit cardBenefit : benefits) {
                    if (cardBenefit.getCategoryName().equals("생활")) {
                        discountRate = cardBenefit.getDiscountRate();
                        break;
                    }
                }
            }

            Card card = new Card(
                    payment,
                    cardDto.getCardNo(),
                    cardDto.getCvc(),
                    cardDto.getCardIssuerName(),
                    cardDto.getCardName(),
                    discountRate
            );

            em.persist(card);
            em.flush();

            //return menu;
        } catch (Exception e) {
            throw new PersistenceException("카드 등록 중 에러 발생", e);
        }
    }

    /**
     * <pre>
     *     결제수단 고유번호(PK)로 카드 정보 단건 조회
     * </pre>
     *
     * @param paymentId 결제수단 번호
     * @throws PersistenceException
     */
    @Override
    public ResponsePayCardDto selectPayCard(Long paymentId) throws PersistenceException {
        return queryFactory
                .select(Projections.constructor(ResponsePayCardDto.class,
                        card.payment.id,
                        card.cardNum,
                        card.cardCVC,
                        card.cardIssuerName,
                        card.cardName,
                        card.discountRate
                ))
                .from(card)
                .innerJoin(payment)
                .on(payment.id.eq(card.payment.id))
                .on(payment.id.eq(card.payment.id))
                .where(payment.id.eq(paymentId))
                .fetchOne();
    }
}

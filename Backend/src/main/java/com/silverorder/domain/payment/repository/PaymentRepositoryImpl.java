package com.silverorder.domain.payment.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.silverorder.domain.payment.dto.ResponsePayCardDto;
import com.silverorder.domain.user.entity.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.PersistenceException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * <pre>
 *      결제 관리 레포지토리 구현
 * </pre>
 * @author 노명환
 * @since JDK17
 */
@Repository
@RequiredArgsConstructor
public class PaymentRepositoryImpl implements PaymentRepository{

    @PersistenceContext
    private final EntityManager em;
    private final JPAQueryFactory queryFactory;

    /**
     * 내 간편결제 카드 조회
     * <pre>
     *      간편결제로 등록한 카드를 조회합니다
     * </pre>
     * @param user : 유저 entity
     * @return : 메뉴 entity
     * @throws PersistenceException : JPA 표준 예외
     */
    @Override
    public List<ResponsePayCardDto> myPayCardList(User user) throws PersistenceException {
        return List.of();
    }
}

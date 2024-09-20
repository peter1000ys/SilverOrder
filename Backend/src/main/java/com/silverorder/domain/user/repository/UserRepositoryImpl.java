package com.silverorder.domain.user.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import com.silverorder.domain.user.dto.UserDto;
import com.silverorder.domain.user.entity.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.PersistenceException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import static com.silverorder.domain.user.entity.QUser.user;
import static com.silverorder.domain.store.entity.QStore.store;


/**
 * <pre>
 *      회원 관리 레포지토리 구현 클래스
 * </pre>
 *
 * @author 박봉균
 * @since JDK17 Eclipse Temurin
 */
@Repository
@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepository {

    @PersistenceContext
    private final EntityManager em;
    private final JPAQueryFactory queryFactory;


    /**
     * 이메일로 회원 조회(로그인)
     *
     * @param email 이메일
     * @return UserDto 회원 DTO
     * @throws PersistenceException JPA 표준 예외
     */
    @Override
    public UserDto findByUserEmail(String email) throws PersistenceException {
        return queryFactory
                .select(Projections.constructor(UserDto.class,
                        user.id,
                        user.userEmail,
                        user.userPassword,
                        user.userBirth,
                        user.userRole,
                        user.userJoinDate,
                        user.userUpdateDate,
                        user.userApiEmail,
                        user.userApiKey
                ))
                .from(user)
                .where(user.userEmail.eq(email))
                .fetchOne();
    }

    /**
     * id로 회원 조회
     *
     * @param id 회원 고유 번호
     * @return UserDto 회원 DTO
     * @throws PersistenceException JPA 표준 예외
     */
    @Override
    public UserDto findByUserId(Long id) throws PersistenceException {
        return queryFactory
                .select(Projections.constructor(UserDto.class,
                        user.id,
                        user.userEmail,
                        user.userPassword,
                        user.userBirth,
                        user.userRole,
                        user.userJoinDate,
                        user.userUpdateDate,
                        user.userApiEmail,
                        user.userApiKey
                ))
                .from(user)
                .where(user.id.eq(id))
                .fetchOne();
    }

    /**
     * 회원 정보 저장(회원가입)
     *
     * @param user 회원 엔터티 객체
     * @throws PersistenceException JPA 표준 예외
     */
    @Override
    public void insertUser(User user) throws PersistenceException {
        em.persist(user);
    }

    @Override
    public void addAdminWithStoreId(User user, Long storeId) throws PersistenceException {
        em.persist(user);

        queryFactory
                .update(store)
                .set(store.user, user)
                .where(store.id.eq(storeId))
                .execute();
    }

    @Override
    public void deleteUser(Long userId) throws PersistenceException {
        queryFactory
                .delete(user)
                .where(user.id.eq(userId))
                .execute();
    }

    @Override
    public void connectBank(Long userId, String userApiEmail, String userApiKey) throws PersistenceException {
        queryFactory
                .update(user)
                .set(user.userApiEmail, userApiEmail)
                .set(user.userApiKey, userApiKey)
                .where(user.id.eq(userId))
                .execute();
    }

}

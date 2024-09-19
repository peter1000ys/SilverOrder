package com.silverorder.domain.user.repository;

import com.silverorder.domain.user.dto.UserDto;
import com.silverorder.domain.user.entity.User;
import jakarta.persistence.PersistenceException;


/**
 * <pre>
 *     회원 관리 레포지토리 인터페이스
 * </pre>
 *
 * @author 박봉균
 * @since JDK17 Eclipse Temurin
 */
public interface UserRepository {
    void insertUser(User user) throws PersistenceException;

    UserDto findByUserEmail(String email) throws PersistenceException;

    UserDto findByUserId(Long id) throws PersistenceException;

    void deleteUser(Long userId) throws PersistenceException;

    void addAdminWithStoreId(User user, Long storeId) throws PersistenceException;

    void connectBank(Long userId, String userApiEmail, String userApiKey) throws PersistenceException;
}

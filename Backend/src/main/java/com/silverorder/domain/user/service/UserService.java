package com.silverorder.domain.user.service;


import com.silverorder.domain.user.dto.*;
import com.silverorder.domain.user.entity.User;
import jakarta.persistence.PersistenceException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;

/**
 * <pre>
 *     회원 서비스 인터페이스 클래스
 * </pre>
 * @author 박봉균
 * @since JDK17 Eclipse Temurin
 */
public interface UserService {

    /** 로그인 메서드 **/
    LoginResponseDto login(LoginRequestDto loginRequestDto) throws Exception;

    /** 회원가입 메서드 **/
    void register(RegisterRequestDto signUpRequestDto) throws Exception;

    /** 유저 정보 조회 메서드 **/
    UserDto getUserInfo(Long userId) throws Exception;

    /** 회원 탈퇴 */
    void deleteUser(Long userId) throws Exception;

    void registerAdmin(AdminRegisterRequestDto adminRegisterRequestDto) throws Exception;

    void connectBank(Long userId, String userApiEmail) throws Exception;

    Long getStoreIdByUserId(Long userId) throws Exception;
}

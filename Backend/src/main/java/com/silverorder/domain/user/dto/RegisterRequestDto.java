package com.silverorder.domain.user.dto;

import com.silverorder.domain.user.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

/**
 * 회원가입 요청 DTO
 *
 * @author 박봉균
 * @since JDK17 Eclipse Temurin
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RegisterRequestDto {

    /**
     * 이메일, 공백, null 검증
     **/
    @NotNull
    @NotBlank(message = "아이디는 필수입니다.")
    @Email
    private String userEmail;

    /**
     * 유저 패스워드
     **/
    @NotNull
    @NotBlank(message = "비밀번호는 필수입니다.")
    private String userPassword;

    /**
     * 유저정보 역할(일반/관리자)
     **/
    @Schema(hidden = true)
    private UserRole userRole; //controller에서 구분하여 enum 입력


    /**
     * 유저 회원가입 시간
     **/
    @Schema(hidden = true)
    private LocalDateTime userJoinDate;

    /**
     * 회원정보 수정 날짜
     **/
    @Schema(hidden = true)
    private LocalDateTime userUpdateDate;

    /**
     * DTO를 회원 엔터티로 변환하는 함수
     *
     * @return User
     */
    public User toEntity() {
        return User.builder()
                .id(null)
                .userEmail(this.userEmail)
                .userPassword(this.userPassword)
                .userJoinDate(this.userJoinDate)
                .userRole(this.userRole)
                .userUpdateDate(this.userUpdateDate)
                .build();
    }

}
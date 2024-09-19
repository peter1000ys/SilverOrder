package com.silverorder.domain.user.dto;

import lombok.*;

/**
 * <pre>
 *     회원 DTO를 상속 받는 로그인 응답 DTO
 *     - 토큰 정보를 가짐
 * </pre>
 *
 * @author 박봉균
 * @since JDK17 Eclipse Temurin
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class LoginResponseDto extends UserDto {
    private String token;

    /**
     * 부모 객체를 사용한 부분 생성자
     *
     * @param userDto 부모 객체
     * @param token   토큰
     */
    public LoginResponseDto(UserDto userDto, String token) {
        super(userDto.getUserId(),
                userDto.getUserEmail(),
                userDto.getUserPassword(),
                userDto.getUserBirth(),
                userDto.getUserRole(),
                userDto.getUserJoinDate(),
                userDto.getUserUpdateDate(),
                userDto.getUserApiEmail());
        this.token = token;
    }
}

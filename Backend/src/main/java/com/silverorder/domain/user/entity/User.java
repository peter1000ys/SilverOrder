package com.silverorder.domain.user.entity;

import com.silverorder.domain.user.dto.UserRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;


/**
 * <pre>
 *     회원 도메인 클래스
 * </pre>
 *
 * @author 박봉균
 * @since JDK17 Eclipse Temurin
 */
@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "T_USER")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_ID", nullable = false)
    private Long id;

    @Column(name = "USER_EMAIL", length = 30, unique = true, nullable = false)
    @NotNull
    private String userEmail;

    @Column(name = "USER_PW", length = 200, nullable = false)
    @NotNull
    private String userPassword;

    @Column(name = "USER_BIRTH", nullable = false)
    @NotNull
    private LocalDate userBirth;

    @Column(name = "USER_ROLE", nullable = false)
    @NotNull
    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @Column(name = "USER_JOIN_DATE", nullable = false)
    @CreationTimestamp
    private LocalDateTime userJoinDate;

    @Column(name = "USER_UPDATE_DATE", nullable = false)
    @UpdateTimestamp
    private LocalDateTime userUpdateDate;

    @Column(name = "USER_API_EMAIL", length = 100)
    private String userApiEmail;

    @Column(name = "USER_API_KEY", length = 200)
    private String userApiKey;

}

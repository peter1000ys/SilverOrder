package com.silverorder.domain.store.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * <pre>
 *     매출 정산 도메인 클래스
 * </pre>
 *
 * @author 박봉균
 * @since JDK17 Eclipse Temurin
 */

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "T_PROC_SALES", uniqueConstraints =
@UniqueConstraint(name = "UNI_STORE_DATE", columnNames = {"STORE_ID", "PROC_DATE"}))
public class StoreSalesCalculate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PROC_ID", nullable = false)
    private Long id;

    @Column(name = "PROC_DATE", nullable = false)
    private LocalDate procDate;

    @Column(name = "PROC_DAILY_SALES", nullable = false)
    private Long procDailySales;

    @Column(name = "INSERT_DATE", nullable = false)
    private LocalDate insertDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "STORE_ID", nullable = false)
    private Store store; //외래키

}

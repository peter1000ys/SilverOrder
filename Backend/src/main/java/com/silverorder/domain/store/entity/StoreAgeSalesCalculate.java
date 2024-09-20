package com.silverorder.domain.store.entity;

import com.silverorder.domain.menu.entity.Menu;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * <pre>
 *     연령별 메뉴 주문 정산 도메인 클래스
 * </pre>
 *
 * @author 노명환
 * @since JDK17 Eclipse Temurin
 */

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "T_PROC_AGE_MENU_SALES", uniqueConstraints =
@UniqueConstraint(name = "UNI_STORE_DATE_AGE_MENU", columnNames =
        {"STORE_ID", "PROC_DATE", "MENU_ID", "PURCHASE_AGE"}))
public class StoreAgeSalesCalculate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PROC_ID", nullable = false)
    private Long id;

    @Column(name = "PROC_DATE", nullable = false)
    @NotNull
    private LocalDate procDate;

    @Column(name = "PROC_MENU_AMOUNT", nullable = false)
    @NotNull
    private Integer procMenuAmount;

    @Column(name = "INSERT_DATE", nullable = false)
    @NotNull
    private LocalDate insertDate;

    @Column(name = "PURCHASE_AGE", nullable = false)
    @NotNull
    private Integer purchaseAge;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "STORE_ID", nullable = false)
    @NotNull
    private Store store; //외래키

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MENU_ID", nullable = false)
    @NotNull
    private Menu menu;
}

package com.silverorder.domain.store.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProcWeekDto {
    private Long procId;
    private LocalDate procDate;
    private Long procDailySales;
}

package com.ssafy.adventsvr.payload.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AdventBoxListModifyDto {
    private Integer userId;
    private String id;
    private String title;
    private Integer day;
    private LocalDate endAt;
    private String boxId;
    private LocalDate activeAt;
    private boolean isActive;
    private Integer adventDay;
    private Integer activeDay;
    private String wrapper;

}

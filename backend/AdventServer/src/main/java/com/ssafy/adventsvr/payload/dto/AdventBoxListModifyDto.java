package com.ssafy.adventsvr.payload.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdventBoxListModifyDto {
    private Integer userId;
    private String id;
    private String title;
    private Integer day;
    private LocalDate endAt;

    private String boxId;
    // 활성화 날짜
    private LocalDate activeAt;
    // 활성화 유무
    private boolean isActive;
    // 몇번째 박스인지
    private Integer adventDay;
    // 활성화까지 며칠 남은지
    private Integer activeDay;
    // 포장지 이미지
    private String wrapper;

}

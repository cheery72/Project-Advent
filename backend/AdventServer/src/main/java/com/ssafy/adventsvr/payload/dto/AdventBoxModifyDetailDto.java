package com.ssafy.adventsvr.payload.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AdventBoxModifyDetailDto {
    private String id;
    private Integer userId;
    private Integer day;
}

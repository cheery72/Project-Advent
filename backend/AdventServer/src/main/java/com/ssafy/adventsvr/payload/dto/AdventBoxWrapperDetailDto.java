package com.ssafy.adventsvr.payload.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AdventBoxWrapperDetailDto {
    private String id;
    private String wrapper;
    private Integer userId;
}

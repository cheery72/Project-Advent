package com.ssafy.adventsvr.payload.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AdventBoxWrapperDetailDto {
    private String id;
    private String wrapper;
    private Integer userId;
}

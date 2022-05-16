package com.ssafy.adventsvr.payload.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AdventBoxDetailDto {

    private String id;

    private Integer adventDay;

    private Integer day;

    private String content;

    private String animation;

    private Integer userId;

}
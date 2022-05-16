package com.ssafy.adventsvr.payload.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AdventBoxUrlDto {

    private String id;

    private Integer day;

    private String content;

    private boolean isActive;

    private Integer adventDay;

    private String animation;

}

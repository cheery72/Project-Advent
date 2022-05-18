package com.ssafy.adventsvr.payload.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AdventBoxUrlDetailResponse {

    private Integer adventDay;
    private Integer dDay;
    private String content;
    private String animation;

    @Builder
    public AdventBoxUrlDetailResponse(Integer adventDay, Integer dDay, String content, String animation) {
        this.adventDay = adventDay;
        this.dDay = dDay;
        this.content = content;
        this.animation = animation;
    }
}

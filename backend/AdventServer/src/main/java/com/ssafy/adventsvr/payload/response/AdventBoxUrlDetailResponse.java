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
    private boolean isAnimation;

    @Builder
    public AdventBoxUrlDetailResponse(Integer adventDay, Integer dDay, String content, boolean isAnimation) {
        this.adventDay = adventDay;
        this.dDay = dDay;
        this.content = content;
        this.isAnimation = isAnimation;
    }
}

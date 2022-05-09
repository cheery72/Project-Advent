package com.ssafy.adventsvr.payload.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AdventBoxDetailResponse {
    private Integer adventDay;
    private Integer dDay;
    private String content;

    @Builder
    public AdventBoxDetailResponse(Integer adventDay, Integer dDay, String content) {
        this.adventDay = adventDay;
        this.dDay = dDay;
        this.content = content;
    }
}

package com.ssafy.adventsvr.payload.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AdventBoxDetailResponse {
    private Integer adventDay;
    private String content;

    @Builder
    public AdventBoxDetailResponse(Integer adventDay, String content) {
        this.adventDay = adventDay;
        this.content = content;
    }
}

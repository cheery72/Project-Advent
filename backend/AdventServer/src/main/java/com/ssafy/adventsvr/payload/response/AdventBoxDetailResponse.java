package com.ssafy.adventsvr.payload.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AdventBoxDetailResponse {
    private String boxId;
    private Integer adventDay;
    private Integer dDay;
    private String content;

    @Builder
    public AdventBoxDetailResponse(String boxId, Integer adventDay, Integer dDay, String content) {
        this.boxId = boxId;
        this.adventDay = adventDay;
        this.dDay = dDay;
        this.content = content;
    }
}
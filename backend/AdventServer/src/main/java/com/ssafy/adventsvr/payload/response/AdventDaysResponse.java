package com.ssafy.adventsvr.payload.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AdventDaysResponse {

    private Integer day;

    @Builder
    public AdventDaysResponse(Integer day) {
        this.day = day;
    }
}

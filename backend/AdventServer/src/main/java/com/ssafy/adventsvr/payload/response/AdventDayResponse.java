package com.ssafy.adventsvr.payload.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AdventDayResponse {

    private Integer adventId;

    @Builder
    public AdventDayResponse(Integer adventId) {
        this.adventId = adventId;
    }
}

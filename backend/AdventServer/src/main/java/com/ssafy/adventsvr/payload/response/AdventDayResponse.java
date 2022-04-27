package com.ssafy.adventsvr.payload.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AdventDayResponse {

    private String adventId;

    @Builder
    public AdventDayResponse(String adventId) {
        this.adventId = adventId;
    }
}

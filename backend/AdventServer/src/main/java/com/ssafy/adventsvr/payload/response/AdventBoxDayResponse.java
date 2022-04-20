package com.ssafy.adventsvr.payload.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AdventBoxDayResponse {

    private Integer boxId;

    @Builder
    public AdventBoxDayResponse(Integer boxId) {
        this.boxId = boxId;
    }
}

package com.ssafy.adventsvr.payload.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AdventBoxWrapperResponse {

    private Integer boxId;
    private String wrapper;

    @Builder
    public AdventBoxWrapperResponse(Integer boxId, String wrapper) {
        this.boxId = boxId;
        this.wrapper = wrapper;
    }
}

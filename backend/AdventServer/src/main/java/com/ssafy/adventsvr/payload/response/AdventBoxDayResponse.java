package com.ssafy.adventsvr.payload.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AdventBoxDayResponse {

    private String boxId;
    private String content;
    private boolean isAnimation;

    @Builder
    public AdventBoxDayResponse(String boxId, String content, boolean isAnimation) {
        this.boxId = boxId;
        this.content = content;
        this.isAnimation = isAnimation;
    }
}


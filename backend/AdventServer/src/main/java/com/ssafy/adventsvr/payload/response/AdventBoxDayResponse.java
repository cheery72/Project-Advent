package com.ssafy.adventsvr.payload.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AdventBoxDayResponse {

    private String boxId;
    private String content;
    private String animation;

    @Builder
    public AdventBoxDayResponse(String boxId, String content, String animation) {
        this.boxId = boxId;
        this.content = content;
        this.animation = animation;
    }
}


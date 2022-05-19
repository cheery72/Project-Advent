package com.ssafy.adventsvr.payload.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AdventBoxTitleResponse {

    private String wrapper;
    private String title;

    @Builder
    public AdventBoxTitleResponse(String wrapper, String title) {
        this.wrapper = wrapper;
        this.title = title;
    }
}

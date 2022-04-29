package com.ssafy.adventsvr.payload.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AdventUrlResponse {

    private String url;

    @Builder
    public AdventUrlResponse(String url) {
        this.url = url;
    }
}

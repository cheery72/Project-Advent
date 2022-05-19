package com.ssafy.adventsvr.payload.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AdventIsPasswordResponse {

    private boolean isPassword;
    private String passwordHint;
    private Integer day;

    @Builder
    public AdventIsPasswordResponse(boolean isPassword, String passwordHint, Integer day) {
        this.isPassword = isPassword;
        this.passwordHint = passwordHint;
        this.day = day;
    }
}

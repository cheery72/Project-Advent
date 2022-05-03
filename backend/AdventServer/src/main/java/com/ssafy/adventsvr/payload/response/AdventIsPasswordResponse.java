package com.ssafy.adventsvr.payload.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AdventIsPasswordResponse {

    private boolean isPassword;
    private String passwordHint;

    @Builder
    public AdventIsPasswordResponse(boolean isPassword, String passwordHint) {
        this.isPassword = isPassword;
        this.passwordHint = passwordHint;
    }
}

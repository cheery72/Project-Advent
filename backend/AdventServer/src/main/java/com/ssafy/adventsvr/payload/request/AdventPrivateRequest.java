package com.ssafy.adventsvr.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AdventPrivateRequest {

    @NotNull
    private Integer userId;

    private String password;

    private String passwordVal;

    private String passwordHint;

    @NotBlank
    private String endAt;

}

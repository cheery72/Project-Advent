package com.ssafy.adventsvr.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AdventBoxWrapperRequest {

    @NotBlank
    private String adventId;

    @NotNull
    private Integer adventDay;

    @NotNull
    private Integer userId;
}

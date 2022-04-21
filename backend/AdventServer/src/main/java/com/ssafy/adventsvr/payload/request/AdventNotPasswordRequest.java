package com.ssafy.adventsvr.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AdventNotPasswordRequest {

    @NotBlank
    private String url;
}

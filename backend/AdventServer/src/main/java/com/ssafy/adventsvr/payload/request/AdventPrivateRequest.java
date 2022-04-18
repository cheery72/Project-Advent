package com.ssafy.adventsvr.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AdventPrivateRequest {

    @NotNull
    private Integer adventId;

    @NotNull
    private Integer userId;

    @NotNull
    private Integer password;

    @NotNull
    private Integer passwordVal;

    private String passwordHint;

    private LocalDateTime dDay;

}

package com.ssafy.adventsvr.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AdventBoxRequest {

    @NotNull
    private Integer userId;

    @NotNull
    private Integer adventId;

    @NotNull
    private Integer adventDay;

    private MultipartFile content;
}

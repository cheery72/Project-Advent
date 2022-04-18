package com.ssafy.adventsvr.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;
import javax.validation.constraints.NotNull;
import java.util.Map;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AdventBoxWrapperRequest {

    @NotNull
    private Integer adventId;

    private String recipientName;

    private Map<Integer, MultipartFile> wrapper;
}

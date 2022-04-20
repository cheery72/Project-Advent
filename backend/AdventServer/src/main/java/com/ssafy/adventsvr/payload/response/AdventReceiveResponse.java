package com.ssafy.adventsvr.payload.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.List;

@Getter
@NoArgsConstructor
public class AdventReceiveResponse {

    private Integer adventId;
    private String recipientName;
    private List<AdventBoxListResponse> adventBoxList;

    @Builder
    public AdventReceiveResponse(Integer adventId, String recipientName, List<AdventBoxListResponse> adventBoxList) {
        this.adventId = adventId;
        this.recipientName = recipientName;
        this.adventBoxList = adventBoxList;
    }
}

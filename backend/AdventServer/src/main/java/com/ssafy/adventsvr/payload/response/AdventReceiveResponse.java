package com.ssafy.adventsvr.payload.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.List;

@Getter
@NoArgsConstructor
public class AdventReceiveResponse {

    private String adventId;
    private String title;
    private Integer day;
    private List<AdventBoxListResponse> adventBoxList;

    @Builder
    public AdventReceiveResponse(String adventId, String title, Integer day, List<AdventBoxListResponse> adventBoxList) {
        this.adventId = adventId;
        this.title = title;
        this.day = day;
        this.adventBoxList = adventBoxList;
    }
}

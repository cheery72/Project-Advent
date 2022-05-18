package com.ssafy.adventsvr.payload.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.List;

@Getter
@NoArgsConstructor
public class AdventReceiveResponse {

    private String adventId;
    private String title;
    private Integer day;
    private LocalDate endAt;
    private List<AdventBoxListResponse> adventBoxList;

    @Builder
    public AdventReceiveResponse(String adventId, String title, Integer day, LocalDate endAt, List<AdventBoxListResponse> adventBoxList) {
        this.adventId = adventId;
        this.title = title;
        this.day = day;
        this.endAt = endAt;
        this.adventBoxList = adventBoxList;
    }
}

package com.ssafy.adventsvr.payload.response;

import com.ssafy.adventsvr.entity.AdventBox;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class AdventReceiveResponse {

    private Integer adventId;
    private String recipientName;
    private List<AdventBox> adventBoxList;

    @Builder
    public AdventReceiveResponse(Integer adventId, String recipientName, List<AdventBox> adventBoxList) {
        this.adventId = adventId;
        this.recipientName = recipientName;
        this.adventBoxList = adventBoxList;
    }
}

package com.ssafy.adventsvr.payload.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdventCreationResponse {
    private Integer unCreateBox;
    private List<Integer> unCreateBoxList;
    private Integer unContentBox;
    private List<Integer> unContentBoxList;

    public static AdventCreationResponse creationBuilder(Integer unCreateBox, List<Integer> unCreateBoxList,
                                                         Integer unContentBox, List<Integer> unContentBoxList){
        return AdventCreationResponse.builder()
                .unCreateBox(unCreateBox)
                .unCreateBoxList(unCreateBoxList)
                .unContentBox(unContentBox)
                .unContentBoxList(unContentBoxList)
                .build();
    }
}

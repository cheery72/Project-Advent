package com.ssafy.adventsvr.payload.response;

import com.ssafy.adventsvr.entity.Advent;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.List;

@Getter
@NoArgsConstructor
public class AdventCreatedResponse {

    private Advent advent;
    private Integer unCreateBox;
    private List<Integer> unCreateBoxList;
    private Integer unContentBox;
    private List<Integer> unContentBoxList;
    private String wrapper;

    public static AdventCreatedResponse createdBuilder(Advent advent, Integer unCreateBox
                                                ,List<Integer> unCreateBoxList,Integer unContentBox
                                                ,List<Integer> unContentBoxList, String wrapper){
        return AdventCreatedResponse.builder()
                .advent(advent)
                .unCreateBox(unCreateBox)
                .unCreateBoxList(unCreateBoxList)
                .unContentBox(unContentBox)
                .unContentBoxList(unContentBoxList)
                .wrapper(wrapper)
                .build();
    }

    @Builder
    public AdventCreatedResponse(Advent advent, Integer unCreateBox, List<Integer> unCreateBoxList, Integer unContentBox, List<Integer> unContentBoxList, String wrapper) {
        this.advent = advent;
        this.unCreateBox = unCreateBox;
        this.unCreateBoxList = unCreateBoxList;
        this.unContentBox = unContentBox;
        this.unContentBoxList = unContentBoxList;
        this.wrapper = wrapper;
    }
}

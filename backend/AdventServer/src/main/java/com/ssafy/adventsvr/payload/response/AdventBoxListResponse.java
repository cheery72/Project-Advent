package com.ssafy.adventsvr.payload.response;

import com.ssafy.adventsvr.entity.AdventBox;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class AdventBoxListResponse {

    private Integer boxId;
    private LocalDate isActiveAt;
    private boolean isActive;
    private String wrapper;

    public static List<AdventBoxListResponse> adventBoxListBuilder(List<AdventBox> adventBoxs){
        return adventBoxs.stream()
                .map(adventBox -> AdventBoxListResponse.builder()
                        .boxId(adventBox.getId())
                        .isActive(adventBox.isActive())
                        .wrapper(adventBox.getWrapper())
                        .build())
                .collect(Collectors.toList());
    }

    @Builder
    private AdventBoxListResponse(Integer boxId, LocalDate isActiveAt, boolean isActive, String wrapper) {
        this.boxId = boxId;
        this.isActiveAt = isActiveAt;
        this.isActive = isActive;
        this.wrapper = wrapper;
    }
}

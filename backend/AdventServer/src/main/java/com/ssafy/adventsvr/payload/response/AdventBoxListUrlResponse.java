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
public class AdventBoxListUrlResponse {

    // 박스 PK
    private String boxId;
    // 활성화 날짜
    private LocalDate isActiveAt;
    // 활성화 유무
    private boolean isActive;
    // 몇번째 박스인지
    private Integer adventDay;
    // 활성화까지 며칠 남은지
    private Integer activeDay;
    // 포장지 이미지
    private String wrapper;

    public static List<AdventBoxListUrlResponse> adventBoxListUrlBuilder(List<AdventBox> adventBoxs){
        return adventBoxs.stream()
                .map(adventBox -> AdventBoxListUrlResponse.builder()
                        .boxId(adventBox.getId())
                        .isActive(adventBox.isActive())
                        .activeDay(adventBox.getActiveDay())
                        .adventDay(adventBox.getAdventDay())
                        .isActiveAt(adventBox.getActiveAt())
                        .wrapper(adventBox.getWrapper())
                        .build())
                .collect(Collectors.toList());
    }

    @Builder
    public AdventBoxListUrlResponse(String boxId, LocalDate isActiveAt, boolean isActive, Integer adventDay, Integer activeDay, String wrapper) {
        this.boxId = boxId;
        this.isActiveAt = isActiveAt;
        this.isActive = isActive;
        this.adventDay = adventDay;
        this.activeDay = activeDay;
        this.wrapper = wrapper;
    }
}

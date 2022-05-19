package com.ssafy.adventsvr.payload.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class AdventStorageResponse {

    private String adventId;
    private String title;
    private boolean isReceived;
    private LocalDate endAt;
    private LocalDateTime modifiedAt;
    private Integer adventDay;
    private String url;
    private Integer unCreateBox;
    private List<Integer> unCreateBoxList;
    private Integer unContentBox;
    private List<Integer> unContentBoxList;
    private String wrapper;

    public static List<AdventStorageResponse> storageBuilder(List<AdventCreatedResponse> advent){
        return advent.stream()
                .map(advents -> AdventStorageResponse.builder()
                        .adventId(advents.getAdvent().getId())
                        .title(advents.getAdvent().getTitle())
                        .isReceived(advents.getAdvent().isReceived())
                        .endAt(advents.getAdvent().getEndAt())
                        .adventDay(advents.getAdvent().getDay())
                        .modifiedAt(advents.getAdvent().getModifiedAt())
                        .url(advents.getAdvent().getUrl())
                        .unCreateBox(advents.getUnCreateBox())
                        .unCreateBoxList(advents.getUnCreateBoxList())
                        .unContentBox(advents.getUnContentBox())
                        .unContentBoxList(advents.getUnContentBoxList())
                        .wrapper(advents.getWrapper())
                        .build())
                .collect(Collectors.toList());
    }

    @Builder
    public AdventStorageResponse(String adventId, String title, boolean isReceived, LocalDate endAt, LocalDateTime modifiedAt, Integer adventDay, String url, Integer unCreateBox, List<Integer> unCreateBoxList, Integer unContentBox, List<Integer> unContentBoxList, String wrapper) {
        this.adventId = adventId;
        this.title = title;
        this.isReceived = isReceived;
        this.endAt = endAt;
        this.modifiedAt = modifiedAt;
        this.adventDay = adventDay;
        this.url = url;
        this.unCreateBox = unCreateBox;
        this.unCreateBoxList = unCreateBoxList;
        this.unContentBox = unContentBox;
        this.unContentBoxList = unContentBoxList;
        this.wrapper = wrapper;
    }
}

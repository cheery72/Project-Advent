package com.ssafy.adventsvr.payload.response;

import com.ssafy.adventsvr.entity.Advent;
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
//    private CreatedBoxDto createdBoxDto;

    public static List<AdventStorageResponse> storageBuilder(List<Advent> advent){
//    public static List<AdventStorageResponse> storageBuilder(List<Advent> advent, CreatedBoxDto createdBoxDto){
        return advent.stream()
                .map(advents -> AdventStorageResponse.builder()
                        .adventId(advents.getId())
                        .title(advents.getTitle())
                        .isReceived(advents.isReceived())
                        .endAt(advents.getEndAt())
                        .adventDay(advents.getDay())
                        .modifiedAt(advents.getModifiedAt())
                        .url(advents.getUrl())
//                        .createdBoxDto(createdBoxDto)
                        .build())
                .collect(Collectors.toList());
    }

    @Builder
    public AdventStorageResponse(String adventId, String title, boolean isReceived, LocalDate endAt, LocalDateTime modifiedAt, Integer adventDay, String url) {
        this.adventId = adventId;
        this.title = title;
        this.isReceived = isReceived;
        this.endAt = endAt;
        this.modifiedAt = modifiedAt;
        this.adventDay = adventDay;
        this.url = url;
//        this.createdBoxDto = createdBoxDto;
    }

//    @Getter
//    @NoArgsConstructor
//    static class CreatedBoxDto {
//        private Integer unCreateBox;
//        private List<Integer> unCreateBoxList;
//        private Integer unContentBox;
//        private List<Integer> unContentBoxList;
//
//        public static CreatedBoxDto createdBuilder(Integer unCreateBox, List<Integer> unCreateBoxList,
//                                                Integer unContentBox, List<Integer> unContentBoxList){
//            return new CreatedBoxDto(unCreateBox,unCreateBoxList,unContentBox,unContentBoxList);
//        }
//
//        public createdDto(Integer unCreateBox, List<Integer> unCreateBoxList, Integer unContentBox, List<Integer> unContentBoxList) {
//            this.unCreateBox = unCreateBox;
//            this.unCreateBoxList = unCreateBoxList;
//            this.unContentBox = unContentBox;
//            this.unContentBoxList = unContentBoxList;
//        }
//    }
}

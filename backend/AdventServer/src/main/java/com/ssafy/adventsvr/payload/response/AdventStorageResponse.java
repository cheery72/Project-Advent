package com.ssafy.adventsvr.payload.response;

import com.ssafy.adventsvr.entity.Advent;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class AdventStorageResponse {

    private String adventId;
    private String title;
    private boolean isReceived;
    private LocalDate endAt;

    public static List<AdventStorageResponse> storageBuilder(List<Advent> advent){
        return advent.stream()
                .map(advents -> AdventStorageResponse.builder()
                        .adventId(advents.getId())
                        .title(advents.getTitle())
                        .isReceived(advents.isReceived())
                        .endAt(advents.getEndAt())
                        .build())
                .collect(Collectors.toList());
    }

    @Builder
    private AdventStorageResponse(String adventId, String title, boolean isReceived, LocalDate endAt) {
        this.adventId = adventId;
        this.title = title;
        this.isReceived = isReceived;
        this.endAt = endAt;
    }
}

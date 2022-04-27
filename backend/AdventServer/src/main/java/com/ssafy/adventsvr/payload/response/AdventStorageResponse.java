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

    private Integer adventId;
    private String recipientName;
    private boolean isReceived;
    private LocalDate endAt;

    public static List<AdventStorageResponse> storageBuilder(List<Advent> advent){
        return advent.stream()
                .map(advents -> AdventStorageResponse.builder()
                        .adventId(advents.getId())
                        .recipientName(advents.getRecipientName())
                        .isReceived(advents.isReceived())
                        .endAt(advents.getEndAt())
                        .build())
                .collect(Collectors.toList());
    }

    @Builder
    private AdventStorageResponse(Integer adventId, String recipientName, boolean isReceived, LocalDate endAt) {
        this.adventId = adventId;
        this.recipientName = recipientName;
        this.isReceived = isReceived;
        this.endAt = endAt;
    }
}

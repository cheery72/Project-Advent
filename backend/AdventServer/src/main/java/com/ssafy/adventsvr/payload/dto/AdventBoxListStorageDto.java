package com.ssafy.adventsvr.payload.dto;

import com.ssafy.adventsvr.entity.AdventBox;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AdventBoxListStorageDto {
    private String id;
    private String title;
    private boolean isReceived;
    private LocalDate endAt;
    private LocalDateTime modifiedAt;
    private String url;
    private Integer day;
    private Integer userId;
    private List<AdventBox> adventBox;
}

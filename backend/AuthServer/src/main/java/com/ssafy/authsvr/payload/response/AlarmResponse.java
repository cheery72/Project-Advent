package com.ssafy.authsvr.payload.response;

import com.ssafy.authsvr.entity.Alarm;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class AlarmResponse {

    private Long id;
    private String message;
    private LocalDateTime localDateTime;

    public static List<AlarmResponse> alarmResponseList(List<Alarm> alarms){
        return alarms.stream()
                .map(alarm -> AlarmResponse.builder()
                        .id(alarm.getId())
                        .message(alarm.getMessage())
                        .localDateTime(alarm.getLocalDateTime().plusHours(9))
                        .build())
                .collect(Collectors.toList());
    }
    @Builder
    private AlarmResponse(Long id, String message, LocalDateTime localDateTime) {
        this.id = id;
        this.message = message;
        this.localDateTime = localDateTime;
    }


}

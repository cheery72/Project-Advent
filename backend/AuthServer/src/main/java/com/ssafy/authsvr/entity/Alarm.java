package com.ssafy.authsvr.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.redis.core.RedisHash;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@RedisHash(value = "alarm", timeToLive = 30)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Alarm {

    @Id
    private Long id;
    private String recipientName;
    private String message;
    private Integer userId;

    @CreatedDate
    private LocalDateTime localDateTime;

    public static Alarm alarm(String recipientName, Integer userId, String message){
        return Alarm.builder()
                .recipientName(recipientName)
                .userId(userId)
                .message(message)
                .localDateTime(LocalDateTime.now())
                .build();
    }

    @Builder
    public Alarm(Long id, String recipientName, String message, Integer userId, LocalDateTime localDateTime) {
        this.id = id;
        this.recipientName = recipientName;
        this.message = message;
        this.userId = userId;
        this.localDateTime = localDateTime;
    }
}

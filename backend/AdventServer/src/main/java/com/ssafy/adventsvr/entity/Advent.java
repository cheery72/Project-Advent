package com.ssafy.adventsvr.entity;

import com.ssafy.adventsvr.payload.request.AdventDayRequest;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Table(name = "advent")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Advent extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "advent_id")
    private Integer id;

    private String randomUrl;

    private String recipientName;

    private Integer day;

//    @Column(nullable = false, columnDefinition = "tinyint default 0")
    private boolean isReceived;

    @Column(updatable = false)
    private LocalDateTime receivedAt;

    private String password;

    private String passwordHint;

    private LocalDateTime endAt;

    private Integer userId;

    @OneToMany(mappedBy = "advent", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AdventBox> adventBoxes = new ArrayList<>();

    public static Advent adventBuilder(AdventDayRequest adventDayRequest){
        return Advent.builder()
                .userId(adventDayRequest.getUserId())
                .day(adventDayRequest.getDay())
                .build();
    }

    @Builder
    private Advent(Integer id, String randomUrl, Integer day, String recipientName, boolean isReceived, LocalDateTime receivedAt, String password, String passwordHint, LocalDateTime endAt, Integer userId, List<AdventBox> adventBoxes) {
        this.id = id;
        this.randomUrl = randomUrl;
        this.day = day;
        this.recipientName = recipientName;
        this.isReceived = isReceived;
        this.receivedAt = receivedAt;
        this.password = password;
        this.passwordHint = passwordHint;
        this.endAt = endAt;
        this.userId = userId;
        this.adventBoxes = adventBoxes;
    }
}
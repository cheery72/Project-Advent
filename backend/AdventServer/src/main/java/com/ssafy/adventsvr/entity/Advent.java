package com.ssafy.adventsvr.entity;

import lombok.AccessLevel;
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

    @Column(nullable = false, columnDefinition = "tinyint default 0")
    private boolean isReceived;

    @Column(updatable = false)
    private LocalDateTime receivedAt;

    private String password;

    private String passwordHint;

    private LocalDateTime endAt;

    private Integer userId;

    @OneToMany(mappedBy = "advent", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AdventBox> adventBoxes = new ArrayList<>();

}
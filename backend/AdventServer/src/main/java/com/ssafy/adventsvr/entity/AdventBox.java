package com.ssafy.adventsvr.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.time.LocalDateTime;

@Table(name = "advent_box")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class AdventBox extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "advent_box_id")
    private Integer id;

    private String content;

    @Column(nullable = false, columnDefinition = "tinyint default 0")
    private boolean isTemp;

    private LocalDateTime activeAt;

    private Integer adventDay;

    private String wrapper;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "advent_id")
    private Advent advent;

}
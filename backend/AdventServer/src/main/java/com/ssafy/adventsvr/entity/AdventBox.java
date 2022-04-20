package com.ssafy.adventsvr.entity;

import com.ssafy.adventsvr.payload.request.AdventBoxRequest;
import lombok.AccessLevel;
import lombok.Builder;
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

    public static AdventBox adventBoxBuilder(AdventBoxRequest adventBoxRequest, Advent advent, String imageUrl){
        return AdventBox.builder()
                .adventDay(adventBoxRequest.getAdventDay())
                .advent(advent)
                .content(imageUrl)
                .build();
    }

    @Builder
    public AdventBox(Integer id, String content, boolean isTemp, LocalDateTime activeAt, Integer adventDay, String wrapper, Advent advent) {
        this.id = id;
        this.content = content;
        this.isTemp = isTemp;
        this.activeAt = activeAt;
        this.adventDay = adventDay;
        this.wrapper = wrapper;
        this.advent = advent;
    }
}
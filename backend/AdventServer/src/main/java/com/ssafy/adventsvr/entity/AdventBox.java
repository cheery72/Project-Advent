package com.ssafy.adventsvr.entity;

import com.ssafy.adventsvr.payload.request.AdventBoxRequest;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.time.LocalDate;

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
    private boolean isActive;

    private LocalDate activeAt;

    private Integer activeDay;

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
    private AdventBox(String content, boolean isActive, LocalDate activeAt, Integer adventDay, String wrapper, Advent advent) {
        this.content = content;
        this.isActive = isActive;
        this.activeAt = activeAt;
        this.adventDay = adventDay;
        this.wrapper = wrapper;
        this.advent = advent;
    }

    public void setAdventBoxContentModify(String imageUrl){
        this.content = imageUrl;
    }

    public void setAdventBoxActiveAtModify(LocalDate endAt,Integer day, AdventBox adventBox){
        this.activeAt = endAt.minusDays(day-adventBox.getAdventDay());
    }

    public void setAdventIsActiveModify(){
        this.isActive = true;
    }

    public void setAdventActiveDayModify(LocalDate localDate, LocalDate activeAt){
        int day = activeAt.minusDays(localDate.getDayOfMonth()).getDayOfMonth();
        if(day == 31){
            day = 0;
        }
        this.activeDay = day;
    }

    public void setAdventBoxWrapperModify(String wrapper) {
        this.wrapper = wrapper;
    }
}
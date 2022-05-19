package com.ssafy.adventsvr.entity;

import com.ssafy.adventsvr.payload.request.AdventBoxRequest;
import com.ssafy.adventsvr.payload.request.AdventBoxWrapperRequest;
import lombok.*;
import javax.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Table(name = "advent_box")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class AdventBox extends BaseTimeEntity{

    @Id
    @Column(name = "advent_box_id")
    private String id;

    private String content;

    @Column(nullable = false, columnDefinition = "tinyint default 0")
    private boolean isActive;

    private LocalDate activeAt;

    private Integer activeDay;

    private Integer adventDay;

    private String wrapper;

    private String animation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "advent_id")
    private Advent advent;

    public static AdventBox adventBoxBuilder(AdventBoxRequest adventBoxRequest, Advent advent, String imageUrl, String animation){
        return AdventBox.builder()
                .id((UUID.randomUUID().toString()).replace("-",""))
                .adventDay(adventBoxRequest.getAdventDay())
                .advent(advent)
                .content(imageUrl)
                .animation(animation)
                .build();
    }

    public static AdventBox adventBoxWrapperBuilder(AdventBoxWrapperRequest adventBoxWrapperRequest, Advent advent, String imageUrl){
        return AdventBox.builder()
                .id((UUID.randomUUID().toString()).replace("-",""))
                .adventDay(adventBoxWrapperRequest.getAdventDay())
                .advent(advent)
                .wrapper(imageUrl)
                .build();
    }

    @Builder
    public AdventBox(String id, String content, boolean isActive, LocalDate activeAt, Integer activeDay, Integer adventDay, String wrapper, String animation, Advent advent) {
        this.id = id;
        this.content = content;
        this.isActive = isActive;
        this.activeAt = activeAt;
        this.activeDay = activeDay;
        this.adventDay = adventDay;
        this.wrapper = wrapper;
        this.animation = animation;
        this.advent = advent;
    }

    public void setAdventBoxContentModify(String imageUrl, String animation){
        this.content = imageUrl;
        this.animation = animation;
    }

    public void setAdventBoxActiveAtModify(LocalDate endAt,Integer day, AdventBox adventBox){
        this.activeAt = endAt.minusDays(day-adventBox.getAdventDay());
    }

    public void setAdventActiveDayModify(LocalDate localDate, LocalDate activeAt){
        int day;

        if(localDate.equals(activeAt) || activeAt.isBefore(localDate)){
            day = 0;
            this.isActive = true;
        }else{
            day = activeAt.minusDays(localDate.getDayOfMonth()).getDayOfMonth();
            this.isActive = false;
        }

        this.activeDay = day;
    }

    public void setAdventBoxWrapperModify(String wrapper) {
        this.wrapper = wrapper;
    }

}
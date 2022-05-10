package com.ssafy.adventsvr.entity.image;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.*;

@Entity
@Table(name = "background")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BackgroundImage {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "background_id")
    private Integer id;
    private String image;
    private Integer category;

    public static BackgroundImage backgroundBuilder(String image, Integer category){
        return BackgroundImage.builder()
                .image(image)
                .category(category)
                .build();
    }

    @Builder
    public BackgroundImage(String image, Integer category) {
        this.image = image;
        this.category = category;
    }
}

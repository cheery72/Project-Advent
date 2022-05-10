package com.ssafy.adventsvr.entity.image;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.*;

@Entity
@Table(name = "sticker")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StickerImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sticker_id")
    private Integer id;
    private String image;
    private Integer category;

    public static StickerImage stickerBuilder(String image, Integer category){
        return StickerImage.builder()
                .image(image)
                .category(category)
                .build();
    }

    @Builder
    public StickerImage(String image, Integer category) {
        this.image = image;
        this.category = category;
    }
}

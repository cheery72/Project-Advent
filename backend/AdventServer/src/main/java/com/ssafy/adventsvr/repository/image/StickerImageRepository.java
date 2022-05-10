package com.ssafy.adventsvr.repository.image;

import com.ssafy.adventsvr.entity.image.StickerImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StickerImageRepository extends JpaRepository<StickerImage,Integer> {

    List<StickerImage> findAllBy();
}

package com.ssafy.adventsvr.repository.image;

import com.ssafy.adventsvr.entity.image.BackgroundImage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BackgroundImageRepository extends JpaRepository<BackgroundImage,Integer> {
    List<BackgroundImage> findAllBy();
}

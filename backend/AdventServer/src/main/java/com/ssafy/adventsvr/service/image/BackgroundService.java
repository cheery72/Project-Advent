package com.ssafy.adventsvr.service.image;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.adventsvr.entity.image.Background;
import com.ssafy.adventsvr.entity.image.BackgroundImage;
import com.ssafy.adventsvr.repository.image.BackgroundImageRepository;
import com.ssafy.adventsvr.service.AwsS3Service;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.Cache;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BackgroundService {

    private final BackgroundImageRepository backgroundImageRepository;

    private final AwsS3Service awsS3Service;

    @Deprecated
    @Transactional
    public void inputImage(List<MultipartFile> files) {
        List<String> fileList = new ArrayList<>();
        awsS3Service.awsListFile(files, fileList);

        for (String image : fileList) {
            BackgroundImage backgroundImage = BackgroundImage.backgroundBuilder(image, String.valueOf(Background.heart));
            backgroundImageRepository.save(backgroundImage);
        }
    }


    @Cacheable
    public Map<String, List<String>> findImage() {
        return backgroundImageRepository.findAllBy().stream()
                .collect(Collectors.groupingByConcurrent(
                        BackgroundImage::getCategory,
                        Collectors.mapping(BackgroundImage::getImage, Collectors.toList()))
                );
    }
}

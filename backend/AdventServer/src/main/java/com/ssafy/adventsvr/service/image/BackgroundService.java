package com.ssafy.adventsvr.service.image;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.adventsvr.entity.image.BackgroundImage;
import com.ssafy.adventsvr.entity.image.StickerImage;
import com.ssafy.adventsvr.repository.image.BackgroundImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BackgroundService {

    private final BackgroundImageRepository backgroundImageRepository;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.s3.url}")
    private String url;

    private final AmazonS3 amazonS3;

    @Transactional
    public void inputImage(List<MultipartFile> files) {
        List<String> fileList = new ArrayList<>();
        AwsFile(files, fileList);

        for (String image : fileList) {
            BackgroundImage backgroundImage = BackgroundImage.backgroundBuilder(image, 7);
            backgroundImageRepository.save(backgroundImage);
        }
    }

    public Map<String,List<String>> findImage(){
        Map<String,List<String>> map = new HashMap<>();
        List<BackgroundImage> images = backgroundImageRepository.findAllBy();
        Integer check = 1;
        List<String> list = new ArrayList<>();
        String name = "gradation";

        for (BackgroundImage background:images) {
            if(!check.equals(background.getCategory())){
                map.put(name,list);
                name = isCategory(background.getCategory());
                list = new ArrayList<>();
            }

            list.add(background.getImage());
            check = background.getCategory();

            if(images.size() == background.getId()){
                map.put(name,list);
            }
        }

        return map;
    }

    public String isCategory(Integer category) {
        String name = "";
        switch(category){
            case 2: name = "flower"; break;
            case 3: name = "animalWrap"; break;
            case 4: name = "animal"; break;
            case 5: name = "birthday"; break;
            case 6: name = "tradition"; break;
            case 7: name = "heart"; break;
        }

        return name;
    }

        private List<String> AwsFile(List<MultipartFile> files, List<String> list) {
            files.forEach(file -> {
                String fileName = createFileName(file.getOriginalFilename());
                ObjectMetadata objectMetadata = new ObjectMetadata();
                objectMetadata.setContentLength(file.getSize());
                objectMetadata.setContentType(file.getContentType());

                try (InputStream inputStream = file.getInputStream()) {
                    amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                            .withCannedAcl(CannedAccessControlList.PublicRead));
                } catch (IOException e) {
                    throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
                }
                list.add(String.format(url + "/%s", fileName));
            });

            return list;
        }

        private String createFileName(String fileName) {
            return UUID.randomUUID().toString().concat(getFileExtension(fileName));
        }

        private String getFileExtension(String fileName) {
            try {
                return fileName.substring(fileName.lastIndexOf("."));
            } catch (StringIndexOutOfBoundsException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일(" + fileName + ") 입니다.");
            }
        }
    }

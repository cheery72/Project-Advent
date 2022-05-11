package com.ssafy.adventsvr.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.adventsvr.entity.Advent;
import com.ssafy.adventsvr.entity.AdventBox;
import com.ssafy.adventsvr.exception.NoSuchAdventException;
import com.ssafy.adventsvr.exception.NotAuthenticationException;
import com.ssafy.adventsvr.payload.request.AdventBoxRequest;
import com.ssafy.adventsvr.payload.request.AdventBoxWrapperRequest;
import com.ssafy.adventsvr.payload.response.*;
import com.ssafy.adventsvr.repository.AdventBoxRepository;
import com.ssafy.adventsvr.repository.AdventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import java.io.IOException;
import java.io.InputStream;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdventBoxServiceImpl implements AdventBoxService {

    private final AdventBoxRepository adventBoxRepository;
    private final AdventRepository adventRepository;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.s3.url}")
    private String url;

    private final AmazonS3 amazonS3;

    // Todo: POST box 생성
    @Transactional
    @Override
    public AdventBoxDayResponse inputBoxAdventBox(AdventBoxRequest adventBoxRequest, MultipartFile file) {
        Advent advent = adventRepository.findById(adventBoxRequest.getAdventId())
                .orElseThrow(() -> new NoSuchAdventException("요청한 게시글을 찾을 수 없습니다."));

        if (!adventBoxRequest.getUserId().equals(advent.getUserId())){
            throw new NotAuthenticationException("잘못된 유저입니다.");
        }

        if (adventBoxRequest.getAdventDay() >= 1 && advent.getDay() >= adventBoxRequest.getAdventDay()) {
            Optional<AdventBox> optionalAdventBox = adventBoxRepository
                    .findByAdventIdAndAdventDay(adventBoxRequest.getAdventId(), adventBoxRequest.getAdventDay());

            String imageUrl = null;
            if (!file.isEmpty()) {
                imageUrl = awsFile(file);
            }

            AdventBox adventBox;
            String boxId;
            // 비어 있을 경우에 같은 박스가 생성되면 안됨
            if (optionalAdventBox.isEmpty()) {
                adventBox = AdventBox.adventBoxBuilder(adventBoxRequest, advent, imageUrl, adventBoxRequest.getAnimation());
                boxId = adventBoxRepository.save(adventBox).getId();
                // 이미 생성된 박스가 있을 경우에
            } else {
                adventBox = optionalAdventBox
                        .orElseThrow(() -> new NoSuchAdventException("요청한 게시글 박스를 찾을 수 없습니다."));

                adventBox.setAdventBoxContentModify(imageUrl, adventBoxRequest.getAnimation());
                boxId = adventBox.getId();
            }

            return AdventBoxDayResponse.builder()
                    .boxId(boxId)
                    .content(adventBox.getContent())
                    .animation(adventBox.getAnimation())
                    .build();
        }

        throw new NoSuchAdventException("요청하신 요일이 1미만이거나 설정한 요일을 초과했습니다.");
    }

    // Todo: PUT box 수정
    @Transactional
    @Override
    public void modifyBoxAdventBox(String boxId, MultipartFile file) {
        Optional<AdventBox> optionalAdventBox= adventBoxRepository.findById(boxId);
        AdventBox adventBox = optionalAdventBox.orElseThrow(NoSuchElementException::new);

        // Todo: 기존 이미지 검증
        String imageUrl;
        if(!file.isEmpty()) {
            imageUrl = awsFile(file);
//            adventBox.setAdventBoxContentModify(imageUrl,isAnimation);
        }

    }

    // Todo: POST box 포장지 생성
    @Transactional
    @Override
    public AdventBoxWrapperResponse inputWrapperAdventBox(AdventBoxWrapperRequest adventBoxWrapperRequest, MultipartFile file) {
        Advent advent = adventRepository.findById(adventBoxWrapperRequest.getAdventId())
                .orElseThrow(() -> new NoSuchAdventException("요청한 게시글을 찾을 수 없습니다."));

        if(!adventBoxWrapperRequest.getUserId().equals(advent.getUserId())){
            throw new NotAuthenticationException("잘못된 유저입니다.");
        }

        if (adventBoxWrapperRequest.getAdventDay() >= 1 && advent.getDay() >= adventBoxWrapperRequest.getAdventDay()) {
            Optional<AdventBox> optionalAdventBox = adventBoxRepository
                    .findByAdventIdAndAdventDay(adventBoxWrapperRequest.getAdventId(), adventBoxWrapperRequest.getAdventDay());

            String imageUrl = !file.isEmpty() ? awsFile(file) : adventBoxWrapperRequest.getImage();

            AdventBox adventBox;
            String boxId;
            // 비어 있을 경우에 같은 박스가 생성되면 안됨
            if (optionalAdventBox.isEmpty()) {
                adventBox = AdventBox.adventBoxWrapperBuilder(adventBoxWrapperRequest, advent, imageUrl);
                boxId = adventBoxRepository.save(adventBox).getId();
            // 이미 생성된 박스가 있을 경우에
            } else {
                adventBox = optionalAdventBox
                        .orElseThrow(() -> new NoSuchAdventException("요청한 게시글 박스를 찾을 수 없습니다."));

                adventBox.setAdventBoxWrapperModify(imageUrl);

                boxId = adventBox.getId();
            }

            return AdventBoxWrapperResponse.builder()
                    .boxId(boxId)
                    .wrapper(adventBox.getWrapper())
                    .build();
        }

        throw new NoSuchAdventException("요청하신 요일이 1미만이거나 설정한 요일을 초과했습니다.");
    }
    // Todo: POST box 포장지 수정
    @Override
    public AdventBoxWrapperResponse modifyWrapperAdventBox(String boxId, AdventBoxWrapperRequest adventBoxWrapperRequest, MultipartFile file) {
        Advent advent = adventRepository.findById(adventBoxWrapperRequest.getAdventId())
                .orElseThrow(() -> new NoSuchAdventException("요청한 게시글을 찾을 수 없습니다."));

        if(!adventBoxWrapperRequest.getUserId().equals(advent.getUserId())){
            throw new NotAuthenticationException("잘못된 유저입니다.");
        }

        if (adventBoxWrapperRequest.getAdventDay() >= 1 && advent.getDay() >= adventBoxWrapperRequest.getAdventDay()) {
            AdventBox adventBox = adventBoxRepository
                    .findByAdventIdAndAdventDay(adventBoxWrapperRequest.getAdventId(), adventBoxWrapperRequest.getAdventDay())
                    .orElseThrow(() -> new NoSuchAdventException("요청한 게시글 박스를 찾을 수 없습니다."));

            String imageUrl = !file.isEmpty() ? awsFile(file) : adventBoxWrapperRequest.getImage();

            adventBox.setAdventBoxWrapperModify(imageUrl);

            return AdventBoxWrapperResponse.builder()
                    .boxId(boxId)
                    .wrapper(adventBox.getWrapper())
                    .build();
        }

        throw new NoSuchAdventException("요청하신 요일이 1미만이거나 설정한 요일을 초과했습니다.");
    }

    // Todo: GET box detail 조회
    @Override
    public AdventBoxDetailResponse findDetailAdventBox(String boxId, Integer userId) {
        AdventBox adventBox = adventBoxRepository.findById(boxId)
                .orElseThrow(() -> new NoSuchAdventException("요청한 게시글 박스를 찾을 수 없습니다."));

        Advent advent = adventRepository.findById(adventBox.getAdvent().getId())
                .orElseThrow(() -> new NoSuchAdventException("요청한 게시글을 찾을 수 없습니다."));

        if(!userId.equals(advent.getUserId())){
            throw new NotAuthenticationException("잘못된 유저입니다.");
        }

        return AdventBoxDetailResponse.builder()
                .boxId(adventBox.getId())
                .adventDay(adventBox.getAdventDay())
                .dDay(advent.getDay()-adventBox.getAdventDay())
                .content(adventBox.getContent())
                .animation(adventBox.getAnimation())
                .build();
    }

    // Todo: 받는 사람이 포장지 조회
    @Override
    public AdventBoxWrapperResponse findUrlWrapperDetailAdventBox(String boxId) {
        AdventBox adventBox = adventBoxRepository.findById(boxId)
                .orElseThrow(() -> new NoSuchAdventException("요청한 게시글 박스를 찾을 수 없습니다."));

        return AdventBoxWrapperResponse.builder()
                .boxId(boxId)
                .wrapper(adventBox.getWrapper())
                .build();
    }

    // Todo: 받는 사람이 박스 조회,
    @Override
    public AdventBoxUrlDetailResponse findUrlDetailAdventBox(String boxId) {
        AdventBox adventBox = adventBoxRepository.findById(boxId)
                .orElseThrow(() -> new NoSuchAdventException("요청한 게시글 박스를 찾을 수 없습니다."));
        Advent advent = adventRepository.findById(adventBox.getAdvent().getId())
                .orElseThrow(() -> new NoSuchAdventException("요청한 게시글을 찾을 수 없습니다."));

        return AdventBoxUrlDetailResponse.builder()
                .adventDay(adventBox.getAdventDay())
                .dDay(advent.getDay()-adventBox.getAdventDay())
                .content(adventBox.getContent())
                .animation(adventBox.getAnimation())
                .build();
    }


    // Todo: 포장지 조회
    @Override
    public AdventBoxWrapperResponse findWrapperDetailAdventBox(String boxId, Integer userId){
        AdventBox adventBox = adventBoxRepository.findById(boxId)
                .orElseThrow(() -> new NoSuchAdventException("요청한 게시글 박스를 찾을 수 없습니다."));

        Advent advent = adventRepository.findById(adventBox.getAdvent().getId())
                .orElseThrow(() -> new NoSuchAdventException("요청한 게시글을 찾을 수 없습니다."));

        if(!userId.equals(advent.getUserId())){
            throw new NotAuthenticationException("잘못된 유저입니다.");
        }

        return AdventBoxWrapperResponse.builder()
                .boxId(boxId)
                .wrapper(adventBox.getWrapper())
                .build();
    }

    // Todo: 파일 업로드
    private String awsFile(MultipartFile file) {
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

        return String.format(url +  "/%s", fileName);
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

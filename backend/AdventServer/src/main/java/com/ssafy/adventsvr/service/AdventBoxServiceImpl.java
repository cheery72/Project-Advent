package com.ssafy.adventsvr.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.adventsvr.entity.Advent;
import com.ssafy.adventsvr.entity.AdventBox;
import com.ssafy.adventsvr.exception.NoSuchAdventDayException;
import com.ssafy.adventsvr.exception.NoSuchUserException;
import com.ssafy.adventsvr.payload.request.AdventBoxRequest;
import com.ssafy.adventsvr.payload.request.AdventBoxWrapperRequest;
import com.ssafy.adventsvr.payload.response.AdventBoxDayResponse;
import com.ssafy.adventsvr.payload.response.AdventBoxWrapperResponse;
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
import java.time.LocalDate;
import java.util.List;
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
        Optional<Advent> optionalAdvent = adventRepository.findById(adventBoxRequest.getAdventId());
        Advent advent = optionalAdvent.orElseThrow(NoSuchElementException::new);
        Optional<AdventBox> optionalAdventBox = adventBoxRepository
                            .findByAdventIdAndAdventDay(adventBoxRequest.getAdventId(), adventBoxRequest.getAdventDay());

        if (!adventBoxRequest.getUserId().equals(advent.getUserId())){
            throw new NoSuchUserException("잘못된 유저입니다.");
        }

        if (adventBoxRequest.getAdventDay() >= 1 && advent.getDay() >= adventBoxRequest.getAdventDay()) {
            String imageUrl = null;

            if (!file.isEmpty()) {
                imageUrl = awsFile(file);
            }

            AdventBox adventBox;
            Integer boxId;
            // 비어 있을 경우에 같은 박스가 생성되면 안됨
            if (optionalAdventBox.isEmpty()) {
                adventBox = AdventBox.adventBoxBuilder(adventBoxRequest, advent, imageUrl);
                boxId = adventBoxRepository.save(adventBox).getId();
                // 이미 생성된 박스가 있을 경우에
            } else {
                adventBox = optionalAdventBox.orElseThrow(NoSuchElementException::new);

                adventBox.setAdventBoxContentModify(imageUrl);
                boxId = adventBox.getId();
            }

            return AdventBoxDayResponse.builder()
                    .boxId(boxId)
                    .content(adventBox.getContent())
                    .build();
        }

        throw new NoSuchAdventDayException("요청하신 요일이 1미만이거나 설정한 요일을 초과했습니다.");
    }

//    // Todo: PUT box 수정
//    @Transactional
//    @Override
//    public void modifyBoxAdventBox(Integer boxId, MultipartFile file) {
//        Optional<AdventBox> optionalAdventBox= adventBoxRepository.findById(boxId);
//        AdventBox adventBox = optionalAdventBox.orElseThrow(NoSuchElementException::new);
//
//        // Todo: 기존 이미지 검증
//        String imageUrl;
//        if(!file.isEmpty()) {
//            imageUrl = awsFile(file);
//            adventBox.setAdventBoxContentModify(imageUrl);
//        }
//
//    }

    // Todo: POST box 포장지 생성 수정
    @Transactional
    @Override
    public AdventBoxWrapperResponse modifyWrapperAdventBox(AdventBoxWrapperRequest adventBoxWrapperRequest, MultipartFile file) {
        Advent advent = adventRepository.findById(adventBoxWrapperRequest.getAdventId()).orElseThrow(NoSuchElementException::new);

        if(!adventBoxWrapperRequest.getUserId().equals(advent.getUserId())){
            throw new NoSuchUserException("잘못된 유저입니다.");
        }

        if (adventBoxWrapperRequest.getAdventDay() >= 1 && advent.getDay() >= adventBoxWrapperRequest.getAdventDay()) {
            Optional<AdventBox> optionalAdventBox = adventBoxRepository
                    .findByAdventIdAndAdventDay(adventBoxWrapperRequest.getAdventId(), adventBoxWrapperRequest.getAdventDay());

            String imageUrl = null;

            if (!file.isEmpty()) {
                imageUrl = awsFile(file);
            }

            AdventBox adventBox;
            Integer boxId;
            // 비어 있을 경우에 같은 박스가 생성되면 안됨
            if (optionalAdventBox.isEmpty()) {
                adventBox = AdventBox.adventBoxWrapperBuilder(adventBoxWrapperRequest, advent, imageUrl);
                boxId = adventBoxRepository.save(adventBox).getId();
                // 이미 생성된 박스가 있을 경우에
            } else {
                adventBox = optionalAdventBox.orElseThrow(NoSuchElementException::new);

                adventBox.setAdventBoxWrapperModify(imageUrl);

                boxId = adventBox.getId();
            }

            return AdventBoxWrapperResponse.builder()
                    .boxId(boxId)
                    .wrapper(adventBox.getWrapper())
                    .build();
        }

        throw new NoSuchAdventDayException("요청하신 요일이 1미만이거나 설정한 요일을 초과했습니다.");
    }

    // Todo: GET box detail 조회
    @Override
    public AdventBoxDayResponse findDetailAdventBox(Integer boxId, Integer userId) throws NoSuchUserException {
        Optional<AdventBox> optionalAdventBox = adventBoxRepository.findById(boxId);
        AdventBox adventBox = optionalAdventBox.orElseThrow(NoSuchElementException::new);

        Optional<Advent> optionalAdvent = adventRepository.findById(adventBox.getAdvent().getId());
        Advent advent = optionalAdvent.orElseThrow(NoSuchElementException::new);

        if(!userId.equals(advent.getUserId())){
            throw new NoSuchUserException("잘못된 유저입니다.");
        }

        return AdventBoxDayResponse.builder()
                .boxId(adventBox.getId())
                .content(adventBox.getContent())
                .build();
    }

    // Todo: 받는 사람이 박스 조회
    @Override
    public AdventBoxDayResponse findUrlDetailAdventBox(Integer boxId) {
        Optional<AdventBox> optionalAdventBox = adventBoxRepository.findById(boxId);
        AdventBox adventBox = optionalAdventBox.orElseThrow(NoSuchElementException::new);

        return AdventBoxDayResponse.builder()
                .boxId(adventBox.getId())
                .content(adventBox.getContent())
                .build();
    }

    // Todo: 받는 사람이 포장지 조회
    @Override
    public AdventBoxWrapperResponse findUrlWrapperDetailAdventBox(Integer boxId) {
        Optional<AdventBox> optionalAdventBox = adventBoxRepository.findById(boxId);
        AdventBox adventBox = optionalAdventBox.orElseThrow(NoSuchElementException::new);

        return AdventBoxWrapperResponse.builder()
                .boxId(boxId)
                .wrapper(adventBox.getWrapper())
                .build();
    }

    // Todo: 포장지 조회
    @Override
    public AdventBoxWrapperResponse findWrapperDetailAdventBox(Integer boxId, Integer userId) throws NoSuchUserException{
        Optional<AdventBox> optionalAdventBox = adventBoxRepository.findById(boxId);
        AdventBox adventBox = optionalAdventBox.orElseThrow(NoSuchElementException::new);

        Optional<Advent> optionalAdvent = adventRepository.findById(adventBox.getAdvent().getId());
        Advent advent = optionalAdvent.orElseThrow(NoSuchElementException::new);

        if(!userId.equals(advent.getUserId())){
            throw new NoSuchUserException("잘못된 유저입니다.");
        }

        return AdventBoxWrapperResponse.builder()
                .boxId(boxId)
                .wrapper(adventBox.getWrapper())
                .build();
    }

    // Todo: 크론탭
    @Override
    public void modifyDaysAdventBox() {
        List<Advent> advents = adventRepository.findAllBy();

        for (Advent advent :advents) {
            List<AdventBox> adventBoxList = adventBoxRepository.findAllByAdventId(advent.getId());
            for (AdventBox adventbox:adventBoxList) {
                LocalDate localDate = LocalDate.now();
                if(adventbox.getActiveAt() != null){
                    adventbox.setAdventIsActiveModify(adventbox.getActiveAt().equals(localDate));
                    adventbox.setAdventActiveDayModify(localDate,adventbox.getActiveAt());
                }
            }
        }
    }

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

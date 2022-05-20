package com.ssafy.adventsvr.service;

import com.ssafy.adventsvr.entity.Advent;
import com.ssafy.adventsvr.entity.AdventBox;
import com.ssafy.adventsvr.exception.NoSuchAdventException;
import com.ssafy.adventsvr.exception.NotAuthenticationException;
import com.ssafy.adventsvr.payload.dto.AdventBoxDetailDto;
import com.ssafy.adventsvr.payload.dto.AdventBoxUrlDto;
import com.ssafy.adventsvr.payload.dto.AdventBoxWrapperDetailDto;
import com.ssafy.adventsvr.payload.request.AdventBoxModifyRequest;
import com.ssafy.adventsvr.payload.request.AdventBoxRequest;
import com.ssafy.adventsvr.payload.request.AdventBoxWrapperRequest;
import com.ssafy.adventsvr.payload.response.*;
import com.ssafy.adventsvr.repository.AdventBoxRepository;
import com.ssafy.adventsvr.repository.AdventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdventBoxServiceImpl implements AdventBoxService {

    private final AdventBoxRepository adventBoxRepository;
    private final AdventRepository adventRepository;
    private final AwsS3Service awsS3Service;

    @Transactional
    @Override
    public void inputBoxAdventBox(AdventBoxRequest adventBoxRequest, MultipartFile file) {
        Advent advent = adventRepository.findById(adventBoxRequest.getAdventId())
                .orElseThrow(() -> new NoSuchAdventException("요청한 게시글을 찾을 수 없습니다."));

        userValidation(advent.getUserId(),adventBoxRequest.getUserId());

        adventDayValidation(advent.getDay(),adventBoxRequest.getAdventDay());

        Optional<AdventBox> optionalAdventBox = adventBoxRepository
                .findByAdventIdAndAdventDay(adventBoxRequest.getAdventId(), adventBoxRequest.getAdventDay());

        String imageUrl = inputAwsS3File(file);

        AdventBox adventBox;

        if (optionalAdventBox.isPresent()) {
            adventBox = optionalAdventBox
                    .orElseThrow(() -> new NoSuchAdventException("요청한 게시글 박스를 찾을 수 없습니다."));

            adventBox.setAdventBoxContentModify(imageUrl, adventBoxRequest.getAnimation());
            adventBox.setModify();
        } else {
            adventBox = AdventBox.adventBoxBuilder(adventBoxRequest, advent, imageUrl, adventBoxRequest.getAnimation());
            adventBoxRepository.save(adventBox);
            adventBox.setModify();
        }

        advent.setModify();
    }

    @Transactional
    @Override
    public void modifyBoxAdventBox(String boxId, MultipartFile file, AdventBoxModifyRequest adventBoxModifyRequest) {
        AdventBox adventBox  = adventBoxRepository.findById(boxId)
                .orElseThrow(() -> new NoSuchAdventException("요청한 게시글 박스를 찾을 수 없습니다."));

        Advent advent = adventRepository.findById(adventBox.getAdvent().getId())
                .orElseThrow(() -> new NoSuchAdventException("요청한 게시글이 없습니다."));

        userValidation(advent.getUserId(), adventBoxModifyRequest.getUserId());

        String imageUrl = inputAwsS3File(file);
        adventBox.setAdventBoxContentModify(imageUrl,adventBoxModifyRequest.getAnimation());
        adventBox.setModify();
    }

    @Transactional
    @Override
    public void inputWrapperAdventBox(AdventBoxWrapperRequest adventBoxWrapperRequest, MultipartFile file) {
        Advent advent = adventRepository.findById(adventBoxWrapperRequest.getAdventId())
                .orElseThrow(() -> new NoSuchAdventException("요청한 게시글을 찾을 수 없습니다."));

        userValidation(advent.getUserId(),adventBoxWrapperRequest.getUserId());

        adventDayValidation(advent.getDay(),adventBoxWrapperRequest.getAdventDay());

        Optional<AdventBox> optionalAdventBox = adventBoxRepository
                .findByAdventIdAndAdventDay(adventBoxWrapperRequest.getAdventId(), adventBoxWrapperRequest.getAdventDay());

        String imageUrl = inputAwsS3File(file);

        if (imageUrl == null){
            imageUrl = adventBoxWrapperRequest.getImage();
        }

        AdventBox adventBox;
        if (optionalAdventBox.isPresent()) {
            adventBox = optionalAdventBox.get();
            adventBox.setAdventBoxWrapperModify(imageUrl);
            adventBox.setModify();
        } else {
            adventBox = AdventBox.adventBoxWrapperBuilder(adventBoxWrapperRequest, advent, imageUrl);
            adventBoxRepository.save(adventBox);
            adventBox.setModify();
        }

        advent.setModify();
    }

    @Override
    public void modifyWrapperAdventBox(String boxId, AdventBoxWrapperRequest adventBoxWrapperRequest, MultipartFile file) {
        Advent advent = adventRepository.findById(adventBoxWrapperRequest.getAdventId())
                .orElseThrow(() -> new NoSuchAdventException("요청한 게시글을 찾을 수 없습니다."));

        userValidation(advent.getUserId(),adventBoxWrapperRequest.getUserId());

        adventDayValidation(advent.getDay(),adventBoxWrapperRequest.getAdventDay());

        AdventBox adventBox = adventBoxRepository
                .findByAdventIdAndAdventDay(adventBoxWrapperRequest.getAdventId(), adventBoxWrapperRequest.getAdventDay())
                .orElseThrow(() -> new NoSuchAdventException("요청한 게시글 박스를 찾을 수 없습니다."));

        String imageUrl = inputAwsS3File(file);

        if (imageUrl == null){
            imageUrl = adventBoxWrapperRequest.getImage();
        }

        advent.setModify();
        adventBox.setAdventBoxWrapperModify(imageUrl);
        adventBox.setModify();
    }

    @Override
    public AdventBoxDetailResponse findDetailAdventBox(String boxId, Integer userId) {

        AdventBoxDetailDto adventBoxDetailDto = adventBoxRepository.findDetailById(boxId);

        userValidation(adventBoxDetailDto.getUserId(),userId);

        return AdventBoxDetailResponse.builder()
                .boxId(adventBoxDetailDto.getId())
                .adventDay(adventBoxDetailDto.getAdventDay())
                .dDay(adventBoxDetailDto.getDay()-adventBoxDetailDto.getAdventDay())
                .content(adventBoxDetailDto.getContent())
                .animation(adventBoxDetailDto.getAnimation())
                .build();
    }

    @Override
    public AdventBoxWrapperResponse findUrlWrapperDetailAdventBox(String boxId) {
        AdventBox adventBox = adventBoxRepository.findById(boxId)
                .orElseThrow(() -> new NoSuchAdventException("요청한 게시글 박스를 찾을 수 없습니다."));

        return AdventBoxWrapperResponse.builder()
                .boxId(boxId)
                .wrapper(adventBox.getWrapper())
                .build();
    }

    @Override
    public AdventBoxUrlDetailResponse findUrlDetailAdventBox(String boxId) {

        AdventBoxUrlDto adventBoxUrlDto = adventBoxRepository.findUrlById(boxId);

        if(!adventBoxUrlDto.isActive()){
            throw new NoSuchAdventException("요청한 게시글 박스를 찾을 수 없습니다.");
        }

        return AdventBoxUrlDetailResponse.builder()
                .adventDay(adventBoxUrlDto.getAdventDay())
                .dDay(adventBoxUrlDto.getDay()-adventBoxUrlDto.getAdventDay())
                .content(adventBoxUrlDto.getContent())
                .animation(adventBoxUrlDto.getAnimation())
                .build();

    }

    @Override
    public AdventBoxWrapperResponse findWrapperDetailAdventBox(String boxId, Integer userId){

        AdventBoxWrapperDetailDto adventBoxWrapperDetailDto = adventBoxRepository.findWrapperAndTitleById(boxId);

        userValidation(adventBoxWrapperDetailDto.getUserId(),userId);

        return AdventBoxWrapperResponse.builder()
                .boxId(boxId)
                .wrapper(adventBoxWrapperDetailDto.getWrapper())
                .build();
    }

    private String inputAwsS3File(MultipartFile file){
        String imageUrl = null;

        if(!file.isEmpty()){
            imageUrl = awsS3Service.awsFile(file);
        }

        return imageUrl;
    }

    private void userValidation(Integer userId, Integer isUserId){
        if(!userId.equals(isUserId)) {
            throw new NotAuthenticationException("해당 게시글을 작성한 유저가 아닙니다.");
        }
    }

    private void adventDayValidation(Integer adventDay, Integer isAdventDay){
        if(isAdventDay < 1 || adventDay < isAdventDay){
            throw new NoSuchAdventException("요청하신 요일이 1미만이거나 설정한 요일을 초과했습니다.");
        }
    }

}

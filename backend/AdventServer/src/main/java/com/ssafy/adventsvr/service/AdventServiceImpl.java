package com.ssafy.adventsvr.service;

import com.ssafy.adventsvr.entity.Advent;
import com.ssafy.adventsvr.entity.AdventBox;
import com.ssafy.adventsvr.payload.request.AdventCertifyRequest;
import com.ssafy.adventsvr.payload.request.AdventDayRequest;
import com.ssafy.adventsvr.payload.request.AdventNotPasswordRequest;
import com.ssafy.adventsvr.payload.request.AdventPrivateRequest;
import com.ssafy.adventsvr.payload.response.AdventDayResponse;
import com.ssafy.adventsvr.payload.response.AdventReceiveResponse;
import com.ssafy.adventsvr.payload.response.AdventStorageResponse;
import com.ssafy.adventsvr.payload.response.AdventUrlResponse;
import com.ssafy.adventsvr.repository.AdventBoxRepository;
import com.ssafy.adventsvr.repository.AdventRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdventServiceImpl implements AdventService{

    private final AdventRepository adventRepository;
    private final AdventBoxRepository adventBoxRepository;

    // Todo: POST 1,3,7 클릭시 게시글 생성
    @Transactional
    @Override
    public AdventDayResponse inputDayAdvent(AdventDayRequest adventDayRequest) {
        Advent advent = Advent.adventBuilder(adventDayRequest);

        return AdventDayResponse.builder()
                .adventId(adventRepository.save(advent).getId())
                .build();
    }

    @Transactional
    // Todo: POST 비밀번호, 힌트, 기념일 설정 페이지 작성
    @Override
    public AdventUrlResponse modifyPrivateInfoAdvent(AdventPrivateRequest adventPrivateRequest) {
        Optional<Advent> optionalAdvent = adventRepository.findById(adventPrivateRequest.getAdventId());
        Advent advent = optionalAdvent.orElseThrow(NoSuchElementException::new);
        // 기존에 디비에 있는지 확인해야함
        String url = RandomStringUtils.randomAlphanumeric(15);
        advent.setAdventPrivateInfoModify(adventPrivateRequest,url);

        return AdventUrlResponse.builder()
                .url(url)
                .build();
    }

    // Todo: POST 비밀번호 작성시 해당 url 받는 게시글 조회
    @Override
    public AdventReceiveResponse findReceiveUrlAdvent(AdventCertifyRequest adventCertifyRequest) {
        Optional<Advent> optionalAdvent = adventRepository.findByUrl(adventCertifyRequest.getUrl());
        Advent advent = optionalAdvent.orElseThrow(NoSuchElementException::new);

        if(advent.getPassword().equals(adventCertifyRequest.getPassword())){
           Optional<List<AdventBox>> optionalAdventBoxes  =adventBoxRepository.findAllByAdventId(advent.getId());
           List<AdventBox> adventBoxList = optionalAdventBoxes.orElseThrow(NoSuchElementException::new);
           advent.setAdventIsReceivedModify();
            return AdventReceiveResponse.builder()
                    .adventId(advent.getId())
                    .recipientName(advent.getRecipientName())
                    .adventBoxList(adventBoxList)
                    .build();
        }

        return null;
    }

    @Override
    public AdventReceiveResponse findReceiveNotPasswordUrlAdvent(String url) {
        Optional<Advent> optionalAdvent = adventRepository.findByUrl(url);
        Advent advent = optionalAdvent.orElseThrow(NoSuchElementException::new);

        Optional<List<AdventBox>> optionalAdventBoxes  =adventBoxRepository.findAllByAdventId(advent.getId());
        List<AdventBox> adventBoxList = optionalAdventBoxes.orElseThrow(NoSuchElementException::new);
        advent.setAdventIsReceivedModify();

        return AdventReceiveResponse.builder()
                .adventId(advent.getId())
                .recipientName(advent.getRecipientName())
                .adventBoxList(adventBoxList)
                .build();

    }

    @Override
    public AdventReceiveResponse findAdvent(Integer adventId) {
        Optional<Advent> optionalAdvent = adventRepository.findById(adventId);
        Advent advent = optionalAdvent.orElseThrow(NoSuchElementException::new);

        Optional<List<AdventBox>> optionalAdventBoxes  =adventBoxRepository.findAllByAdventId(adventId);
        List<AdventBox> adventBoxList = optionalAdventBoxes.orElseThrow(NoSuchElementException::new);

        return AdventReceiveResponse.builder()
                .adventId(adventId)
                .recipientName(advent.getRecipientName())
                .adventBoxList(adventBoxList)
                .build();
    }


    // Todo: GET 보관함 페이지
    @Override
    public Page<AdventStorageResponse> findMyStorageAdvent(Pageable pageable, Integer userId) {
        Optional<List<Advent>> optionalAdvent = adventRepository.findAllByUserId(pageable,userId);
        List<Advent> advent = optionalAdvent.orElseThrow(NoSuchElementException::new);
        List<AdventStorageResponse> advents = AdventStorageResponse.storageBuilder(advent);

        return new PageImpl<>(advents,pageable,advent.size());
    }

    // Todo: DELETE 게시글 삭제
    @Transactional
    @Override
    public void deleteAdvent(Integer userId, Integer adventId) {
        Optional<Advent> optionalAdvent = adventRepository.findById(adventId);
        Advent advent = optionalAdvent.orElseThrow(NoSuchElementException::new);

        if(advent.getUserId().equals(userId)){
            adventRepository.deleteById(advent.getId());
        }
    }
}

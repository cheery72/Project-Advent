package com.ssafy.adventsvr.service;

import com.ssafy.adventsvr.entity.Advent;
import com.ssafy.adventsvr.payload.request.AdventDayRequest;
import com.ssafy.adventsvr.payload.request.AdventPrivateRequest;
import com.ssafy.adventsvr.payload.response.AdventDayResponse;
import com.ssafy.adventsvr.payload.response.AdventReceiveResponse;
import com.ssafy.adventsvr.payload.response.AdventStorageResponse;
import com.ssafy.adventsvr.repository.AdventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdventServiceImpl implements AdventService{

    private final AdventRepository adventRepository;

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
    public void modifyPrivateInfoAdvent(AdventPrivateRequest adventPrivateRequest) {
        Optional<Advent> optionalAdvent = adventRepository.findById(adventPrivateRequest.getAdventId());
        Advent advent = optionalAdvent.orElseThrow(NoSuchElementException::new);
        advent.setAdventPrivateInfoModify(adventPrivateRequest);

    }

    // Todo: GET 보관함 페이지
    @Override
    public Page<AdventStorageResponse> findMyStorageAdvent(Integer userId) {
        return null;
    }

    // Todo: GET 비밀번호 작성시 해당 url 받는 게시글 조회
    @Override
    public AdventReceiveResponse findReceiveUrlAdvent(String url, Integer password) {
        return null;
    }

    // Todo: DELETE 게시글 삭제
    @Override
    public Integer deleteAdvent(Integer userId, Integer id) {
        return null;

    }
}

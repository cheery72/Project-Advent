package com.ssafy.adventsvr.service;

import com.ssafy.adventsvr.entity.AdventBox;
import com.ssafy.adventsvr.payload.request.AdventBoxModifyRequest;
import com.ssafy.adventsvr.payload.request.AdventBoxRequest;
import com.ssafy.adventsvr.payload.request.AdventBoxWrapperRequest;
import com.ssafy.adventsvr.payload.response.AdventBoxDetailResponse;
import com.ssafy.adventsvr.repository.AdventBoxRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdventBoxServiceImpl implements AdventBoxService {

    private final AdventBoxRepository adventBoxRepository;


    // Todo: POST box 생성
    @Transactional
    @Override
    public Integer inputBoxAdventBox(AdventBoxRequest adventBoxRequest) {
        return null;
    }

    // Todo: PUT box 수정
    @Transactional
    @Override
    public Integer modifyBoxAdventBox(AdventBoxModifyRequest adventBoxModifyRequest) {
        return null;
    }

    // Todo: PUT box 포장지 수정
    @Transactional
    @Override
    public Integer modifyWrapperAdventBox(AdventBoxWrapperRequest adventBoxWrapperRequest) {
        return null;
    }

    // Todo: GET box detail 조회
    @Override
    public AdventBoxDetailResponse findDetailAdventBox(Integer userId, Integer adventId, Integer day) {
        return null;
    }
}

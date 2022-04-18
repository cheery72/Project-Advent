package com.ssafy.adventsvr.service;

import com.ssafy.adventsvr.payload.request.AdventBoxModifyRequest;
import com.ssafy.adventsvr.payload.request.AdventBoxRequest;
import com.ssafy.adventsvr.payload.request.AdventBoxWrapperRequest;
import com.ssafy.adventsvr.payload.response.AdventBoxDetailResponse;

public interface AdventBoxService {

    Integer inputBoxAdventBox(AdventBoxRequest adventBoxRequest);

    Integer modifyBoxAdventBox(AdventBoxModifyRequest adventBoxModifyRequest);

    Integer modifyWrapperAdventBox(AdventBoxWrapperRequest adventBoxWrapperRequest);

    AdventBoxDetailResponse findDetailAdventBox(Integer userId, Integer adventId, Integer day);
}

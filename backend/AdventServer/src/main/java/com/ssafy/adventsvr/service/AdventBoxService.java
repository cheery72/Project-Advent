package com.ssafy.adventsvr.service;

import com.ssafy.adventsvr.payload.request.AdventBoxModifyRequest;
import com.ssafy.adventsvr.payload.request.AdventBoxRequest;
import com.ssafy.adventsvr.payload.request.AdventBoxWrapperRequest;
import com.ssafy.adventsvr.payload.response.AdventBoxDayResponse;
import com.ssafy.adventsvr.payload.response.AdventBoxDetailResponse;
import org.springframework.web.multipart.MultipartFile;

public interface AdventBoxService {

    AdventBoxDayResponse inputBoxAdventBox(AdventBoxRequest adventBoxRequest, MultipartFile file);

    Integer modifyBoxAdventBox(AdventBoxModifyRequest adventBoxModifyRequest);

    Integer modifyWrapperAdventBox(AdventBoxWrapperRequest adventBoxWrapperRequest);

    AdventBoxDetailResponse findDetailAdventBox(Integer userId, Integer adventId, Integer day);
}

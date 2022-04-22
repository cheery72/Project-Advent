package com.ssafy.adventsvr.service;

import com.ssafy.adventsvr.payload.request.AdventBoxRequest;
import com.ssafy.adventsvr.payload.request.AdventBoxWrapperRequest;
import com.ssafy.adventsvr.payload.response.AdventBoxDayResponse;
import com.ssafy.adventsvr.payload.response.AdventBoxDetailResponse;
import org.springframework.web.multipart.MultipartFile;

public interface AdventBoxService {

    AdventBoxDayResponse inputBoxAdventBox(AdventBoxRequest adventBoxRequest, MultipartFile file);

    void modifyBoxAdventBox(Integer boxId, MultipartFile file);

    void modifyWrapperAdventBox(Integer boxId, MultipartFile file);

    AdventBoxDetailResponse findDetailAdventBox(Integer adventId);

    void modifyDaysAdventBox();
}

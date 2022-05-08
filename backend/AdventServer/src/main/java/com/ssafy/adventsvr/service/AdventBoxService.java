package com.ssafy.adventsvr.service;

import com.ssafy.adventsvr.payload.request.AdventBoxRequest;
import com.ssafy.adventsvr.payload.request.AdventBoxWrapperRequest;
import com.ssafy.adventsvr.payload.response.AdventBoxDayResponse;
import com.ssafy.adventsvr.payload.response.AdventBoxDetailResponse;
import com.ssafy.adventsvr.payload.response.AdventBoxWrapperResponse;
import org.springframework.web.multipart.MultipartFile;

public interface AdventBoxService {

    AdventBoxDayResponse inputBoxAdventBox(AdventBoxRequest adventBoxRequest, MultipartFile file);

    void modifyBoxAdventBox(String boxId, MultipartFile file);

    AdventBoxWrapperResponse inputWrapperAdventBox(AdventBoxWrapperRequest adventBoxWrapperRequest, MultipartFile file);

    AdventBoxWrapperResponse modifyWrapperAdventBox(String boxId,AdventBoxWrapperRequest adventBoxWrapperRequest, MultipartFile file);

    AdventBoxDayResponse findDetailAdventBox(String boxId, Integer userId);

    AdventBoxDetailResponse findUrlDetailAdventBox(String boxId);

    AdventBoxWrapperResponse findUrlWrapperDetailAdventBox(String boxId);

    AdventBoxWrapperResponse findWrapperDetailAdventBox(String boxId, Integer userId);

}

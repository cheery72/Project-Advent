package com.ssafy.adventsvr.service;

import com.ssafy.adventsvr.payload.request.AdventBoxRequest;
import com.ssafy.adventsvr.payload.request.AdventBoxWrapperRequest;
import com.ssafy.adventsvr.payload.response.*;
import org.springframework.web.multipart.MultipartFile;

public interface AdventBoxService {

    AdventBoxDayResponse inputBoxAdventBox(AdventBoxRequest adventBoxRequest, MultipartFile file);

    void modifyBoxAdventBox(String boxId, MultipartFile file);

    AdventBoxWrapperResponse inputWrapperAdventBox(AdventBoxWrapperRequest adventBoxWrapperRequest, MultipartFile file);

    AdventBoxWrapperResponse modifyWrapperAdventBox(String boxId,AdventBoxWrapperRequest adventBoxWrapperRequest, MultipartFile file);

    AdventBoxDetailResponse findDetailAdventBox(String boxId, Integer userId);

    AdventBoxWrapperResponse findUrlWrapperDetailAdventBox(String boxId);

    AdventBoxUrlDetailResponse findUrlDetailAdventBox(String boxId);

    AdventBoxWrapperResponse findWrapperDetailAdventBox(String boxId, Integer userId);

}

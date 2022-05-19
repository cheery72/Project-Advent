package com.ssafy.adventsvr.service;

import com.ssafy.adventsvr.payload.request.AdventBoxModifyRequest;
import com.ssafy.adventsvr.payload.request.AdventBoxRequest;
import com.ssafy.adventsvr.payload.request.AdventBoxWrapperRequest;
import com.ssafy.adventsvr.payload.response.*;
import org.springframework.web.multipart.MultipartFile;

public interface AdventBoxService {

    void inputBoxAdventBox(AdventBoxRequest adventBoxRequest, MultipartFile file);

    void modifyBoxAdventBox(String boxId, MultipartFile file, AdventBoxModifyRequest adventBoxModifyRequest);

    void inputWrapperAdventBox(AdventBoxWrapperRequest adventBoxWrapperRequest, MultipartFile file);

    void modifyWrapperAdventBox(String boxId,AdventBoxWrapperRequest adventBoxWrapperRequest, MultipartFile file);

    AdventBoxDetailResponse findDetailAdventBox(String boxId, Integer userId);

    AdventBoxWrapperResponse findUrlWrapperDetailAdventBox(String boxId);

    AdventBoxWrapperResponse findWrapperDetailAdventBox(String boxId, Integer userId);

    AdventBoxUrlDetailResponse findUrlDetailAdventBox(String boxId);

}

package com.ssafy.adventsvr.service;

import com.ssafy.adventsvr.payload.request.AdventDayRequest;
import com.ssafy.adventsvr.payload.request.AdventPrivateRequest;
import com.ssafy.adventsvr.payload.response.AdventDayResponse;
import com.ssafy.adventsvr.payload.response.AdventReceiveResponse;
import com.ssafy.adventsvr.payload.response.AdventStorageResponse;
import org.springframework.data.domain.Page;

public interface AdventService {

    AdventDayResponse inputDayAdvent(AdventDayRequest adventDayRequest);

    void modifyPrivateInfoAdvent(AdventPrivateRequest adventPrivateRequest);

    Page<AdventStorageResponse> findMyStorageAdvent(Integer userId);

    AdventReceiveResponse findReceiveUrlAdvent(String url, Integer password);

    Integer deleteAdvent(Integer userId, Integer id);
}

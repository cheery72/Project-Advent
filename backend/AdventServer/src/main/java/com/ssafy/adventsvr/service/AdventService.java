package com.ssafy.adventsvr.service;

import com.ssafy.adventsvr.payload.request.AdventCertifyRequest;
import com.ssafy.adventsvr.payload.request.AdventDayRequest;
import com.ssafy.adventsvr.payload.request.AdventPrivateRequest;
import com.ssafy.adventsvr.payload.response.AdventDayResponse;
import com.ssafy.adventsvr.payload.response.AdventReceiveResponse;
import com.ssafy.adventsvr.payload.response.AdventStorageResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AdventService {

    AdventDayResponse inputDayAdvent(AdventDayRequest adventDayRequest);

    void modifyPrivateInfoAdvent(AdventPrivateRequest adventPrivateRequest);

    AdventReceiveResponse findReceiveUrlAdvent(AdventCertifyRequest adventCertifyRequest);

    Page<AdventStorageResponse> findMyStorageAdvent(Pageable pageable, Integer userId);

    void deleteAdvent(Integer userId, Integer adventId);
}

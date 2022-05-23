package com.ssafy.adventsvr.service;

import com.ssafy.adventsvr.payload.request.AdventCertifyRequest;
import com.ssafy.adventsvr.payload.request.AdventDayRequest;
import com.ssafy.adventsvr.payload.request.AdventPrivateRequest;
import com.ssafy.adventsvr.payload.request.AdventRecipientModify;
import com.ssafy.adventsvr.payload.response.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AdventService {

    AdventDayResponse inputDayAdvent(AdventDayRequest adventDayRequest);

    void modifyPrivateInfoAdvent(String adventId,AdventPrivateRequest adventPrivateRequest);

    AdventUrlReceiveResponse findReceiveUrlAdvent(AdventCertifyRequest adventCertifyRequest);

    AdventUrlReceiveResponse findReceiveNotPasswordUrlAdvent(String url);

    AdventReceiveResponse findAdvent(String adventId,Integer userId);

    AdventDaysResponse findDayAdvent(String adventId);

    AdventDaysResponse findUrlDayAdvent(String url);

    AdventIsPasswordResponse findIsPasswordAdvent(String url);

    Page<AdventStorageResponse> findMyStorageAdvent(Pageable pageable, Integer userId);

    AdventBoxTitleResponse findTitleAdventBox(String url);

    void deleteAdvent(Integer userId, String adventId);

    void modifyTitleAdvent(String adventId,AdventRecipientModify adventRecipientModify);

    AdventCreationResponse findCreationAdvent(String adventId);
}

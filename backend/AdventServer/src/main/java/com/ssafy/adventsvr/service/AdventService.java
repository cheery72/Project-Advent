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

    AdventUrlResponse modifyPrivateInfoAdvent(AdventPrivateRequest adventPrivateRequest);

    AdventReceiveResponse findReceiveUrlAdvent(AdventCertifyRequest adventCertifyRequest);

    AdventReceiveResponse findReceiveNotPasswordUrlAdvent(String url);

    AdventReceiveResponse findAdvent(String adventId,Integer userId);

    Page<AdventStorageResponse> findMyStorageAdvent(Pageable pageable, Integer userId);

    void modifyTitleAdvent(AdventRecipientModify adventRecipientModify);

    void deleteAdvent(Integer userId, String adventId);
}

package com.ssafy.adventsvr.repository.querydsl;

import com.ssafy.adventsvr.payload.dto.AdventBoxDetailDto;
import com.ssafy.adventsvr.payload.dto.AdventBoxUrlDto;
import com.ssafy.adventsvr.payload.dto.AdventBoxWrapperDetailDto;

public interface AdventBoxRepositoryCustom {
    AdventBoxWrapperDetailDto findWrapperAndTitleById(String boxId);
    AdventBoxUrlDto findUrlById(String boxId);
    AdventBoxDetailDto findDetailById(String boxId);
}

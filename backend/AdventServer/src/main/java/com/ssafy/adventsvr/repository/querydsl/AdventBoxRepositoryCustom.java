package com.ssafy.adventsvr.repository.querydsl;

import com.ssafy.adventsvr.payload.dto.AdventBoxDetailDto;
import com.ssafy.adventsvr.payload.dto.AdventBoxModifyDetailDto;
import com.ssafy.adventsvr.payload.dto.AdventBoxUrlDto;
import com.ssafy.adventsvr.payload.dto.AdventBoxWrapperDetailDto;

public interface AdventBoxRepositoryCustom {
    AdventBoxWrapperDetailDto findWrapperAndTitleByUserId(String boxId, Integer userId);
    AdventBoxUrlDto findUrlByBoxId(String boxId);
    AdventBoxDetailDto findDetailByBoxIdAndUserId(String boxId, Integer userId);

}

package com.ssafy.adventsvr.repository.querydsl;

import com.ssafy.adventsvr.payload.dto.AdventBoxListModifyDto;
import com.ssafy.adventsvr.payload.dto.AdventBoxListTitleDto;

import java.util.List;

public interface AdventRepositoryCustom {
    List<AdventBoxListTitleDto> findAllByUrlOrderByAdventDayAsc(String url);
    List<AdventBoxListModifyDto> findAllByAdventIdAndUserId(String adventId, Integer userId);
}

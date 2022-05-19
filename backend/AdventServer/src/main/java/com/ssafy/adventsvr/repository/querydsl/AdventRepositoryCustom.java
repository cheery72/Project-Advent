package com.ssafy.adventsvr.repository.querydsl;

import com.ssafy.adventsvr.entity.Advent;
import com.ssafy.adventsvr.payload.dto.AdventBoxListModifyDto;
import com.ssafy.adventsvr.payload.dto.AdventBoxListTitleDto;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;

public interface AdventRepositoryCustom {
    List<AdventBoxListTitleDto> findAllByUrlOrderByAdventDayAsc(String url);
    List<AdventBoxListModifyDto> findAdventIdAllBy(String adventId);
    Long findByUserIdAndCreateAtBetween(Integer userId, LocalDateTime startDate, LocalDateTime endDate);
}

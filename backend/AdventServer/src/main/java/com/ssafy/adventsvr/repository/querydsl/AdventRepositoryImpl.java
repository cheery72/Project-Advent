package com.ssafy.adventsvr.repository.querydsl;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.adventsvr.entity.Advent;
import com.ssafy.adventsvr.entity.QAdvent;
import com.ssafy.adventsvr.entity.QAdventBox;
import com.ssafy.adventsvr.payload.dto.AdventBoxListModifyDto;
import com.ssafy.adventsvr.payload.dto.AdventBoxListTitleDto;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class AdventRepositoryImpl implements AdventRepositoryCustom {
    private static final QAdventBox qAdventBox = QAdventBox.adventBox;
    private static final QAdvent qAdvent = QAdvent.advent;

    private final JPAQueryFactory queryFactory;

    public AdventRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<AdventBoxListTitleDto> findAllByUrlOrderByAdventDayAsc(String url) {
        return queryFactory
                .select(Projections.constructor(AdventBoxListTitleDto.class,
                        qAdvent.title,
                        qAdventBox.wrapper))
                .from(qAdvent)
                .leftJoin(qAdventBox)
                .on(qAdvent.id.eq(qAdventBox.advent.id))
                .where(qAdvent.url.eq(url))
                .orderBy(qAdventBox.adventDay.asc())
                .fetch();
    }

    @Override
    public List<AdventBoxListModifyDto> findAdventIdAllBy(String adventId) {
        return queryFactory
                .select(Projections.constructor(AdventBoxListModifyDto.class,
                        qAdvent.userId,
                        qAdvent.id,
                        qAdvent.title,
                        qAdvent.day,
                        qAdvent.endAt,
                        qAdventBox.id.as("boxId"),
                        qAdventBox.activeAt,
                        qAdventBox.isActive,
                        qAdventBox.adventDay,
                        qAdventBox.activeDay,
                        qAdventBox.wrapper))
                .from(qAdvent)
                .leftJoin(qAdventBox)
                .on(qAdventBox.advent.id.eq(qAdvent.id))
                .where(qAdvent.id.eq(adventId))
                .orderBy(qAdventBox.adventDay.asc())
                .fetch();
    }

    @Override
    public Long findByUserIdAndCreateAtBetween(Integer userId, LocalDateTime startDate, LocalDateTime endDate) {
        return queryFactory
                .select(qAdvent.count())
                .from(qAdvent)
                .where(qAdvent.userId.eq(userId).and(qAdvent.createAt.between(startDate,endDate)))
                .fetchOne();
    }
}
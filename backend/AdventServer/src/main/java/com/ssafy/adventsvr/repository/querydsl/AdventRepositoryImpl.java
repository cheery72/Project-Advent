package com.ssafy.adventsvr.repository.querydsl;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.adventsvr.entity.QAdvent;
import com.ssafy.adventsvr.entity.QAdventBox;
import com.ssafy.adventsvr.payload.dto.AdventBoxListModifyDto;
import com.ssafy.adventsvr.payload.dto.AdventBoxListTitleDto;

import javax.persistence.EntityManager;
import java.util.List;

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
                .from(qAdventBox)
                .join(qAdvent)
                .on(qAdvent.id.eq(qAdventBox.advent.id))
                .where(qAdvent.url.eq(url))
                .orderBy(qAdventBox.adventDay.asc())
                .fetch();
    }

    @Override
    public List<AdventBoxListModifyDto> findAllByAdventIdAndUserId(String adventId, Integer userId) {
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
                .from(qAdventBox)
                .join(qAdvent)
                .on(qAdvent.id.eq(qAdventBox.advent.id))
                .where(qAdvent.id.eq(adventId).and(qAdvent.userId.eq(userId)))
                .orderBy(qAdventBox.adventDay.asc())
                .fetch();
    }

}

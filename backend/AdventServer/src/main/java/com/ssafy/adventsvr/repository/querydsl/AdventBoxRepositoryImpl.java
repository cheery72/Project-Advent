package com.ssafy.adventsvr.repository.querydsl;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.adventsvr.entity.QAdvent;
import com.ssafy.adventsvr.entity.QAdventBox;
import com.ssafy.adventsvr.payload.dto.AdventBoxDetailDto;
import com.ssafy.adventsvr.payload.dto.AdventBoxUrlDto;
import com.ssafy.adventsvr.payload.dto.AdventBoxWrapperDetailDto;

import javax.persistence.EntityManager;

public class AdventBoxRepositoryImpl implements AdventBoxRepositoryCustom{
    private static final QAdventBox qAdventBox = QAdventBox.adventBox;
    private static final QAdvent qAdvent = QAdvent.advent;

    private final JPAQueryFactory queryFactory;

    public AdventBoxRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public AdventBoxWrapperDetailDto findWrapperAndTitleById(String boxId) {
        return queryFactory
                .select(Projections.constructor(AdventBoxWrapperDetailDto.class,
                        qAdventBox.id,
                        qAdventBox.wrapper,
                        qAdvent.userId))
                .from(qAdvent)
                .leftJoin(qAdventBox)
                .on(qAdventBox.advent.id.eq(qAdvent.id))
                .where(qAdventBox.id.eq(boxId))
                .fetchOne();
    }

    @Override
    public AdventBoxUrlDto findUrlById(String boxId) {
        return  queryFactory
                .select(Projections.constructor(AdventBoxUrlDto.class,
                        qAdventBox.id,
                        qAdvent.day,
                        qAdventBox.content,
                        qAdventBox.isActive,
                        qAdventBox.adventDay,
                        qAdventBox.animation))
                .from(qAdventBox)
                .leftJoin(qAdvent)
                .on(qAdvent.id.eq(qAdventBox.advent.id))
                .where(qAdventBox.id.eq(boxId))
                .fetchOne();
    }

    @Override
    public AdventBoxDetailDto findDetailById(String boxId) {
        return queryFactory
                .select(Projections.constructor(AdventBoxDetailDto.class,
                        qAdventBox.id,
                        qAdventBox.adventDay,
                        qAdvent.day,
                        qAdventBox.content,
                        qAdventBox.animation,
                        qAdvent.userId))
                .from(qAdventBox)
                .leftJoin(qAdvent)
                .on(qAdvent.id.eq(qAdventBox.advent.id))
                .where(qAdventBox.id.eq(boxId))
                .fetchOne();
    }

}

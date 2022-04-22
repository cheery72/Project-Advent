//package com.ssafy.adventsvr.repository.querydsl;
//
//import com.querydsl.jpa.impl.JPAQueryFactory;
//import com.ssafy.adventsvr.entity.QAdvent;
//import com.ssafy.adventsvr.entity.QAdventBox;
//
//import javax.persistence.EntityManager;
//
//public class AdventBoxRepositoryImpl implements AdventBoxRepositoryCustom{
//    private static final QAdventBox qAdventBox = QAdventBox.adventBox;
//    private static final QAdvent qAdvent = QAdvent.advent;
//
//    private final JPAQueryFactory queryFactory;
//
//    public AdventBoxRepositoryImpl(EntityManager em) {
//        this.queryFactory = new JPAQueryFactory(em);
//    }
//}

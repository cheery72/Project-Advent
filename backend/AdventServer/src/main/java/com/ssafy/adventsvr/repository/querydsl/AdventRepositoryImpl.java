//package com.ssafy.adventsvr.repository.querydsl;
//
//import com.querydsl.jpa.impl.JPAQueryFactory;
//import com.ssafy.adventsvr.entity.AdventBox;
//import com.ssafy.adventsvr.entity.QAdvent;
//import com.ssafy.adventsvr.entity.QAdventBox;
//import javax.persistence.EntityManager;
//import java.util.List;
//
//public class AdventRepositoryImpl implements AdventRepositoryCustom {
//    private static final QAdventBox qAdventBox = QAdventBox.adventBox;
//    private static final QAdvent qAdvent = QAdvent.advent;
//
//    private final JPAQueryFactory queryFactory;
//
//    public AdventRepositoryImpl(EntityManager em) {
//        this.queryFactory = new JPAQueryFactory(em);
//    }
//
//    @Override
//    public List<AdventBox> findAllByAdventId(String adventId) {
//        return null;
//    }
//}

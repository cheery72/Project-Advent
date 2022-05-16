//package com.ssafy.adventsvr.advents;
//
//import com.querydsl.core.types.ExpressionUtils;
//import com.querydsl.core.types.Projections;
//import com.querydsl.jpa.JPAExpressions;
//import com.querydsl.jpa.impl.JPAQueryFactory;
//import com.ssafy.adventsvr.config.QuerydslConfig;
//import com.ssafy.adventsvr.entity.Advent;
//import com.ssafy.adventsvr.entity.AdventBox;
//import com.ssafy.adventsvr.entity.QAdvent;
//import com.ssafy.adventsvr.entity.QAdventBox;
//import com.ssafy.adventsvr.payload.dto.*;
//import com.ssafy.adventsvr.repository.AdventBoxRepository;
//import com.ssafy.adventsvr.repository.AdventRepository;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
//import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//
//import java.util.List;
//import java.util.UUID;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//
//@ImportAutoConfiguration(QuerydslConfig.class)
//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
//@DataJpaTest
//public class AdventRepositoryTest {
//
//    private static final QAdvent qAdvent = QAdvent.advent;
//    private static final QAdventBox qAdventBox = QAdventBox.adventBox;
//
//    @Autowired
//    private AdventRepository adventRepository;
//
//    @Autowired
//    private AdventBoxRepository adventBoxRepository;
//
//    @Autowired
//    private JPAQueryFactory queryFactory;
//
//    private final String id = (UUID.randomUUID().toString()).replace("-","");
//    private final String boxId = (UUID.randomUUID().toString()).replace("-","");
//    private final Integer userId = 1234;
//    private final String url = (UUID.randomUUID().toString()).replace("-","");
//
//    @DisplayName("게시글과 댓글을 저장한다.")
//    @Test
//    public void adventAdventBoxInput() {
//        Advent advent = Advent.builder()
//                .id(id)
//                .userId(1234)
//                .title("Advent Special Day")
//                .day(3)
//                .url(url)
//                .build();
//
//        AdventBox adventBox = AdventBox.builder()
//                .id(boxId)
//                .adventDay(1)
//                .advent(advent)
//                .content("asdf.jpg")
//                .animation("qwer.jpg")
//                .build();
//
//        AdventBox adventBox2 = AdventBox.builder()
//                .id((UUID.randomUUID().toString()).replace("-",""))
//                .adventDay(2)
//                .advent(advent)
//                .content("asdf2.jpg")
//                .animation("qwer2.jpg")
//                .build();
//
//        AdventBox adventBox3 = AdventBox.builder()
//                .id((UUID.randomUUID().toString()).replace("-",""))
//                .adventDay(3)
//                .advent(advent)
//                .content("asdf3.jpg")
//                .animation("qwer3.jpg")
//                .build();
//
//        adventRepository.save(advent);
//        adventBoxRepository.save(adventBox);
//        adventBoxRepository.save(adventBox2);
//        adventBoxRepository.save(adventBox3);
//
//    }
//
//    @DisplayName("url로 조회시 게시글과 Title, Wrapper 박스 리스트를 조회한다.")
//    @Test
//    public void adventAdventBoxListFind() {
//        adventAdventBoxInput();
//        String title = "Advent Special Day";
//        List<AdventBoxListTitleDto> adventBoxDetailDto = queryFactory
//                .select(Projections.constructor(AdventBoxListTitleDto.class,
//                                                qAdvent.title,
//                                                qAdventBox.wrapper))
//                .from(qAdventBox)
//                .join(qAdvent)
//                .on(qAdvent.id.eq(qAdventBox.advent.id))
//                .where(qAdvent.url.eq(url))
//                .orderBy(qAdventBox.adventDay.asc())
//                .fetch();
//
//        assertEquals(adventBoxDetailDto.get(0).getTitle(),title);
//
//    }
//
//    @DisplayName("보관함 페이지에서 수정을 눌렀을때 게시글과 박스 리스트를 day ASC로 조회한다.")
//    @Test
//    public void adventAdventBoxListDaySortFind(){
//        adventAdventBoxInput();
//
//        List<AdventBoxListModifyDto> adventBoxDetailDto = queryFactory
//                .select(Projections.constructor(AdventBoxListModifyDto.class,
//                                                qAdvent.userId,
//                                                qAdvent.id,
//                                                qAdvent.title,
//                                                qAdvent.day,
//                                                qAdvent.endAt,
//                                                qAdventBox.id.as("boxId"),
//                                                qAdventBox.activeAt,
//                                                qAdventBox.isActive,
//                                                qAdventBox.adventDay,
//                                                qAdventBox.activeDay,
//                                                qAdventBox.wrapper))
//                .from(qAdventBox)
//                .join(qAdvent)
//                .on(qAdvent.id.eq(qAdventBox.advent.id))
//                .where(qAdvent.id.eq(id).and(qAdvent.userId.eq(userId)))
//                .orderBy(qAdventBox.adventDay.asc())
//                .fetch();
//
//        assertEquals(adventBoxDetailDto.get(0).getId(),id);
//    }
//
////    @DisplayName("패스워드 설정 안돼있을때 게시글과 박스 리스트를 day ASC로 조회한다.")
////    @Test
////    public void adventAdventBoxListUrlDaySortFind(){
////        adventAdventBoxInput();
////
////        List<AdventUrlDto> adventBoxDetailDto = queryFactory
////                .select(Projections.constructor(AdventUrlDto.class,
////                        qAdvent.title,
////                        qAdvent.day,
////                        qAdvent.isPassword,
////                        qAdventBox.id.as("boxId"),
////                        qAdventBox.activeAt,
////                        qAdventBox.isActive,
////                        qAdventBox.adventDay,
////                        qAdventBox.activeDay,
////                        qAdventBox.wrapper))
////                .from(qAdventBox)
////                .join(qAdvent)
////                .on(qAdvent.id.eq(qAdventBox.advent.id))
////                .where(qAdvent.url.eq(url))
////                .orderBy(qAdventBox.adventDay.asc())
////                .fetch();
////
////        assertEquals(adventBoxDetailDto.get(0).getBoxId(),boxId);
////    }
//
//    @DisplayName("페이징 처리 게시글과 박스 리스트를 조회한다.")
//    @Test
//    public void PageAdventAdventBoxListFind() {
//        adventAdventBoxInput();
//
//        List<AdventBoxListStorageDto> adventBoxDetailDto = queryFactory
//                .select(Projections.constructor(AdventBoxListStorageDto.class,
//                                qAdvent.id,
//                                qAdvent.title,
//                                qAdvent.isReceived,
//                                qAdvent.endAt,
//                                qAdvent.modifiedAt,
//                                qAdvent.url,
//                                qAdvent.day,
//                                qAdvent.userId,
//                                JPAExpressions.selectFrom(qAdventBox)
//                                        .where(qAdvent.id.eq(qAdventBox.advent.id))))
////                                        .orderBy(qAdventBox.adventDay.asc())
//                .from(qAdvent)
////                .join(qAdventBox)
////                .on(qAdventBox.id.eq(advent.getId()))
//                .where(qAdvent.userId.eq(userId))
//                .fetch();
//
//        assertEquals(adventBoxDetailDto.get(0).getId(),id);
//    }
//}
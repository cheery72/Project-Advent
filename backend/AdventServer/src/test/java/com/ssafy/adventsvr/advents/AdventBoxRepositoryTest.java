//package com.ssafy.adventsvr.advents;
//
//import com.querydsl.core.types.Projections;
//import com.querydsl.jpa.impl.JPAQueryFactory;
//import com.ssafy.adventsvr.config.QuerydslConfig;
//import com.ssafy.adventsvr.entity.Advent;
//import com.ssafy.adventsvr.entity.AdventBox;
//import com.ssafy.adventsvr.entity.QAdvent;
//import com.ssafy.adventsvr.entity.QAdventBox;
//import com.ssafy.adventsvr.payload.dto.AdventBoxDetailDto;
//import com.ssafy.adventsvr.payload.dto.AdventBoxModifyDetailDto;
//import com.ssafy.adventsvr.payload.dto.AdventBoxUrlDto;
//import com.ssafy.adventsvr.payload.dto.AdventBoxWrapperDetailDto;
//import com.ssafy.adventsvr.repository.AdventBoxRepository;
//import com.ssafy.adventsvr.repository.AdventRepository;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
//import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//import java.util.UUID;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.junit.jupiter.api.Assertions.assertEquals;
//
//@ImportAutoConfiguration(QuerydslConfig.class)
//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
//@DataJpaTest
//public class AdventBoxRepositoryTest {
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
//    @DisplayName("사용자가 받는 게시글의 게시글과 단일 게시글 박스를 조회한다.")
//    @Test
//    public void adventAdventBoxUrlDetailFind() {
//        adventAdventBoxInput();
//
//        AdventBoxUrlDto adventBoxDto = queryFactory
//                .select(Projections.constructor(AdventBoxUrlDto.class,
//                        qAdventBox.id,
//                        qAdvent.day,
//                        qAdventBox.content,
//                        qAdventBox.isActive,
//                        qAdventBox.adventDay,
//                        qAdventBox.animation))
//                .from(qAdventBox)
//                .join(qAdvent)
//                .on(qAdvent.id.eq(qAdventBox.advent.id))
//                .where(qAdventBox.id.eq(boxId))
//                .fetchOne();
//
//        assertEquals(boxId,adventBoxDto.getId());
//    }
//
//    @DisplayName("사용자의 게시글 게시글과 단일 포장지 게시글 박스를 조회한다.")
//    @Test
//    public void adventAdventBoxWrapperDetailFind() {
//        adventAdventBoxInput();
//
//        AdventBoxWrapperDetailDto adventBoxDetailDto = queryFactory
//                .select(Projections.constructor(AdventBoxWrapperDetailDto.class,
//                        qAdventBox.id,
//                        qAdventBox.wrapper,
//                        qAdvent.userId))
//                .from(qAdventBox)
//                .join(qAdvent)
//                .on(qAdvent.id.eq(qAdventBox.advent.id))
//                .where(qAdventBox.id.eq(boxId).and(qAdvent.userId.eq(userId)))
//                .fetchOne();
//
//        assertEquals(boxId,adventBoxDetailDto.getId());
//    }
//
//    @DisplayName("사용자의 게시글 게시글과 단일 포장지 게시글 박스를 조회한다.")
//    @Test
//    public void adventAdventBoxDetailFind() {
//        adventAdventBoxInput();
//
//        AdventBoxDetailDto adventBoxDetailDto = queryFactory
//                .select(Projections.constructor(AdventBoxDetailDto.class,
//                        qAdventBox.id,
//                        qAdventBox.adventDay,
//                        qAdvent.day,
//                        qAdventBox.content,
//                        qAdventBox.animation,
//                        qAdvent.userId))
//                .from(qAdventBox)
//                .join(qAdvent)
//                .on(qAdvent.id.eq(qAdventBox.advent.id))
//                .where(qAdventBox.id.eq(boxId).and(qAdvent.userId.eq(userId)))
//                .fetchOne();
//
//        assertEquals(boxId,adventBoxDetailDto.getId());
//    }
//
//    @DisplayName("사용자가 포장지를 수정할때 해당 박스 조회한다.")
//    @Test
//    public void adventAdventBoxDetailModify() {
//        adventAdventBoxInput();
//
//        AdventBoxModifyDetailDto adventBoxDetailDto = queryFactory
//                .select(Projections.constructor(AdventBoxModifyDetailDto.class,
//                        qAdventBox.id,
//                        qAdvent.userId,
//                        qAdvent.day))
//                .from(qAdventBox)
//                .join(qAdvent)
//                .on(qAdvent.id.eq(qAdventBox.advent.id))
//                .where(qAdvent.id.eq(id).and(qAdventBox.id.eq(boxId)).and(qAdvent.userId.eq(userId)))
//                .fetchOne();
//
//        assertEquals(boxId,adventBoxDetailDto.getId());
//    }
//}

//package com.ssafy.adventsvr.advents;
//
//import com.querydsl.core.types.Projections;
//import com.querydsl.jpa.impl.JPAQueryFactory;
//import com.ssafy.adventsvr.entity.QAdvent;
//import com.ssafy.adventsvr.entity.QAdventBox;
//import com.ssafy.adventsvr.payload.dto.AdventBoxUserDto;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.web.servlet.MockMvc;
//
//import java.util.List;
//
//@AutoConfigureMockMvc
//@SpringBootTest
//public class AdventRepositoryTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    private static final QAdvent qAdvent = QAdvent.advent;
//    private static final QAdventBox qAdventBox = QAdventBox.adventBox;
//
//    @Autowired
//    private JPAQueryFactory queryFactory;
//
//    @DisplayName("게시글의 댓글들과 게시글의 유저 아이디를 조회한다.")
//    @Test
//    public void adventBoxSearch() {
//        String adventId = "a0cf1661aab84eae93fecf0f42399bcf";
//
//        List<AdventBoxUserDto> adventBoxList = queryFactory
//                                    .select(Projections.constructor(AdventBoxUserDto.class,qAdventBox,qAdvent.userId))
////                                    .select(qAdventBox)
//                                    .from(qAdventBox)
//                                    .join(qAdvent)
//                                    .on(qAdvent.id.eq(adventId))
//                                    .fetch();
//
//    }
//}

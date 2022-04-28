//package com.ssafy.adventsvr.advents;
//
//import com.ssafy.adventsvr.entity.Advent;
//import com.ssafy.adventsvr.payload.request.AdventDayRequest;
//import com.ssafy.adventsvr.payload.request.AdventPrivateRequest;
//import com.ssafy.adventsvr.payload.response.AdventDayResponse;
//import com.ssafy.adventsvr.repository.AdventRepository;
//import com.ssafy.adventsvr.service.AdventService;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.TestPropertySource;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import org.springframework.test.context.ActiveProfiles;
//
//@SpringBootTest
////@ActiveProfiles("test")
//public class AdventServiceTest {
//
//    @Autowired
//    private AdventRepository adventRepository;
//
//    @Autowired
//    private AdventService adventService;
//
//    @Test
//    public void inputAdventTest(){
//        //given
//        AdventDayRequest adventDayRequest = new AdventDayRequest(1,1);
//
//        // when
//        AdventDayResponse adventDayResponse = adventService.inputDayAdvent(adventDayRequest);
//        Advent advent = adventRepository.findById(adventDayResponse.getAdventId()).get();
//
//        // Then
//        assertEquals(adventDayRequest.getUserId(),advent.getUserId());
//        assertEquals(adventDayRequest.getDay(),advent.getDay());
//    }
//
//    @Test
//    public void modifyPrivateInfoAdvent(){
//        // Given
//        AdventPrivateRequest adventPrivateRequest = new AdventPrivateRequest(
//                1,1,"2022.04.19",
//                "2022.04.19","기념일","2022-04-19");
//
//        // When
//        adventService.modifyPrivateInfoAdvent(adventPrivateRequest);
//        Advent advent = adventRepository.findById(adventPrivateRequest.getAdventId()).get();
//
//        assertEquals(adventPrivateRequest.getPassword(),advent.getPassword());
//
//        // Then
//    }
//}

//package com.ssafy.adventsvr.advents;
//
//import com.ssafy.adventsvr.entity.Advent;
//import com.ssafy.adventsvr.entity.AdventBox;
//import com.ssafy.adventsvr.exception.NoSuchAdventException;
//import com.ssafy.adventsvr.exception.NotAuthenticationException;
//import com.ssafy.adventsvr.payload.dto.AdventBoxListModifyDto;
//import com.ssafy.adventsvr.payload.request.AdventCertifyRequest;
//import com.ssafy.adventsvr.payload.request.AdventDayRequest;
//import com.ssafy.adventsvr.payload.request.AdventPrivateRequest;
//import com.ssafy.adventsvr.payload.response.AdventDayResponse;
//import com.ssafy.adventsvr.repository.AdventBoxRepository;
//import com.ssafy.adventsvr.repository.AdventRepository;
//import com.ssafy.adventsvr.service.AdventService;
//import com.ssafy.adventsvr.service.AdventServiceImpl;
//import org.assertj.core.api.Assertions;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//
//import java.time.LocalDate;
//import java.time.LocalDateTime;
//import java.time.format.DateTimeFormatter;
//import java.util.List;
//import java.util.Optional;
//import java.util.UUID;
//
//import static org.assertj.core.api.Assertions.*;
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.BDDMockito.given;
//import static org.mockito.Mockito.*;
//
//@ExtendWith(MockitoExtension.class)
//public class AdventServiceTest {
//
//    @Mock
//    private AdventRepository adventRepository;
//
//    @Mock
//    private AdventBoxRepository adventBoxRepository;
//
//    @InjectMocks
//    private AdventServiceImpl adventService;
//
//
//    private final String id = (UUID.randomUUID().toString()).replace("-","");
//    private final String boxId = (UUID.randomUUID().toString()).replace("-","");
//    private final Integer userId = 1;
//    private final String title = "Advent Special Day";
//    private final Integer day = 3;
//
//    @DisplayName("상자 생성")
//    @Test
//    public void inputAdvent(){
//        // Given
//        AdventDayRequest adventDayRequest = new AdventDayRequest(1,7);
//
//        Advent advent = Advent.builder()
//                .id(id)
//                .userId(1)
//                .title(title)
//                .day(day)
//                .build();
//
//        // When
//        given(adventRepository.save(any()))
//                .willReturn(advent);
//        given(adventRepository.findById(id))
//                .willReturn(Optional.ofNullable(advent));
//
//        // Then
//        String savedId = adventRepository.save(advent).getId();
//        Advent findAdvent = adventRepository.findById(savedId).get();
//
//        assertEquals(id,findAdvent.getId());
//    }
//
//    @DisplayName("비밀번호, 힌트, 기념일 작성")
//    @Test
//    public void modifyPrivateInfoAdvent(){
//        Advent advent = Advent.builder()
//                .id(id)
//                .userId(1)
//                .title(title)
//                .day(day)
//                .build();
//
//        given(adventRepository.save(any()))
//                .willReturn(advent);
//
//        given(adventRepository.findById(id))
//                .willReturn(Optional.ofNullable(advent));
//
//        String savedId = adventRepository.save(advent).getId();
//        Advent findAdvent = adventRepository.findById(savedId).get();
//
//        // Given
//        AdventPrivateRequest adventPrivateRequest = new AdventPrivateRequest(
//                1,"1","1","기념일","2022-05-23");
//
//        // When
//        userValidation(advent.getUserId(),adventPrivateRequest.getUserId());
//
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//        LocalDate localDate = LocalDate.parse(adventPrivateRequest.getEndAt(), formatter);
//
//        LocalDate today = LocalDate.now();
//
//        LocalDate minusDays = localDate.minusDays(advent.getDay());
//        if (minusDays.isAfter(today) || minusDays.equals(today)) {
//            String url = (UUID.randomUUID().toString()).replace("-", "");
//            advent.setAdventPrivateInfoModify(adventPrivateRequest, url, localDate);
//
//            List<AdventBox> adventBoxList = adventBoxRepository.findAllByAdventId(advent.getId());
//            adventBoxList.forEach(
//                    adventbox -> adventbox.setAdventBoxActiveAtModify(localDate, advent.getDay(), adventbox));
//        } else {
//            throw new NoSuchAdventException("내일 기준으로 요일을 +day 해주세요.");
//        }
//
//        // Then
//        assertEquals(findAdvent.getUserId(),userId);
//        assertEquals(findAdvent.getId(),id);
//    }
//
//    @DisplayName("비밀번호 인증 게시글 조회 성공")
//    @Test
//    public void successFindReceiveUrl(){
//        modifyPrivateInfoAdvent();
//        Advent findAdvent = adventRepository.findById(id).get();
//
//        AdventBox adventBox = AdventBox.builder()
//                .id(boxId)
//                .adventDay(1)
//                .advent(findAdvent)
//                .content("asdf.jpg")
//                .animation("qwer.jpg")
//                .build();
//
//        AdventBox adventBox2 = AdventBox.builder()
//                .id((UUID.randomUUID().toString()).replace("-",""))
//                .adventDay(2)
//                .advent(findAdvent)
//                .content("asdf2.jpg")
//                .animation("qwer2.jpg")
//                .build();
//
//        AdventBox adventBox3 = AdventBox.builder()
//                .id((UUID.randomUUID().toString()).replace("-",""))
//                .adventDay(3)
//                .advent(findAdvent)
//                .content("asdf3.jpg")
//                .animation("qwer3.jpg")
//                .build();
//
//        given(adventBoxRepository.save(any()))
//                .willReturn(adventBox);
//        given(adventBoxRepository.save(any()))
//                .willReturn(adventBox2);
//        given(adventBoxRepository.save(any()))
//                .willReturn(adventBox3);
//
//        AdventCertifyRequest adventCertifyRequest = new AdventCertifyRequest(findAdvent.getUrl(),"1");
//        LocalDate today = LocalDate.now();
//
//        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//        if (encoder.matches(adventCertifyRequest.getPassword(), findAdvent.getPassword())) {
//            given(adventBoxRepository.findAllByAdventIdOrderByAdventDayAsc(any()))
//                    .willReturn(List.of(adventBox,adventBox2,adventBox3));
//
//            List<AdventBox> findAdventBoxList = adventBoxRepository.findAllByAdventIdOrderByAdventDayAsc(findAdvent.getId());
//
//            if (findAdvent.getReceivedAt() == null) {
//                findAdvent.setReceivedAt(LocalDateTime.now());
//                findAdvent.setReceived(true);
//            }
//
//            when(adventRepository.save(any(Advent.class))).thenReturn(findAdvent);
//
//            if (findAdvent.getRenewalAt() == null || !today.equals(findAdvent.getRenewalAt())) {
//                // 날짜됐을시 활성화
//                findAdventBoxList.forEach(adventbox -> {
//                    if (adventbox.getActiveAt() != null) {
//                        findAdvent.setRenewalAt(today);
//
//
//                        // 현재날짜 이전이거나 같은 경우에는 활성화 시켜야함
//                        LocalDate activeAt = adventbox.getActiveAt();
//                        int day;
//
//                        if(today.equals(activeAt) || activeAt.isBefore(today)){
//                            day = 0;
//                            adventbox.setActive(true);
//                        }else{
//                            day = activeAt.minusDays(today.getDayOfMonth()).getDayOfMonth();
//                            adventbox.setActive(false);
//                        }
//                        adventbox.setAdventDay(day);
//
//                        when(adventBoxRepository.save(any(AdventBox.class))).thenReturn(adventbox);
//                    }
//                });
//            }
//        }
//
//        assertEquals(findAdvent.getAdventBoxes().get(0).getActiveAt(),today);
//        assertEquals(findAdvent.getRenewalAt(),today);
//    }
//
//    @DisplayName("비밀번호 인증 게시글 조회 실패")
//    @Test
//    public void failFindReceiveUrl() {
//        modifyPrivateInfoAdvent();
//        Advent findAdvent = adventRepository.findById(id).get();
//
//        AdventBox adventBox = AdventBox.builder()
//                .id(boxId)
//                .adventDay(1)
//                .advent(findAdvent)
//                .content("asdf.jpg")
//                .animation("qwer.jpg")
//                .build();
//
//        AdventBox adventBox2 = AdventBox.builder()
//                .id((UUID.randomUUID().toString()).replace("-",""))
//                .adventDay(2)
//                .advent(findAdvent)
//                .content("asdf2.jpg")
//                .animation("qwer2.jpg")
//                .build();
//
//        AdventBox adventBox3 = AdventBox.builder()
//                .id((UUID.randomUUID().toString()).replace("-",""))
//                .adventDay(3)
//                .advent(findAdvent)
//                .content("asdf3.jpg")
//                .animation("qwer3.jpg")
//                .build();
//
//        given(adventBoxRepository.save(any()))
//                .willReturn(adventBox);
//        given(adventBoxRepository.save(any()))
//                .willReturn(adventBox2);
//        given(adventBoxRepository.save(any()))
//                .willReturn(adventBox3);
//
//        AdventCertifyRequest adventCertifyRequest = new AdventCertifyRequest(findAdvent.getUrl(),"1");
//        LocalDate today = LocalDate.now();
//
//        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//        if (encoder.matches(adventCertifyRequest.getPassword(), findAdvent.getPassword())) {
//            given(adventBoxRepository.findAllByAdventIdOrderByAdventDayAsc(any()))
//                    .willReturn(List.of(adventBox,adventBox2,adventBox3));
//
//            List<AdventBox> findAdventBoxList = adventBoxRepository.findAllByAdventIdOrderByAdventDayAsc(findAdvent.getId());
//
//            if (findAdvent.getReceivedAt() == null) {
//                verify(findAdvent).setReceivedAt(LocalDateTime.now());
//                verify(findAdvent).setReceived(true);
//            }
//
//            if (findAdvent.getRenewalAt() == null || !today.equals(findAdvent.getRenewalAt())) {
//                // 날짜됐을시 활성화
//                findAdventBoxList.forEach(adventbox -> {
//                    if (adventbox.getActiveAt() != null) {
//                        verify(findAdvent).setRenewalAt(today);
//
//                        // 현재날짜 이전이거나 같은 경우에는 활성화 시켜야함
//                        LocalDate activeAt = adventbox.getActiveAt();
//                        int day;
//
//                        if(today.equals(activeAt) || activeAt.isBefore(today)){
//                            day = 0;
//                            verify(adventbox).setActive(true);
//                        }else{
//                            day = activeAt.minusDays(today.getDayOfMonth()).getDayOfMonth();
//                            verify(adventbox).setActive(false);
//                        }
//                        verify(adventbox).setAdventDay(day);
//                    }
//                });
//            }
//        }
//
//        assertEquals(findAdvent.getAdventBoxes().get(0).getActiveAt(),today);
//        assertEquals(findAdvent.getRenewalAt(),today);
//    }
//
//    @DisplayName("보관함페이지에서 수정 눌렀을 경우")
//    @Test
//    public void findAdvent(){
//        modifyPrivateInfoAdvent();
//        Advent findAdvent = adventRepository.findById(id).get();
//
//        AdventBox adventBox = AdventBox.builder()
//                .id(boxId)
//                .adventDay(1)
//                .advent(findAdvent)
//                .content("asdf.jpg")
//                .animation("qwer.jpg")
//                .build();
//
//        AdventBox adventBox2 = AdventBox.builder()
//                .id((UUID.randomUUID().toString()).replace("-",""))
//                .adventDay(2)
//                .advent(findAdvent)
//                .content("asdf2.jpg")
//                .animation("qwer2.jpg")
//                .build();
//
//        AdventBox adventBox3 = AdventBox.builder()
//                .id((UUID.randomUUID().toString()).replace("-",""))
//                .adventDay(3)
//                .advent(findAdvent)
//                .content("asdf3.jpg")
//                .animation("qwer3.jpg")
//                .build();
//
//        given(adventBoxRepository.save(any()))
//                .willReturn(adventBox);
//        given(adventBoxRepository.save(any()))
//                .willReturn(adventBox2);
//        given(adventBoxRepository.save(any()))
//                .willReturn(adventBox3);
//        AdventBoxListModifyDto adventBoxListModifyDto = mock(AdventBoxListModifyDto.class);
//
////        given(adventRepository.findAllByAdventIdAndUserId(id,userId))
////                .willReturn(adventBoxListModifyDto,AdventBoxListModifyDto.class);
//    }
//
//    private void userValidation(Integer userId, Integer isUserId){
//        if(!userId.equals(isUserId)) {
//            throw new NotAuthenticationException("해당 게시글을 작성한 유저가 아닙니다.");
//        }
//    }
//}
//
//

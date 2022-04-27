package com.ssafy.adventsvr.service;

import com.ssafy.adventsvr.client.UserServiceClient;
import com.ssafy.adventsvr.entity.Advent;
import com.ssafy.adventsvr.entity.AdventBox;
import com.ssafy.adventsvr.payload.request.AdventCertifyRequest;
import com.ssafy.adventsvr.payload.request.AdventDayRequest;
import com.ssafy.adventsvr.payload.request.AdventPrivateRequest;
import com.ssafy.adventsvr.payload.request.AdventRecipientModify;
import com.ssafy.adventsvr.payload.response.*;
import com.ssafy.adventsvr.repository.AdventBoxRepository;
import com.ssafy.adventsvr.repository.AdventRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdventServiceImpl implements AdventService{

    private final AdventRepository adventRepository;
    private final AdventBoxRepository adventBoxRepository;
    private final UserServiceClient userServiceClient;

    // Todo: POST 1,3,7 클릭시 게시글 생성 - ok
    @Transactional
    @Override
    public AdventDayResponse inputDayAdvent(AdventDayRequest adventDayRequest) {
        Advent advent = Advent.adventBuilder(adventDayRequest);
//        Integer userAdventCount = userServiceClient.userAdventCountFind(adventDayRequest.getUserId(), LocalDate.now());
//
//        if(10 < userAdventCount){
//            return null;
//        }

        return AdventDayResponse.builder()
                .adventId(adventRepository.save(advent).getId())
                .build();
    }

    @Transactional
    // Todo: POST 비밀번호, 힌트, 기념일 설정 페이지 작성
    @Override
    public AdventUrlResponse modifyPrivateInfoAdvent(AdventPrivateRequest adventPrivateRequest) {
        Optional<Advent> optionalAdvent = adventRepository.findById(adventPrivateRequest.getAdventId());
        Advent advent = optionalAdvent.orElseThrow(NoSuchElementException::new);

        // 시간 포맷팅
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");
        LocalDate localDate = LocalDate.parse(adventPrivateRequest.getEndAt(),formatter);

        // 설정한 기간이랑 현재 시간이랑 데이의 차이가 설정한 박스 데이 이상이어야함
        // 현재 날짜
        LocalDate presentDate = LocalDate.now();
        // 설정한 날짜 - 어드벤트 데이
        // 오늘날짜는 포함 안함 포함하려면 minusDays(advent.getDay-1)
        LocalDate minusDays = localDate.minusDays(advent.getDay());
        if(!minusDays.isBefore(presentDate)){
            String url = (UUID.randomUUID().toString()).replace("-","");
            advent.setAdventPrivateInfoModify(adventPrivateRequest,url,localDate);

            Optional<List<AdventBox>> optionalAdventBoxes  = adventBoxRepository.findAllByAdventId(advent.getId());
            List<AdventBox> adventBoxList = optionalAdventBoxes.orElseThrow(NoSuchElementException::new);
            for (AdventBox adventbox :adventBoxList) {
                adventbox.setAdventBoxActiveAtModify(localDate,advent.getDay(),adventbox);
            }

            return AdventUrlResponse.builder()
                    .url(url)
                    .build();
        }else{
            return null;
        }
    }

    // Todo: POST 비밀번호 인증시 게시글 조회 - ok
    @Transactional
    @Override
    public AdventReceiveResponse findReceiveUrlAdvent(AdventCertifyRequest adventCertifyRequest) {
        Optional<Advent> optionalAdvent = adventRepository.findByUrl(adventCertifyRequest.getUrl());
        Advent advent = optionalAdvent.orElseThrow(NoSuchElementException::new);

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        if(encoder.matches(adventCertifyRequest.getPassword(),advent.getPassword())){
           Optional<List<AdventBox>> optionalAdventBoxes  = adventBoxRepository.findAllByAdventId(advent.getId());
           List<AdventBox> adventBoxList = optionalAdventBoxes.orElseThrow(NoSuchElementException::new);
           advent.setAdventIsReceivedModify();

           // 날짜됐을시 활성화
            for (AdventBox adventbox:adventBoxList) {
                LocalDate localDate = LocalDate.now();
                if(adventbox.getActiveAt() != null){
                    // 현재날짜 이전이거나 같은 경우에는 활성화 시켜야함
                    if(adventbox.getActiveAt().isBefore(localDate) || adventbox.getActiveAt().equals(localDate)){
                        adventbox.setAdventIsActiveModify(true);
                    }else{
                        adventbox.setAdventIsActiveModify(false);
                    }
                    adventbox.setAdventActiveDayModify(localDate,adventbox.getActiveAt());
                }
            }

            return AdventReceiveResponse.builder()
                    .adventId(advent.getId())
                    .title(advent.getTitle())
                    .adventBoxList(AdventBoxListResponse.adventBoxListBuilder(adventBoxList))
                    .build();
        }

        return null;
    }

    // Todo: 패스워드 설정 안돼있을시에 - ok
    @Transactional
    @Override
    public AdventReceiveResponse findReceiveNotPasswordUrlAdvent(String url) {
        Optional<Advent> optionalAdvent = adventRepository.findByUrl(url);
        Advent advent = optionalAdvent.orElseThrow(NoSuchElementException::new);

        Optional<List<AdventBox>> optionalAdventBoxes  =adventBoxRepository.findAllByAdventId(advent.getId());
        List<AdventBox> adventBoxList = optionalAdventBoxes.orElseThrow(NoSuchElementException::new);
        advent.setAdventIsReceivedModify();

        // 날짜됐을시 활성화
        for (AdventBox adventbox:adventBoxList) {
            LocalDate localDate = LocalDate.now();
            if(adventbox.getActiveAt() != null){
                if(adventbox.getActiveAt().isBefore(localDate) || adventbox.getActiveAt().equals(localDate)){
                    adventbox.setAdventIsActiveModify(true);
                }else{
                    adventbox.setAdventIsActiveModify(false);
                }
                adventbox.setAdventActiveDayModify(localDate,adventbox.getActiveAt());
            }
        }

        return AdventReceiveResponse.builder()
                .adventId(advent.getId())
                .title(advent.getTitle())
                .adventBoxList(AdventBoxListResponse.adventBoxListBuilder(adventBoxList))
                .build();

    }

    // Todo: 보관함 페이지에서 수정 눌렀을때 조회 - ok
    @Override
    public AdventReceiveResponse findAdvent(String adventId) {
        Optional<Advent> optionalAdvent = adventRepository.findById(adventId);
        Advent advent = optionalAdvent.orElseThrow(NoSuchElementException::new);

        Optional<List<AdventBox>> optionalAdventBoxes = adventBoxRepository.findAllByAdventId(adventId);
        List<AdventBox> adventBoxList = optionalAdventBoxes.orElseThrow(NoSuchElementException::new);
        List<AdventBoxListResponse> adventBoxListResponse = AdventBoxListResponse.adventBoxListBuilder(adventBoxList);

        return AdventReceiveResponse.builder()
                .adventId(adventId)
                .title(advent.getTitle())
                .adventBoxList(adventBoxListResponse)
                .build();
    }

    // Todo: GET 보관함 페이지 - ok
    @Override
    public Page<AdventStorageResponse> findMyStorageAdvent(Pageable pageable, Integer userId) {
        Optional<List<Advent>> optionalAdvent = adventRepository.findAllByUserId(pageable,userId);
        List<Advent> advent = optionalAdvent.orElseThrow(NoSuchElementException::new);
        List<AdventStorageResponse> advents = AdventStorageResponse.storageBuilder(advent);

        return new PageImpl<>(advents,pageable,advent.size());
    }

    // Todo: GET 포장지 조회
    @Transactional
    @Override
    public void modifyTitleAdvent(AdventRecipientModify adventRecipientModify) {
        Optional<Advent> optionalAdvent = adventRepository.findById(adventRecipientModify.getAdventId());
        Advent advent = optionalAdvent.orElseThrow(NoSuchElementException::new);
        advent.setAdventTitleModify(adventRecipientModify.getTitle());
    }

    // Todo: DELETE 게시글 삭제 - no
    @Transactional
    @Override
    public void deleteAdvent(Integer userId, String adventId) {
        Optional<Advent> optionalAdvent = adventRepository.findById(adventId);
        Advent advent = optionalAdvent.orElseThrow(NoSuchElementException::new);

        if(advent.getUserId().equals(userId)){
            adventRepository.deleteById(advent.getId());
        }
    }
}

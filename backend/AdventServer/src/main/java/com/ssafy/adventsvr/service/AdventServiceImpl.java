package com.ssafy.adventsvr.service;

import com.ssafy.adventsvr.client.UserServiceClient;
import com.ssafy.adventsvr.entity.Advent;
import com.ssafy.adventsvr.entity.AdventBox;
import com.ssafy.adventsvr.exception.NoDayAdventException;
import com.ssafy.adventsvr.exception.NoSuchPasswordException;
import com.ssafy.adventsvr.exception.NoSuchUserException;
import com.ssafy.adventsvr.payload.request.AdventCertifyRequest;
import com.ssafy.adventsvr.payload.request.AdventDayRequest;
import com.ssafy.adventsvr.payload.request.AdventPrivateRequest;
import com.ssafy.adventsvr.payload.request.AdventRecipientModify;
import com.ssafy.adventsvr.payload.response.*;
import com.ssafy.adventsvr.repository.AdventBoxRepository;
import com.ssafy.adventsvr.repository.AdventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdventServiceImpl implements AdventService {

    private final AdventRepository adventRepository;
    private final AdventBoxRepository adventBoxRepository;
    private final UserServiceClient userServiceClient;

    // Todo: POST 1,3,7 클릭시 게시글 생성 - ok
    @Transactional
    @Override
    public AdventDayResponse inputDayAdvent(AdventDayRequest adventDayRequest) {
        Advent advent = Advent.adventBuilder(adventDayRequest);

//        Integer userAdventCount = userServiceClient.userAdventCountFind(adventDayRequest.getUserId(), LocalDate.now());

//        if (10 >= userAdventCount) {
//        }
        
        return AdventDayResponse.builder()
                .adventId(adventRepository.save(advent).getId())
                .build();

//        throw new NoWriteAdventException("오늘 게시글 작성 수가 초과되었습니다.");
    }

    @Transactional
    // Todo: POST 비밀번호, 힌트, 기념일 설정 페이지 작성
    @Override
    public void modifyPrivateInfoAdvent(String adventId,AdventPrivateRequest adventPrivateRequest) {
        Optional<Advent> optionalAdvent = adventRepository.findById(adventId);
        Advent advent = optionalAdvent.orElseThrow(NoSuchElementException::new);

        // 시간 포맷팅
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(adventPrivateRequest.getEndAt(), formatter);

        // 설정한 기간이랑 현재 시간이랑 데이의 차이가 설정한 박스 데이 이상이어야함
        // 현재 날짜
        LocalDate presentDate = LocalDate.now();
        // 설정한 날짜 - 어드벤트 데이
        // 오늘날짜는 포함 안함 포함하려면 minusDays(advent.getDay-1)
        LocalDate minusDays = localDate.minusDays(advent.getDay());
        if (minusDays.isAfter(presentDate) || minusDays.equals(presentDate)) {
            String url = (UUID.randomUUID().toString()).replace("-", "");
            advent.setAdventPrivateInfoModify(adventPrivateRequest, url, localDate);

            List<AdventBox> adventBoxList = adventBoxRepository.findAllByAdventId(advent.getId());
            adventBoxList.forEach(adventbox -> adventbox.setAdventBoxActiveAtModify(localDate, advent.getDay(), adventbox));
        }else{

            throw new NoDayAdventException("내일 기준으로 요일을 +day 해주세요.");
        }

    }

    // Todo: POST 비밀번호 인증시 게시글 조회 - ok
    @Transactional
    @Override
    public AdventUrlReceiveResponse findReceiveUrlAdvent(AdventCertifyRequest adventCertifyRequest) {
        Optional<Advent> optionalAdvent = adventRepository.findByUrl(adventCertifyRequest.getUrl());
        Advent advent = optionalAdvent.orElseThrow(NoSuchElementException::new);

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        if (encoder.matches(adventCertifyRequest.getPassword(), advent.getPassword())) {
            List<AdventBox> adventBoxList = adventBoxRepository.findAllByAdventId(advent.getId());
            advent.setAdventIsReceivedModify();

            // 날짜됐을시 활성화
            adventBoxList.forEach(adventbox -> {
                LocalDate localDate = LocalDate.now();
                if (adventbox.getActiveAt() != null) {
                    // 현재날짜 이전이거나 같은 경우에는 활성화 시켜야함
                    adventbox.setAdventIsActiveModify(adventbox.getActiveAt().isBefore(localDate) || adventbox.getActiveAt().equals(localDate));
                    adventbox.setAdventActiveDayModify(localDate, adventbox.getActiveAt());
                }
            });

            return AdventUrlReceiveResponse.builder()
                    .title(advent.getTitle())
                    .adventBoxList(AdventBoxListResponse.adventBoxListBuilder(adventBoxList))
                    .build();
        }

        throw new NoSuchPasswordException("설정하신 패스워드와 다릅니다.");
    }

    // Todo: 패스워드 설정 안돼있을시에 - ok
    @Transactional
    @Override
    public AdventUrlReceiveResponse findReceiveNotPasswordUrlAdvent(String url) {
        Optional<Advent> optionalAdvent = adventRepository.findByUrl(url);
        Advent advent = optionalAdvent.orElseThrow(NoSuchElementException::new);

        List<AdventBox> adventBoxList = adventBoxRepository.findAllByAdventId(advent.getId());
        advent.setAdventIsReceivedModify();

        // 날짜됐을시 활성화
        adventBoxList.forEach(adventbox -> {
            LocalDate localDate = LocalDate.now();
            if (adventbox.getActiveAt() != null) {
                adventbox.setAdventIsActiveModify(adventbox.getActiveAt().isBefore(localDate) || adventbox.getActiveAt().equals(localDate));
                adventbox.setAdventActiveDayModify(localDate, adventbox.getActiveAt());
            }
        });

        return AdventUrlReceiveResponse.builder()
                .title(advent.getTitle())
                .adventBoxList(AdventBoxListResponse.adventBoxListBuilder(adventBoxList))
                .build();

    }

    // Todo: 보관함 페이지에서 수정 눌렀을때 조회 - ok
    @Override
    public AdventReceiveResponse findAdvent(String adventId, Integer userId) {
        Optional<Advent> optionalAdvent = adventRepository.findById(adventId);
        Advent advent = optionalAdvent.orElseThrow(NoSuchElementException::new);

        if (advent.getUserId().equals(userId)) {
            List<AdventBox> adventBoxList = adventBoxRepository.findAllByAdventId(adventId);
            List<AdventBoxListResponse> adventBoxListResponse = AdventBoxListResponse.adventBoxListBuilder(adventBoxList);

            return AdventReceiveResponse.builder()
                    .adventId(adventId)
                    .title(advent.getTitle())
                    .day(advent.getDay())
                    .adventBoxList(adventBoxListResponse)
                    .build();
        }

        throw new NoSuchUserException("잘못된 유저입니다.");

    }

    @Override
    public AdventDaysResponse findDayAdvent(String adventId) {
        Optional<Advent> optionalAdvent = adventRepository.findById(adventId);
        Advent advent = optionalAdvent.orElseThrow(NoSuchElementException::new);

        return AdventDaysResponse.builder()
                .day(advent.getDay())
                .build();
    }

    @Override
    public AdventDaysResponse findUrlDayAdvent(String url) {
        Optional<Advent> optionalAdvent = adventRepository.findByUrl(url);
        Advent advent = optionalAdvent.orElseThrow(NoSuchElementException::new);

        return AdventDaysResponse.builder()
                .day(advent.getDay())
                .build();

    }

    // Todo: GET 보관함 페이지 - ok
    @Override
    public Page<AdventStorageResponse> findMyStorageAdvent(Pageable pageable, Integer userId) {
        List<Advent> advent = adventRepository.findAllByUserId(userId);

        List<Advent> pageAdvent = adventRepository.findPageAllByUserId(pageable, userId);

        List<AdventStorageResponse> advents = AdventStorageResponse.storageBuilder(pageAdvent);

        return new PageImpl<>(advents, pageable, advent.size());
    }

    // Todo: 제목 수정
    @Transactional
    @Override
    public void modifyTitleAdvent(String adventId,AdventRecipientModify adventRecipientModify) {
        Optional<Advent> optionalAdvent = adventRepository.findById(adventId);
        Advent advent = optionalAdvent.orElseThrow(NoSuchElementException::new);
        advent.setAdventTitleModify(adventRecipientModify.getTitle());
    }

    // Todo: DELETE 게시글 삭제 - no
    @Transactional
    @Override
    public void deleteAdvent(Integer userId, String adventId) {
        Optional<Advent> optionalAdvent = adventRepository.findById(adventId);
        Advent advent = optionalAdvent.orElseThrow(NoSuchElementException::new);

        if (advent.getUserId().equals(userId)) {
            adventRepository.deleteById(advent.getId());
        }else{
            throw new NoSuchUserException("잘못된 유저입니다.");
        }
    }
}

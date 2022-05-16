package com.ssafy.adventsvr.service;

import com.ssafy.adventsvr.entity.Advent;
import com.ssafy.adventsvr.entity.AdventBox;
import com.ssafy.adventsvr.exception.NoSuchAdventException;
import com.ssafy.adventsvr.exception.NotAuthenticationException;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdventServiceImpl implements AdventService {

    private final AdventRepository adventRepository;
    private final AdventBoxRepository adventBoxRepository;
//    private final UserServiceClient userServiceClient;

    // Todo: POST 1,3,7 클릭시 게시글 생성 - ok
    @Transactional
    @Override
    public AdventDayResponse inputDayAdvent(AdventDayRequest adventDayRequest) {
        Advent advent = Advent.adventBuilder(adventDayRequest);

//        Integer userAdventCount = userServiceClient.userAdventCountFind(adventDayRequest.getUserId());

//        if (10 >= userAdventCount) {
//            return AdventDayResponse.builder()
//                    .adventId(adventRepository.save(advent).getId())
//                    .build();
//        }
        return AdventDayResponse.builder()
                .adventId(adventRepository.save(advent).getId())
                .build();

//        throw new NoSuchAdventException("오늘 게시글 작성 수가 초과되었습니다.");
    }

    // Todo: POST 비밀번호, 힌트, 기념일 설정 페이지 작성
    @Transactional
    @Override
    public void modifyPrivateInfoAdvent(String adventId, AdventPrivateRequest adventPrivateRequest) {
        Advent advent = adventRepository.findById(adventId)
                .orElseThrow(() -> new NoSuchAdventException("요청한 게시글을 찾을 수 없습니다."));

        if (adventPrivateRequest.getUserId().equals(advent.getUserId())) {
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
            } else {
                throw new NoSuchAdventException("내일 기준으로 요일을 +day 해주세요.");
            }
        } else {
            throw new NotAuthenticationException("잘못된 유저 요청입니다.");
        }

    }

    // Todo: POST 비밀번호 인증시 게시글 조회 - ok
    @Transactional
    @Override
    public AdventUrlReceiveResponse findReceiveUrlAdvent(AdventCertifyRequest adventCertifyRequest) {
        Advent advent = adventRepository.findByUrl(adventCertifyRequest.getUrl())
                .orElseThrow(() -> new NoSuchAdventException("요청한 게시글을 찾을 수 없습니다."));

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        if (encoder.matches(adventCertifyRequest.getPassword(), advent.getPassword())) {
            List<AdventBox> adventBoxList = adventBoxRepository.findAllByAdventIdOrderByAdventDayAsc(advent.getId());
            advent.setAdventIsReceivedModify();

            // 날짜됐을시 활성화
            adventBoxList.forEach(adventbox -> {
                LocalDate localDate = LocalDate.now();
                if (adventbox.getActiveAt() != null) {
                    // 현재날짜 이전이거나 같은 경우에는 활성화 시켜야함
                    adventbox.setAdventActiveDayModify(localDate, adventbox.getActiveAt());
                }
            });

            return AdventUrlReceiveResponse.builder()
                    .title(advent.getTitle())
                    .day(advent.getDay())
                    .adventBoxList(AdventBoxListResponse.adventBoxListBuilder(adventBoxList))
                    .build();
        }

        throw new NotAuthenticationException("설정하신 패스워드와 다릅니다.");
    }

    // Todo: 패스워드 설정 안돼있을시에 - ok
    @Transactional
    @Override
    public AdventUrlReceiveResponse findReceiveNotPasswordUrlAdvent(String url) {
        Advent advent = adventRepository.findByUrl(url)
                .orElseThrow(() -> new NoSuchAdventException("요청한 게시글을 찾을 수 없습니다."));

        if(advent.isPassword()){
            throw new NotAuthenticationException("요청한 비밀번호와 다릅니다.");
        }

        List<AdventBox> adventBoxList = adventBoxRepository.findAllByAdventIdOrderByAdventDayAsc(advent.getId());
        advent.setAdventIsReceivedModify();

        // 날짜됐을시 활성화
        adventBoxList.forEach(adventbox -> {
            LocalDate localDate = LocalDate.now();
            if (adventbox.getActiveAt() != null) {
                adventbox.setAdventActiveDayModify(localDate, adventbox.getActiveAt());
            }
        });

        return AdventUrlReceiveResponse.builder()
                .title(advent.getTitle())
                .day(advent.getDay())
                .adventBoxList(AdventBoxListResponse.adventBoxListBuilder(adventBoxList))
                .build();

    }

    // Todo: 보관함 페이지에서 수정 눌렀을때 조회 - ok
    @Override
    public AdventReceiveResponse findAdvent(String adventId, Integer userId) {
        Advent advent = adventRepository.findById(adventId)
                .orElseThrow(() -> new NoSuchAdventException("요청한 게시글을 찾을 수 없습니다."));

        if (advent.getUserId().equals(userId)) {
            List<AdventBox> adventBoxList = adventBoxRepository.findAllByAdventIdOrderByAdventDayAsc(adventId);
            List<AdventBoxListResponse> adventBoxListResponse = AdventBoxListResponse.adventBoxListBuilder(adventBoxList);

            return AdventReceiveResponse.builder()
                    .adventId(adventId)
                    .title(advent.getTitle())
                    .endAt(advent.getEndAt())
                    .day(advent.getDay())
                    .adventBoxList(adventBoxListResponse)
                    .build();
        }

        throw new NotAuthenticationException("잘못된 유저입니다.");
    }

    @Override
    public AdventDaysResponse findDayAdvent(String adventId) {
        Advent advent = adventRepository.findById(adventId)
                .orElseThrow(() -> new NoSuchAdventException("요청한 게시글을 찾을 수 없습니다."));

        return AdventDaysResponse.builder()
                .day(advent.getDay())
                .build();
    }

    @Override
    public AdventDaysResponse findUrlDayAdvent(String url) {
        Advent advent = adventRepository.findByUrl(url)
                .orElseThrow(() -> new NoSuchAdventException("요청한 게시글을 찾을 수 없습니다."));

        return AdventDaysResponse.builder()
                .day(advent.getDay())
                .build();

    }

    @Override
    public AdventIsPasswordResponse findIsPasswordAdvent(String url) {
        Advent advent = adventRepository.findByUrl(url)
                .orElseThrow(() -> new NoSuchAdventException("요청한 게시글을 찾을 수 없습니다."));

        return AdventIsPasswordResponse.builder()
                .isPassword(advent.isPassword())
                .day(advent.getDay())
                .passwordHint(advent.getPasswordHint())
                .build();
    }

    // Todo: GET 보관함 페이지 - ok
    @Override
    public Page<AdventStorageResponse> findMyStorageAdvent(Pageable pageable, Integer userId) {
        List<Advent> advents = adventRepository.findAllByUserId(userId);

        List<Advent> pageAdvent = adventRepository.findPageAllByUserId(pageable, userId);
        List<AdventCreatedResponse> createList = new ArrayList<>();

        for (Advent advent: pageAdvent) {
            List<AdventBox> adventBoxs = adventBoxRepository.findAllByAdventIdOrderByAdventDayAsc(advent.getId());
            Integer unCreateBox = 0, unContentBox = 0;
            List<Integer> unCreateBoxList = new ArrayList<>();
            List<Integer> unContentBoxList = new ArrayList<>();
            boolean[] isCreate = new boolean[advent.getDay()+1];

            if (adventBoxs.size() != advent.getDay()) {
                for (AdventBox adventBox : adventBoxs) {
                    isCreate[adventBox.getAdventDay()] = true;
                }

                for (int i=1; i< isCreate.length; i++) {
                    if(!isCreate[i]){
                        unCreateBoxList.add(i);
                        unCreateBox++;
                    }
                }
            }

            for (AdventBox adventBox : adventBoxs) {
                if(adventBox.getContent() == null) {
                    unContentBoxList.add(adventBox.getAdventDay());
                    unContentBox++;
                }
            }

            String wrapper = null;
            if(!adventBoxs.isEmpty()){
                wrapper = adventBoxs.get(0).getWrapper();
            }

            AdventCreatedResponse adventCreatedResponse = AdventCreatedResponse
                                                        .createdBuilder(advent,unCreateBox,unCreateBoxList,
                                                        unContentBox,unContentBoxList,wrapper);
            createList.add(adventCreatedResponse);
        }

        List<AdventStorageResponse> adventList = AdventStorageResponse.storageBuilder(createList);

        return new PageImpl<>(adventList, pageable, advents.size());
    }

    // Todo: 제목 수정
    @Transactional
    @Override
    public void modifyTitleAdvent(String adventId,AdventRecipientModify adventRecipientModify) {
        Advent advent = adventRepository.findById(adventId)
                .orElseThrow(() -> new NoSuchAdventException("요청한 게시글을 찾을 수 없습니다."));

        advent.setAdventTitleModify(adventRecipientModify.getTitle());
    }

    // Todo: DELETE 게시글 삭제 - ok
    @Transactional
    @Override
    public void deleteAdvent(Integer userId, String adventId) {
        Advent advent = adventRepository.findById(adventId)
                .orElseThrow(() -> new NoSuchAdventException("요청한 게시글을 찾을 수 없습니다."));

        if (advent.getUserId().equals(userId)) {
            adventRepository.deleteById(advent.getId());
        }else{
            throw new NotAuthenticationException("잘못된 유저입니다.");
        }
    }

    // Todo: 크론탭
    @Transactional
    @Override
    public void modifyDaysAdventBox() {
        List<Advent> advents = adventRepository.findAllBy();

        for (Advent advent :advents) {
            List<AdventBox> adventBoxList = adventBoxRepository.findAllByAdventId(advent.getId());
            for (AdventBox adventbox:adventBoxList) {
                LocalDate localDate = LocalDate.now();
                if(adventbox.getActiveAt() != null){
                    adventbox.setAdventActiveDayModify(localDate,adventbox.getActiveAt());
                }
            }
        }
    }

    @Override
    public AdventBoxTitleResponse findTitleAdventBox(String url) {
        Advent advent = adventRepository.findByUrl(url)
                .orElseThrow(() -> new NoSuchAdventException("요청한 게시글을 찾을 수 없습니다."));
        List<AdventBox> adventBox = adventBoxRepository.findAllByAdventIdOrderByAdventDayAsc(advent.getId());

        String wrapper = null;
        if(!adventBox.isEmpty()){
            wrapper = adventBox.get(0).getWrapper();
        }

        return AdventBoxTitleResponse.builder()
                .title(advent.getTitle())
                .wrapper(wrapper)
                .build();
    }

}

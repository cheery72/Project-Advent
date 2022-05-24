package com.ssafy.adventsvr.service;

import com.ssafy.adventsvr.entity.Advent;
import com.ssafy.adventsvr.entity.AdventBox;
import com.ssafy.adventsvr.exception.NoSuchAdventException;
import com.ssafy.adventsvr.exception.NotAuthenticationException;
import com.ssafy.adventsvr.payload.dto.AdventBoxListModifyDto;
import com.ssafy.adventsvr.payload.dto.AdventBoxListTitleDto;
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
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdventServiceImpl implements AdventService {

    private final AdventRepository adventRepository;
    private final AdventBoxRepository adventBoxRepository;

    @Transactional
    @Override
    public AdventDayResponse inputDayAdvent(AdventDayRequest adventDayRequest) {
        Advent advent = Advent.adventBuilder(adventDayRequest);

        Long todayCount = adventRepository
                .findByUserIdAndCreateAtBetween(adventDayRequest.getUserId(),
                LocalDate.now().atTime(0, 0,0),
                LocalDate.now().atTime(23, 59,59));

        if (30 >= todayCount) {
            advent.setModify();
            return AdventDayResponse.builder()
                    .adventId(adventRepository.save(advent).getId())
                    .build();
        }

        throw new NoSuchAdventException("오늘 게시글 작성 수가 초과되었습니다.");
    }

    @Transactional
    @Override
    public void modifyPrivateInfoAdvent(String adventId, AdventPrivateRequest adventPrivateRequest) {
        Advent advent = adventRepository.findById(adventId)
                .orElseThrow(() -> new NoSuchAdventException("요청한 게시글을 찾을 수 없습니다."));

        userValidation(advent.getUserId(),adventPrivateRequest.getUserId());

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate endAt = LocalDate.parse(adventPrivateRequest.getEndAt(), formatter);

        LocalDate today = LocalDate.now();

        LocalDate minusDays = endAt.minusDays(advent.getDay());

        if (minusDays.isAfter(today) || minusDays.equals(today)) {
            String url = (UUID.randomUUID().toString()).replace("-", "");
            advent.setAdventPrivateInfoModify(adventPrivateRequest, url, endAt);

            List<AdventBox> adventBoxList = adventBoxRepository.findAllByAdventId(advent.getId());

            for (AdventBox adventbox : adventBoxList) {
                adventbox.setAdventBoxActiveAtModify(endAt, advent.getDay(), adventbox);
                adventbox.setModify();
            }

            advent.setModify();
        } else {
            throw new NoSuchAdventException("내일 기준으로 요일을 +day 해주세요.");
        }

    }

    @Transactional
    @Override
    public AdventUrlReceiveResponse findReceiveUrlAdvent(AdventCertifyRequest adventCertifyRequest) {
        Advent advent = adventRepository.findByUrl(adventCertifyRequest.getUrl())
                .orElseThrow(() -> new NoSuchAdventException("요청한 게시글을 찾을 수 없습니다."));

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        if (encoder.matches(adventCertifyRequest.getPassword(), advent.getPassword())) {
            List<AdventBox> adventBoxList = adventBoxRepository.findAllByAdventIdOrderByAdventDayAsc(advent.getId());

            LocalDate today = LocalDate.now();

            if(advent.getReceivedAt() == null) {
                advent.setAdventIsReceivedModify();
            }

            if(advent.getRenewalAt() == null || !today.equals(advent.getRenewalAt())) {
                advent.setAdventRenewalAtModify(today);
                adventBoxList.stream()
                        .filter(adventbox -> adventbox.getActiveAt() != null)
                        .forEachOrdered(adventbox ->
                    adventbox.setAdventActiveDayModify(today, adventbox.getActiveAt()));
            }

            return AdventUrlReceiveResponse.builder()
                    .title(advent.getTitle())
                    .day(advent.getDay())
                    .adventBoxList(AdventBoxListResponse.adventBoxAuthListBuilder(adventBoxList))
                    .build();
        }

        throw new NotAuthenticationException("설정하신 패스워드와 다릅니다.");
    }

    @Transactional
    @Override
    public AdventUrlReceiveResponse findReceiveNotPasswordUrlAdvent(String url) {
        Advent advent = adventRepository.findByUrl(url)
                .orElseThrow(() -> new NoSuchAdventException("요청한 게시글을 찾을 수 없습니다."));

        if(advent.isPassword()){
            throw new NotAuthenticationException("요청한 비밀번호와 다릅니다.");
        }

        List<AdventBox> adventBoxList = adventBoxRepository.findAllByAdventIdOrderByAdventDayAsc(advent.getId());
        LocalDate today = LocalDate.now();

        if(advent.getReceivedAt() == null){
            advent.setAdventIsReceivedModify();
        }

        if(advent.getRenewalAt() == null || !today.equals(advent.getRenewalAt())) {
            advent.setAdventRenewalAtModify(today);
            adventBoxList.stream()
                    .filter(adventbox -> adventbox.getActiveAt() != null)
                    .forEachOrdered(adventbox ->
                adventbox.setAdventActiveDayModify(today, adventbox.getActiveAt()));
        }

        return AdventUrlReceiveResponse.builder()
                .title(advent.getTitle())
                .day(advent.getDay())
                .adventBoxList(AdventBoxListResponse.adventBoxAuthListBuilder(adventBoxList))
                .build();

    }

    @Override
    public AdventReceiveResponse findAdvent(String adventId, Integer userId) {
        List<AdventBoxListModifyDto> adventBoxList = adventRepository.findAdventIdAllBy(adventId);

        userValidation(adventBoxList.get(0).getUserId(),userId);

        List<AdventBoxListResponse> adventBoxListResponse = AdventBoxListResponse.adventBoxListBuilder(adventBoxList);

        return AdventReceiveResponse.builder()
                .adventId(adventBoxList.get(0).getId())
                .title(adventBoxList.get(0).getTitle())
                .day(adventBoxList.get(0).getDay())
                .endAt(adventBoxList.get(0).getEndAt())
                .adventBoxList(adventBoxListResponse)
                .build();

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

    @Override
    public Page<AdventStorageResponse> findMyStorageAdvent(Pageable pageable, Integer userId) {
        List<Advent> advents = adventRepository.findAllByUserId(userId);

        List<Advent> pageAdvent = adventRepository.findPageAllByUserId(pageable, userId);
        List<AdventCreatedResponse> createList = new ArrayList<>();

        for (Advent advent : pageAdvent) {
            List<AdventBox> adventBoxs = adventBoxRepository.findAllByAdventIdOrderByAdventDayAsc(advent.getId());
            Integer unCreateBox = 0, unContentBox = 0;
            List<Integer> unCreateBoxList = new ArrayList<>();
            List<Integer> unContentBoxList = new ArrayList<>();
            boolean[] isCreate = new boolean[advent.getDay() + 1];

            if (adventBoxs.size() != advent.getDay()) {
                adventBoxs.forEach(adventBox -> isCreate[adventBox.getAdventDay()] = true);

                for (int i = 1; i < isCreate.length; i++) {
                    if (!isCreate[i]) {
                        unCreateBoxList.add(i);
                        unCreateBox++;
                    }
                }
            }

            for (AdventBox adventBox : adventBoxs) {
                if (adventBox.getContent() == null) {
                    unContentBoxList.add(adventBox.getAdventDay());
                    unContentBox++;
                }
            }

            String wrapper = null;
            if (!adventBoxs.isEmpty()) {
                wrapper = adventBoxs.get(0).getWrapper();
            }

            AdventCreatedResponse adventCreatedResponse = AdventCreatedResponse
                    .createdBuilder(advent, unCreateBox, unCreateBoxList,
                            unContentBox, unContentBoxList, wrapper);
            createList.add(adventCreatedResponse);
        }

        List<AdventStorageResponse> adventList = AdventStorageResponse.storageBuilder(createList);

        return new PageImpl<>(adventList, pageable, advents.size());
    }

    @Override
    public AdventBoxTitleResponse findTitleAdventBox(String url) {
        List<AdventBoxListTitleDto> adventBoxListTitleDtos = adventRepository.findAllByUrlOrderByAdventDayAsc(url);

        String wrapper = null;
        if(!adventBoxListTitleDtos.isEmpty()){
            wrapper = adventBoxListTitleDtos.get(0).getWrapper();
        }

        return AdventBoxTitleResponse.builder()
                .title(adventBoxListTitleDtos.get(0).getTitle())
                .wrapper(wrapper)
                .build();
    }

    @Transactional
    @Override
    public void deleteAdvent(Integer userId, String adventId) {
        Advent advent = adventRepository.findById(adventId)
                .orElseThrow(() -> new NoSuchAdventException("요청한 게시글을 찾을 수 없습니다."));

        userValidation(advent.getUserId(),userId);

        adventRepository.deleteById(advent.getId());

    }

    @Transactional
    @Override
    public void modifyTitleAdvent(String adventId,AdventRecipientModify adventRecipientModify) {
        Advent advent = adventRepository.findById(adventId)
                .orElseThrow(() -> new NoSuchAdventException("요청한 게시글을 찾을 수 없습니다."));

        advent.setAdventTitleModify(adventRecipientModify.getTitle());
        advent.setModify();
    }

    @Override
    public AdventCreationResponse findCreationAdvent(String adventId) {
        Advent advent = adventRepository.findById(adventId)
                .orElseThrow(() -> new NoSuchAdventException("요청한 게시글을 찾을 수 없습니다."));

        List<AdventBox> adventBoxs = adventBoxRepository.findAllByAdventIdOrderByAdventDayAsc(advent.getId());

        Integer unCreateBox = 0, unContentBox = 0;
        List<Integer> unCreateBoxList = new ArrayList<>();
        List<Integer> unContentBoxList = new ArrayList<>();
        boolean[] isCreate = new boolean[advent.getDay() + 1];

        if (adventBoxs.size() != advent.getDay()) {
            adventBoxs.forEach(adventBox -> isCreate[adventBox.getAdventDay()] = true);

            for (int i = 1; i < isCreate.length; i++) {
                if (!isCreate[i]) {
                    unCreateBoxList.add(i);
                    unCreateBox++;
                }
            }
        }

        for (AdventBox adventBox : adventBoxs) {
            if (adventBox.getContent() == null) {
                unContentBoxList.add(adventBox.getAdventDay());
                unContentBox++;
            }
        }

        return AdventCreationResponse
                .creationBuilder(unCreateBox, unCreateBoxList, unContentBox, unContentBoxList);
    }


    private void userValidation(Integer userId, Integer isUserId){
        if(!userId.equals(isUserId)) {
            throw new NotAuthenticationException("해당 게시글을 작성한 유저가 아닙니다.");
        }
    }

}

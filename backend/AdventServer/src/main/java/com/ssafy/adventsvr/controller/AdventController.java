package com.ssafy.adventsvr.controller;

import com.ssafy.adventsvr.payload.request.AdventCertifyRequest;
import com.ssafy.adventsvr.payload.request.AdventDayRequest;
import com.ssafy.adventsvr.payload.request.AdventPrivateRequest;
import com.ssafy.adventsvr.payload.request.AdventRecipientModify;
import com.ssafy.adventsvr.payload.response.*;
import com.ssafy.adventsvr.service.AdventService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/advents")
public class AdventController {

    private final AdventService adventService;

    @ApiOperation(value = "1,3,7 선물 생성", notes = "선물 생성")
    @PostMapping
    public ResponseEntity<AdventDayResponse> adventDayInput(@RequestBody @Valid AdventDayRequest adventDayRequest){
        log.info("adventInput");

        if(ObjectUtils.isEmpty(adventDayRequest)){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(adventService.inputDayAdvent(adventDayRequest));
    }

    @ApiOperation(value = "password 및 기간 설정", notes = "패스워드, 힌트, 기간 설정")
    @PatchMapping("/{adventId}/days")
    public ResponseEntity<Object> adventPrivateInfoModify(@PathVariable String adventId
                                                                    ,@RequestBody @Valid AdventPrivateRequest adventPrivateRequest) {
        log.info("adventPrivateInfoModify");

        if ((!"".equals(adventPrivateRequest.getPassword()) && !"".equals(adventPrivateRequest.getPasswordVal()) &&
                !adventPrivateRequest.getPasswordVal().equals(adventPrivateRequest.getPassword()))) {
            return ResponseEntity.badRequest().build();
        }

        if (ObjectUtils.isEmpty(adventPrivateRequest)) {
            return ResponseEntity.notFound().build();
        }
        adventService.modifyPrivateInfoAdvent(adventId,adventPrivateRequest);

        return ResponseEntity.noContent().build();
    }

    @ApiOperation(value = "타이틀 제목 설정", notes = "타이틀 제목 설정")
    @PatchMapping("/{adventId}/recipients")
    public ResponseEntity<Object> adventTitleModify(@PathVariable String adventId
                                                    ,@RequestBody AdventRecipientModify adventRecipientModify){
        log.info("adventRecipientModify");

        if (ObjectUtils.isEmpty(adventRecipientModify)) {
            return ResponseEntity.notFound().build();
        }

        adventService.modifyTitleAdvent(adventId,adventRecipientModify);
        return ResponseEntity.noContent().build();
    }

    @ApiOperation(value = "password 없이 url 조회", notes = "패스워드 없이 조회")
    @GetMapping("/{url}")
    public ResponseEntity<AdventReceiveResponse> adventNotPasswordFind(@PathVariable(value = "url") String url){
        log.info("adventNotPasswordFind");

        return ResponseEntity
                .ok(adventService.findReceiveNotPasswordUrlAdvent(url));
    }

    @ApiOperation(value = "어드벤트 day 조회", notes = "어드벤트 day 조회")
    @GetMapping("/{adventId}/days")
    public ResponseEntity<AdventDaysResponse> adventDayFind(@PathVariable String adventId){
        log.info("adventDayFind");

        return ResponseEntity
                .ok(adventService.findDayAdvent(adventId));
    }

    @ApiOperation(value = "어드벤트 조회", notes = "보관함 페이지에서 수정 눌렀을시에 조회")
    @GetMapping("/{adventId}/{userId}/advent")
    public ResponseEntity<AdventReceiveResponse> adventFind(@PathVariable(value = "adventId") String adventId,
                                                            @PathVariable(value = "userId") Integer userId){
        log.info("adventFind");

        return ResponseEntity
                .ok(adventService.findAdvent(adventId,userId));
    }

    @ApiOperation(value = "패스워드 인증", notes = "패스워드 있을시 인증 성공시 선물 페이지 조회")
    @PostMapping("/auths")
    public ResponseEntity<AdventReceiveResponse> adventReceiveUrlFind(@RequestBody @Valid AdventCertifyRequest adventCertifyRequest){
        log.info("adventUrlFind");

        if (ObjectUtils.isEmpty(adventCertifyRequest)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(adventService.findReceiveUrlAdvent(adventCertifyRequest));
    }

    @ApiOperation(value = "보관함 페이지", notes = "해당 유저 보관함 페이지")
    @GetMapping("/{userId}/storages")
    public ResponseEntity<Page<AdventStorageResponse>> adventMyStorageFind(@PageableDefault(size = 6)
                                                                        @SortDefault.SortDefaults({
                                                                        @SortDefault(sort = "isReceived"),
                                                                        @SortDefault(sort = "endAt",direction = Sort.Direction.ASC),
                                                                        @SortDefault(sort = "modifiedAt", direction = Sort.Direction.DESC)
                                                                        })
                                                                             Pageable pageable,
                                                                         @PathVariable("userId") Integer userId){
        log.info("adventMyStorageFind");

        return ResponseEntity
                .ok(adventService.findMyStorageAdvent(pageable,userId));
    }

    @ApiOperation(value = "선물 삭제", notes = "해당 유저 선물 삭제")
    @DeleteMapping("/{adventId}/{userId}")
    public ResponseEntity<Object> adventDelete(@PathVariable(value = "adventId") String adventId,
                                               @PathVariable(value = "userId") Integer userId){
        log.info("adventDelete");

        adventService.deleteAdvent(userId, adventId);

        return ResponseEntity.noContent().build();
    }
}

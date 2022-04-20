package com.ssafy.adventsvr.controller;

import com.ssafy.adventsvr.payload.request.AdventCertifyRequest;
import com.ssafy.adventsvr.payload.request.AdventDayRequest;
import com.ssafy.adventsvr.payload.request.AdventPrivateRequest;
import com.ssafy.adventsvr.payload.response.AdventDayResponse;
import com.ssafy.adventsvr.payload.response.AdventReceiveResponse;
import com.ssafy.adventsvr.payload.response.AdventStorageResponse;
import com.ssafy.adventsvr.payload.response.AdventUrlResponse;
import com.ssafy.adventsvr.service.AdventService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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
    @PutMapping("/days")
    public ResponseEntity<AdventUrlResponse> adventPrivateInfoModify(@RequestBody @Valid AdventPrivateRequest adventPrivateRequest) {
        log.info("adventPrivateInfoModify");

        if(!adventPrivateRequest.getPasswordVal().equals(adventPrivateRequest.getPassword())){
            return ResponseEntity.badRequest().build();
        }

        if (ObjectUtils.isEmpty(adventPrivateRequest)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(adventService.modifyPrivateInfoAdvent(adventPrivateRequest));
    }

    @ApiOperation(value = "password 없이 조회", notes = "패스워드 없이 조회")
    @GetMapping("/{url}")
    public ResponseEntity<AdventReceiveResponse> adventNotPasswordFind(@PathVariable(value = "url") String url){
        log.info("adventNotPasswordFind");

        return ResponseEntity
                .ok()
                .body(adventService.findReceiveNotPasswordUrlAdvent(url));
    }

    @ApiOperation(value = "어드벤트 조회", notes = "보관함 페이지에서 수정 눌렀을시에 조회")
    @GetMapping("/{adventId}/advent")
    public ResponseEntity<AdventReceiveResponse> adventFind(@PathVariable(value = "adventId") Integer adventId){
        log.info("adventFind");

        return ResponseEntity
                .ok()
                .body(adventService.findAdvent(adventId));
    }

    @ApiOperation(value = "패스워드 인증", notes = "패스워드 있을시 인증 성공시 선물 페이지 조회")
    @PostMapping("/auth")
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
    @GetMapping("/{userId}/storage")
    public ResponseEntity<Page<AdventStorageResponse>> adventMyStorageFind(@PageableDefault(size=5, sort ="createAt",
                                                                    direction = Sort.Direction.DESC) Pageable pageable,
                                                                           @PathVariable("userId") Integer userId){
        log.info("advent");

        return ResponseEntity
                .ok()
                .body(adventService.findMyStorageAdvent(pageable,userId));
    }

    @ApiOperation(value = "선물 삭제", notes = "해당 유저 선물 삭제")
    @DeleteMapping("/{userId}/{adventId}")
    public ResponseEntity<Object> adventDelete(@PathVariable(value = "userId") Integer userId,
                                               @PathVariable(value = "adventId") Integer adventId){
        log.info("adventDelete");

        adventService.deleteAdvent(userId, adventId);

        return ResponseEntity.noContent().build();
    }
}

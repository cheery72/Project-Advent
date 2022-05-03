package com.ssafy.adventsvr.controller;

import com.ssafy.adventsvr.payload.request.AdventBoxRequest;
import com.ssafy.adventsvr.payload.request.AdventBoxWrapperRequest;
import com.ssafy.adventsvr.payload.response.AdventBoxDayResponse;
import com.ssafy.adventsvr.payload.response.AdventBoxWrapperResponse;
import com.ssafy.adventsvr.service.AdventBoxService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/boxes")
public class AdventBoxController {

    private final AdventBoxService adventBoxService;

    @ApiOperation(value = "선물 박스 생성 및 수정", notes = "박스 생성 및 수정")
    @PostMapping
    public ResponseEntity<AdventBoxDayResponse> adventBoxDayInput(@RequestPart(value = "adventBoxRequest") @Valid AdventBoxRequest adventBoxRequest,
                                                                  @RequestPart(required = false) MultipartFile file) {
        log.info("adventBoxDayInput");

        if (ObjectUtils.isEmpty(adventBoxRequest)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(adventBoxService.inputBoxAdventBox(adventBoxRequest, file));
    }

//    @ApiOperation(value = "선물 박스 수정", notes = "박스 수정")
//    @PatchMapping("/{boxId}")
//    public ResponseEntity<Object> adventBoxContentModify(@PathVariable("boxId") Integer boxId,
//                                                         @RequestPart MultipartFile file) {
//        log.info("adventBoxContentModify");
//
//        adventBoxService.modifyBoxAdventBox(boxId,file);
//
//        return ResponseEntity.noContent().build();
//    }

    @ApiOperation(value = "선물 박스 생성 및 수정 포장지 선택", notes = "선물 박스 생성 및 수정 포장지 선택")
    @PostMapping("/wrappers")
    public ResponseEntity<AdventBoxWrapperResponse> adventBoxWrapperModify(@RequestPart(value = "adventBoxWrapperRequest") AdventBoxWrapperRequest adventBoxWrapperRequest
                                                                         , @RequestPart(required = false) MultipartFile file) {
        log.info("adventBoxWrapperModify");

        if (ObjectUtils.isEmpty(adventBoxWrapperRequest)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(adventBoxService.modifyWrapperAdventBox(adventBoxWrapperRequest, file));
    }

    @ApiOperation(value = "선물 박스 디테일 정보", notes = "선물 박스 상세 정보 조회")
    @GetMapping("/{boxId}/{userId}")
    public ResponseEntity<AdventBoxDayResponse> adventBoxDetailFind(@PathVariable(value = "boxId") Integer boxId,
                                                                    @PathVariable(value = "userId") Integer userId) {
        log.info("adventBoxDetailFind");

        return ResponseEntity
                .ok(adventBoxService.findDetailAdventBox(boxId, userId));
    }

    @ApiOperation(value = "포장지 디테일 정보", notes = "포장지 상세 정보 조회")
    @GetMapping("/{boxId}/{userId}/wrappers")
    public ResponseEntity<AdventBoxWrapperResponse> adventBoxWrapperDetailFind(@PathVariable(value = "boxId") Integer boxId
                                                                            , @PathVariable(value = "userId") Integer userId) {
        log.info("adventBoxDetailFind");

        return ResponseEntity
                .ok(adventBoxService.findWrapperDetailAdventBox(boxId, userId));
    }

    @ApiOperation(value = "받는 사람이 선물 박스 디테일 정보", notes = "선물 박스 상세 정보 조회")
    @GetMapping("/{boxId}")
    public ResponseEntity<AdventBoxDayResponse> adventBoxUrlDetailFind(@PathVariable(value = "boxId") Integer boxId) {
        log.info("adventBoxUrlDetailFind");

        return ResponseEntity
                .ok(adventBoxService.findUrlDetailAdventBox(boxId));
    }

    @ApiOperation(value = "받는 사람이 포장지 디테일 정보", notes = "선물 박스 상세 정보 조회")
    @GetMapping("/{boxId}/wrappers")
    public ResponseEntity<AdventBoxWrapperResponse> adventBoxUrlWrapperDetailFind(@PathVariable(value = "boxId") Integer boxId) {
        log.info("adventBoxUrlWrapperDetailFind");

        return ResponseEntity
                .ok(adventBoxService.findUrlWrapperDetailAdventBox(boxId));
    }


    @ApiOperation(value = "박스 열리는 날짜 수정 배치", notes = "박스 열리는 날짜 수정 - 배치용, 사용 안해두 됨")
    @PatchMapping("/opens")
    public ResponseEntity<Object> adventBoxDaysModify() {
        log.info("adventBoxDaysModify");

        adventBoxService.modifyDaysAdventBox();

        return ResponseEntity.noContent().build();
    }


}

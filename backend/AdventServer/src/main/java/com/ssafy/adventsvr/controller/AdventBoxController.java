package com.ssafy.adventsvr.controller;

import com.ssafy.adventsvr.exception.NotRequestException;
import com.ssafy.adventsvr.payload.request.AdventBoxRequest;
import com.ssafy.adventsvr.payload.request.AdventBoxWrapperRequest;
import com.ssafy.adventsvr.payload.response.AdventBoxDayResponse;
import com.ssafy.adventsvr.payload.response.AdventBoxDetailResponse;
import com.ssafy.adventsvr.payload.response.AdventBoxUrlDetailResponse;
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

    @ApiOperation(value = "선물 박스 생성", notes = "박스 생성")
    @PostMapping
    public ResponseEntity<AdventBoxDayResponse> adventBoxDayInput(@RequestPart(value = "adventBoxRequest") @Valid AdventBoxRequest adventBoxRequest,
                                                                  @RequestPart(required = false) MultipartFile file) {
        log.info("adventBoxDayInput");

        if (ObjectUtils.isEmpty(adventBoxRequest)) {
            throw new NotRequestException("요청 데이터가 비었습니다.");
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(adventBoxService.inputBoxAdventBox(adventBoxRequest, file));
    }

    @ApiOperation(value = "선물 박스 수정", notes = "박스 수정")
    @PatchMapping("/{boxId}")
    public ResponseEntity<Object> adventBoxContentModify(@PathVariable("boxId") String boxId,
                                                         @RequestPart(required = false) MultipartFile file) {
        log.info("adventBoxContentModify");

        adventBoxService.modifyBoxAdventBox(boxId,file);

        return ResponseEntity.noContent().build();
    }

    @ApiOperation(value = "선물 포장지 생성", notes = "선물 포장지 생성")
    @PostMapping("/wrappers")
    public ResponseEntity<AdventBoxWrapperResponse> adventBoxWrapperInput(@RequestPart(value = "adventBoxWrapperRequest") AdventBoxWrapperRequest adventBoxWrapperRequest
                                                                         , @RequestPart(required = false) MultipartFile file) {
        log.info("adventBoxWrapperModify");

        if (ObjectUtils.isEmpty(adventBoxWrapperRequest)) {
            throw new NotRequestException("요청 데이터가 비었습니다.");
        }

        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .body(adventBoxService.inputWrapperAdventBox(adventBoxWrapperRequest, file));
    }

    @ApiOperation(value = "선물 포장지 수정", notes = "선물 포장지 수정")
    @PatchMapping("/{boxId}/wrappers")
    public ResponseEntity<AdventBoxWrapperResponse> adventBoxWrapperModify(String boxId,
                                                                           @RequestPart(value = "adventBoxWrapperRequest") AdventBoxWrapperRequest adventBoxWrapperRequest
                                                                            , @RequestPart(required = false) MultipartFile file) {
        log.info("adventBoxWrapperModify");

        if (ObjectUtils.isEmpty(adventBoxWrapperRequest)) {
            throw new NotRequestException("요청 데이터가 비었습니다.");
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(adventBoxService.modifyWrapperAdventBox(boxId,adventBoxWrapperRequest, file));
    }

    @ApiOperation(value = "선물 박스 디테일 정보", notes = "선물 박스 상세 정보 조회")
    @GetMapping("/{boxId}/{userId}")
    public ResponseEntity<AdventBoxDetailResponse> adventBoxDetailFind(@PathVariable(value = "boxId") String boxId,
                                                                    @PathVariable(value = "userId") Integer userId) {
        log.info("adventBoxDetailFind");

        return ResponseEntity
                .ok(adventBoxService.findDetailAdventBox(boxId, userId));
    }

    @ApiOperation(value = "포장지 디테일 정보", notes = "포장지 상세 정보 조회")
    @GetMapping("/{boxId}/{userId}/wrappers")
    public ResponseEntity<AdventBoxWrapperResponse> adventBoxWrapperDetailFind(@PathVariable(value = "boxId") String boxId
                                                                            , @PathVariable(value = "userId") Integer userId) {
        log.info("adventBoxDetailFind");

        return ResponseEntity
                .ok(adventBoxService.findWrapperDetailAdventBox(boxId, userId));
    }

    @ApiOperation(value = "받는 사람이 선물 박스 디테일 정보", notes = "선물 박스 상세 정보 조회")
    @GetMapping("/{boxId}")
    public ResponseEntity<AdventBoxUrlDetailResponse> adventBoxUrlDetailFind(@PathVariable(value = "boxId") String boxId) {
        log.info("adventBoxUrlDetailFind");

        return ResponseEntity
                .ok(adventBoxService.findUrlDetailAdventBox(boxId));
    }

    @ApiOperation(value = "받는 사람이 포장지 디테일 정보", notes = "선물 박스 상세 정보 조회")
    @GetMapping("/{boxId}/wrappers")
    public ResponseEntity<AdventBoxWrapperResponse> adventBoxUrlWrapperDetailFind(@PathVariable(value = "boxId") String boxId) {
        log.info("adventBoxUrlWrapperDetailFind");

        return ResponseEntity
                .ok(adventBoxService.findUrlWrapperDetailAdventBox(boxId));
    }

}

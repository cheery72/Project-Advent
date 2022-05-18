package com.ssafy.adventsvr.controller;

import com.ssafy.adventsvr.payload.request.AdventBoxModifyRequest;
import com.ssafy.adventsvr.payload.request.AdventBoxRequest;
import com.ssafy.adventsvr.payload.request.AdventBoxWrapperRequest;
import com.ssafy.adventsvr.payload.response.*;
import com.ssafy.adventsvr.service.AdventBoxService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Object> adventBoxDayInput(@RequestPart @Valid AdventBoxRequest adventBoxRequest,
                                                    @RequestPart(required = false) MultipartFile file) {
        log.debug("adventBoxDayInput");

        adventBoxService.inputBoxAdventBox(adventBoxRequest, file);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .build();
    }

    @ApiOperation(value = "선물 박스 수정", notes = "박스 수정")
    @PatchMapping("/{boxId}")
    public ResponseEntity<Object> adventBoxContentModify(@PathVariable("boxId") String boxId,
                                                         @RequestPart AdventBoxModifyRequest adventBoxModifyRequest,
                                                         @RequestPart(required = false) MultipartFile file) {
        log.debug("adventBoxContentModify");

        adventBoxService.modifyBoxAdventBox(boxId,file,adventBoxModifyRequest);

        return ResponseEntity.noContent().build();
    }

    @ApiOperation(value = "선물 포장지 생성", notes = "선물 포장지 생성")
    @PostMapping("/wrappers")
    public ResponseEntity<Object> adventBoxWrapperInput(@RequestPart @Valid AdventBoxWrapperRequest adventBoxWrapperRequest,
                                                        @RequestPart(required = false) MultipartFile file) {
        log.debug("adventBoxWrapperModify");

        adventBoxService.inputWrapperAdventBox(adventBoxWrapperRequest, file);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .build();
    }

    @ApiOperation(value = "선물 포장지 수정", notes = "선물 포장지 수정")
    @PatchMapping("/{boxId}/wrappers")
    public ResponseEntity<Object> adventBoxWrapperModify(@PathVariable("boxId") String boxId,
                                                         @RequestPart @Valid AdventBoxWrapperRequest adventBoxWrapperRequest,
                                                         @RequestPart(required = false) MultipartFile file) {
        log.debug("adventBoxWrapperModify");

        adventBoxService.modifyWrapperAdventBox(boxId,adventBoxWrapperRequest, file);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .build();
    }

    @ApiOperation(value = "선물 박스 디테일 정보", notes = "선물 박스 상세 정보 조회")
    @GetMapping("/{boxId}/{userId}")
    public ResponseEntity<AdventBoxDetailResponse> adventBoxDetailFind(@PathVariable("boxId") String boxId,
                                                                       @PathVariable("userId") Integer userId) {
        log.debug("adventBoxDetailFind");

        return ResponseEntity
                .ok(adventBoxService.findDetailAdventBox(boxId, userId));
    }

    @ApiOperation(value = "포장지 디테일 정보", notes = "포장지 상세 정보 조회")
    @GetMapping("/{boxId}/{userId}/wrappers")
    public ResponseEntity<AdventBoxWrapperResponse> adventBoxWrapperDetailFind(@PathVariable("boxId") String boxId,
                                                                               @PathVariable("userId") Integer userId) {
        log.debug("adventBoxDetailFind");

        return ResponseEntity
                .ok(adventBoxService.findWrapperDetailAdventBox(boxId, userId));
    }

    @ApiOperation(value = "받는 사람이 선물 박스 디테일 정보", notes = "선물 박스 상세 정보 조회")
    @GetMapping("/{boxId}")
    public ResponseEntity<AdventBoxUrlDetailResponse> adventBoxUrlDetailFind(@PathVariable("boxId") String boxId) {
        log.debug("adventBoxUrlDetailFind");

        return ResponseEntity
                .ok(adventBoxService.findUrlDetailAdventBox(boxId));
    }

    @ApiOperation(value = "받는 사람이 포장지 디테일 정보", notes = "선물 박스 상세 정보 조회")
    @GetMapping("/{boxId}/wrappers")
    public ResponseEntity<AdventBoxWrapperResponse> adventBoxUrlWrapperDetailFind(@PathVariable("boxId") String boxId) {
        log.debug("adventBoxUrlWrapperDetailFind");

        return ResponseEntity
                .ok(adventBoxService.findUrlWrapperDetailAdventBox(boxId));
    }

}

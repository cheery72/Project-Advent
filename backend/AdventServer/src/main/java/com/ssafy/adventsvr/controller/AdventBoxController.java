package com.ssafy.adventsvr.controller;

import com.ssafy.adventsvr.payload.request.AdventBoxRequest;
import com.ssafy.adventsvr.payload.response.AdventBoxDayResponse;
import com.ssafy.adventsvr.payload.response.AdventBoxDetailResponse;
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
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/boxes")
public class AdventBoxController {

    private final AdventBoxService adventBoxService;

    @ApiOperation(value = "선물 박스 생성", notes = "박스 생성")
    @PostMapping
    public ResponseEntity<AdventBoxDayResponse> adventBoxDayInput(@RequestPart(value = "adventBoxRequest") @Valid AdventBoxRequest adventBoxRequest,
                                                                  @RequestPart(required = false) MultipartFile file){
        log.info("adventBoxDayInput");

        if(ObjectUtils.isEmpty(adventBoxRequest)){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(adventBoxService.inputBoxAdventBox(adventBoxRequest,file));
    }

    @ApiOperation(value = "선물 박스 수정", notes = "박스 수정")
    @PatchMapping("/{boxId}")
    public ResponseEntity<Object> adventBoxContentModify(@PathVariable("boxId") Integer boxId,
                                                         @RequestPart MultipartFile file) {
        log.info("adventBoxContentModify");

        adventBoxService.modifyBoxAdventBox(boxId,file);

        return ResponseEntity.noContent().build();
    }

    @ApiOperation(value = "선물 포장지 수정", notes = "포장지 수정")
    @PatchMapping("/{adventId}/{recipientName}")
    public ResponseEntity<Object> adventBoxWrapperModify(@PathVariable("adventId") Integer adventId,
                                                         @PathVariable("recipientName") String recipientName,
                                                         @RequestPart Map<Integer,MultipartFile> files){
        log.info("adventBoxWrapperModify");

        return ResponseEntity.noContent().build();
    }

    @ApiOperation(value = "선물 박스 디테일 정보", notes = "선물 박스 상세 정보 조회")
    @GetMapping("/{boxId}")
    public ResponseEntity<AdventBoxDetailResponse> adventBoxDetailFind(@PathVariable(value = "boxId") Integer boxId){
        log.info("adventBoxDetailFind");

        return ResponseEntity
                .ok()
                .body(adventBoxService.findDetailAdventBox(boxId));
    }

    @ApiOperation(value = "박스 열리는 날짜 수정 크론탭", notes = "박스 열리는 날짜 수정")
    @PatchMapping("/days")
    public ResponseEntity<Object> adventBoxDaysModify(){
        log.info("adventBoxDaysModify");

        adventBoxService.modifyDaysAdventBox();

        return ResponseEntity.noContent().build();
    }
}

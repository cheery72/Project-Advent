package com.ssafy.adventsvr.controller;

import com.ssafy.adventsvr.payload.request.AdventDayRequest;
import com.ssafy.adventsvr.payload.response.AdventDayResponse;
import com.ssafy.adventsvr.service.AdventService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/advents")
public class AdventController {

    private final AdventService adventService;

    @ApiOperation(value = "1,3,7 선물 생성", notes = "회원정보 등록")
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

}

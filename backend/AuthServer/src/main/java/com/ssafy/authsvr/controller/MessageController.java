package com.ssafy.authsvr.controller;

import com.ssafy.authsvr.payload.response.AlarmResponse;
import com.ssafy.authsvr.service.AlarmService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/alarm")
@RequiredArgsConstructor
@Slf4j
public class MessageController {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final AlarmService alarmService;

    @MessageMapping("/send/{recipientName}/{userId}/{messages}")
    public void messageReceived(
            @DestinationVariable("recipientName") String recipientName,
            @DestinationVariable("userId") Integer userId,
            @DestinationVariable("messages") String messages) {

        alarmService.addMessage(recipientName,userId,messages);
        System.out.println(messages);
        simpMessagingTemplate.convertAndSend("/sub/" + userId, messages);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<AlarmResponse>> getMessage(@PathVariable("userId") Integer userId){
        log.info("getMessage");
        System.out.println(userId);
        return ResponseEntity.ok(alarmService.getMessage(userId));
    }
}
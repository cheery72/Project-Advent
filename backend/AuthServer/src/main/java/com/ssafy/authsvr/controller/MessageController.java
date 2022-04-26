//package com.ssafy.authsvr.controller;
//
//import com.ssafy.sunin.payload.response.alarm.AlarmResponse;
//import com.ssafy.sunin.service.AlarmService;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.ResponseEntity;
//import org.springframework.messaging.handler.annotation.DestinationVariable;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
//import org.springframework.web.bind.annotation.*;
//import java.util.List;
//
//@RestController
//@RequestMapping("/alram")
//@RequiredArgsConstructor
//@Slf4j
//public class MessageController {
//
//    private final SimpMessagingTemplate simpMessagingTemplate;
//    private final AlarmService alarmService;
//
//    @MessageMapping("/send/{fromUserId}/{toUserId}/{messages}/{feedId}")
//    public void messageLike(
//            @DestinationVariable("fromUserId") Long fromUserId,
//                        @DestinationVariable("toUserId") Long toUserId,
//                        @DestinationVariable("messages") String messages,
//                        @DestinationVariable("feedId") String feedId) {
//        System.out.println(messages);
//        if(!fromUserId.equals(toUserId)) {
//            //좋아요를 누른사람한테는 메시지를 보내면 안됨
//            if (!alarmService.getLikeUser(fromUserId, feedId)) {
//                // 유저마다 닉네임을 달아줘야함
//                alarmService.addMessage(fromUserId, toUserId, messages);
//                simpMessagingTemplate.convertAndSend("/sub/" + toUserId, messages);
//            }
//        }
//    }
//
//    @MessageMapping("/send/{fromUserId}/{toUserId}/{messages}")
//    public void messageFollower(
//            @DestinationVariable("fromUserId") Long fromUserId,
//            @DestinationVariable("toUserId") Long toUserId,
//            @DestinationVariable("messages") String messages) {
//        System.out.println(messages);
//        if(!fromUserId.equals(toUserId)) {
//            if(messages.contains("댓글")){
//                alarmService.addMessage(fromUserId, toUserId, messages);
//                simpMessagingTemplate.convertAndSend("/sub/" + toUserId, messages);
//            }else{
//                //이미 팔로워가 되있으면 메시지를 보내면 안됨
//                if (alarmService.getFollower(fromUserId, toUserId) == null) {
//                    alarmService.addMessage(fromUserId, toUserId, messages);
//                    simpMessagingTemplate.convertAndSend("/sub/" + toUserId, messages);
//                }
//            }
//        }
//    }
//
//    @GetMapping("/{toUserId}")
//    public ResponseEntity<List<AlarmResponse>> getMessage(@PathVariable("toUserId") Long toUserId){
//        log.info("getMessage");
//        System.out.println(toUserId);
//        return ResponseEntity.ok(alarmService.getMessage(toUserId));
//    }
//}
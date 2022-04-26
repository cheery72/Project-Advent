//package com.ssafy.authsvr.entity;
//
//import lombok.AccessLevel;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import org.springframework.data.annotation.CreatedDate;
//
//import javax.persistence.*;
//import java.time.LocalDateTime;
//
//@Getter
//@Entity
//@Table(name = "alarm")
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
//public class Alarm {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    private Long fromUserId;
//    private String message;
//    private Long toUserId;
//    @CreatedDate
//    private LocalDateTime localDateTime;
//
//    public static Alarm alarm(Long fromUserId, Long toUserId, String message){
//        return Alarm.builder()
//                .fromUserId(fromUserId)
//                .toUserId(toUserId)
//                .message(message)
//                .localDateTime(LocalDateTime.now())
//                .build();
//    }
//
//    @Builder
//    public Alarm(Long id, Long fromUserId, String message, Long toUserId, LocalDateTime localDateTime) {
//        this.id = id;
//        this.fromUserId = fromUserId;
//        this.message = message;
//        this.toUserId = toUserId;
//        this.localDateTime = localDateTime;
//    }
//}

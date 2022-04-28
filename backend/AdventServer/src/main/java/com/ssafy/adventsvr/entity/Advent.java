package com.ssafy.adventsvr.entity;

import com.ssafy.adventsvr.payload.request.AdventDayRequest;
import com.ssafy.adventsvr.payload.request.AdventPrivateRequest;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.*;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Table(name = "advent")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Advent extends BaseTimeEntity{

    @Id
    @Column(name = "advent_id")
    private String id;

    private String url;

    private String title;

    private Integer day;

    @Column(nullable = false, columnDefinition = "tinyint default 0")
    private boolean isPassword;

    @Column(nullable = false, columnDefinition = "tinyint default 0")
    private boolean isReceived;

    @Column(updatable = false)
    private LocalDateTime receivedAt;

    private String password;

    private String passwordHint;

    private LocalDate endAt;

    private Integer userId;

    @OneToMany(mappedBy = "advent", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AdventBox> adventBoxes = new ArrayList<>();

    public static Advent adventBuilder(AdventDayRequest adventDayRequest){
        return Advent.builder()
                .id((UUID.randomUUID().toString()).replace("-",""))
                .userId(adventDayRequest.getUserId())
                .title("Advent Special Day")
                .day(adventDayRequest.getDay())
                .build();
    }



    @Builder
    private Advent(String id, String url, Integer day, String title, boolean isReceived, LocalDateTime receivedAt, String password, String passwordHint, LocalDate endAt, Integer userId, List<AdventBox> adventBoxes) {
        this.id = id;
        this.url = url;
        this.day = day;
        this.title = title;
        this.isReceived = isReceived;
        this.receivedAt = receivedAt;
        this.password = password;
        this.passwordHint = passwordHint;
        this.endAt = endAt;
        this.userId = userId;
        this.adventBoxes = adventBoxes;
    }

    public static Advent adventBuilder(AdventDayRequest adventDayRequest){
        return Advent.builder()
                .userId(adventDayRequest.getUserId())
                .day(adventDayRequest.getDay())
                .build();
    }

    public void setAdventPrivateInfoModify(AdventPrivateRequest adventPrivateRequest, String url, LocalDate localDate){
        if(adventPrivateRequest.getPassword() != null){
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

            this.password = encoder.encode(adventPrivateRequest.getPassword());
            this.passwordHint = adventPrivateRequest.getPasswordHint();
            this.isPassword = true;
        }else{
            this.isPassword = false;
        }

        this.endAt = localDate;
        this.url = url;
    }

    public void setAdventIsReceivedModify(){
        this.receivedAt = LocalDateTime.now();
        this.isReceived = true;
    }

    public void setAdventTitleModify(String title) {
        this.title = title;
    }
}
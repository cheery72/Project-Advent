package com.ssafy.authsvr.entity;

import com.ssafy.authsvr.oauth.domain.ProviderType;
import com.ssafy.authsvr.oauth.domain.RoleType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class User {
    @Id
    @Column(name = "user_id")
    private Integer id;

    @Enumerated(EnumType.STRING)
    private ProviderType providerType;

    @Enumerated(EnumType.STRING)
    private RoleType roleType;

    private String tokenId;

    private String name;

    private LocalDateTime created_datetime;

    private LocalDateTime modified_datetime;


    public User(Integer id, String tokenId , String name, LocalDateTime created_datetime, LocalDateTime modified_datetime) {
        this.id = id;
        this.tokenId = tokenId;
        this.name = name;
        this.created_datetime = created_datetime;
        this.modified_datetime = modified_datetime;
    }
}
package com.ssafy.authsvr.entity;

import com.ssafy.authsvr.oauth.domain.RoleType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User extends BaseTimeEntity {
    @Id
    @Column(name = "user_id")
    private Integer id;

    @Enumerated(EnumType.STRING)
    private RoleType roleType;

    private String tokenId;

    private String name;

    public User(Integer id, RoleType roleType, String tokenId, String name) {
        this.id = id;
        this.roleType = roleType;
        this.tokenId = tokenId;
        this.name = name;
    }

}
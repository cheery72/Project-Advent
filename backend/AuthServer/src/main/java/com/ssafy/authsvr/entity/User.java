package com.ssafy.authsvr.entity;

import com.ssafy.authsvr.oauth.domain.RoleType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.time.LocalDate;

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

    private Integer adventCount;

    private LocalDate adventWriteAt;

    public User(Integer id, RoleType roleType, String tokenId, String name, Integer adventCount) {
        this.id = id;
        this.roleType = roleType;
        this.tokenId = tokenId;
        this.name = name;
        this.adventCount = adventCount;
    }

    public void setAdventCountModify(Integer adventCount, LocalDate localDate){
        this.adventCount = ++adventCount;
        this.adventWriteAt = localDate;
    }
}
package com.ssafy.authsvr.payload.response;

import com.ssafy.authsvr.entity.User;
import com.ssafy.authsvr.oauth.domain.RoleType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserDetailResponse {

    private Integer id;
    private String name;
    private RoleType roleType;

    public static UserDetailResponse detailResponse(User user){
        return UserDetailResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .roleType(user.getRoleType())
                .build();
    }

    @Builder
    public UserDetailResponse(Integer id, String name, RoleType roleType) {
        this.id = id;
        this.name = name;
        this.roleType = roleType;
    }
}

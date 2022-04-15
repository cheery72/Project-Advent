package com.ssafy.authsvr.payload.response;

import com.ssafy.authsvr.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserDetailResponse {

    private Integer id;
    private String name;

    public static UserDetailResponse detailResponse(User user){
        return UserDetailResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .build();
    }

    @Builder
    public UserDetailResponse(Integer id,  String name) {
        this.id = id;
        this.name = name;
    }
}

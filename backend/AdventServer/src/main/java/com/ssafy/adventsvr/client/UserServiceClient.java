package com.ssafy.adventsvr.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name="auth-server",url="http://k6c206.p.ssafy.io:8081/users")
public interface UserServiceClient {

    @GetMapping("/{userId}")
    Integer userAdventCountFind(@PathVariable(value = "userId") Integer userId);
}

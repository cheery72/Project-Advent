package com.ssafy.adventsvr.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDate;

@FeignClient(name="auth-server",url="http://localhost:8081/users")
public interface UserServiceClient {

    @GetMapping("/{userId}/{localDate}")
    Integer userAdventCountFind(@PathVariable(value = "userId") Integer userId, @PathVariable LocalDate localDate);
}

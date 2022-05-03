package com.ssafy.authsvr.controller;

import com.ssafy.authsvr.service.UserService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @GetMapping("/{userId}")
    public Integer userAdventCountFind(@PathVariable(value = "userId") Integer userId){
        log.info("userAdventCountFind");

        return userService.findAdventWriteCountUser(userId);
    }
}

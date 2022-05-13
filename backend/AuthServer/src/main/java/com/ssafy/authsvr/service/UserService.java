package com.ssafy.authsvr.service;

import com.ssafy.authsvr.entity.User;

import java.time.LocalDate;

public interface UserService {
    User findDetailsUser(String tokenId);
    Integer findAdventWriteCountUser(Integer userId);
}

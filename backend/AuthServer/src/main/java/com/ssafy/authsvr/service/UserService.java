package com.ssafy.authsvr.service;

import com.ssafy.authsvr.entity.User;

public interface UserService {
    User findDetailsUser(String tokenId);
}
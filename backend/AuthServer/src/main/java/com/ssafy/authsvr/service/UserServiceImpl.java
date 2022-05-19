package com.ssafy.authsvr.service;

import com.ssafy.authsvr.entity.User;
import com.ssafy.authsvr.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Override
    public User findDetailsUser(String tokenId) {
        return userRepository.findByTokenId(tokenId);
    }

}
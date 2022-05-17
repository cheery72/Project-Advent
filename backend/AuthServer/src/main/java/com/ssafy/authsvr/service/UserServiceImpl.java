package com.ssafy.authsvr.service;

import com.ssafy.authsvr.entity.User;
import com.ssafy.authsvr.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Override
    public User findDetailsUser(String tokenId) {
        return userRepository.findByTokenId(tokenId);
    }

    @Transactional
    @Override
    public Integer findAdventWriteCountUser(Integer userId) {
        LocalDate localDate = LocalDate.now();
        Optional<User> optionalUser = userRepository.findById(userId);
        User user = optionalUser.orElseThrow(NoSuchElementException::new);

        if(user.getAdventWriteAt() == null || !localDate.equals(user.getAdventWriteAt())){
            user.setAdventCountModify(0, localDate);
        }else{
            if(30 >= user.getAdventCount()){
                user.setAdventCountModify(user.getAdventCount(), localDate);
            }
        }

        return user.getAdventCount();
    }
}

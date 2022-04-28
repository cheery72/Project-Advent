package com.ssafy.authsvr.service;

import com.ssafy.authsvr.entity.Alarm;
import com.ssafy.authsvr.payload.response.AlarmResponse;
import com.ssafy.authsvr.repository.AlarmRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AlarmService {

    private final AlarmRepository alarmRepository;

    public void addMessage(String recipientName, Integer userId, String message){
        Alarm alarm = Alarm.alarm(recipientName,userId,message);
        alarmRepository.save(alarm);
    }

    public List<AlarmResponse> getMessage(Integer userId) {
        Optional<List<Alarm>> optionalAlarm = alarmRepository.findAllByUserId(userId);
        List<Alarm> messages = optionalAlarm.orElseThrow(NoSuchElementException::new);

        List<AlarmResponse> alarmResponseList = AlarmResponse.alarmResponseList(messages);
        alarmResponseList.sort(Comparator.comparing(AlarmResponse::getLocalDateTime).reversed());

        if(alarmResponseList.size() < 10){
            alarmResponseList = alarmResponseList.subList(0,alarmResponseList.size()-1);
        }else{
            alarmResponseList = alarmResponseList.subList(0,10);
        }
        return alarmResponseList;

    }
}

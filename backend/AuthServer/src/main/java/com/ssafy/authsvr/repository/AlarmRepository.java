package com.ssafy.authsvr.repository;

import com.ssafy.authsvr.entity.Alarm;
import org.springframework.data.repository.CrudRepository;
import java.util.List;
import java.util.Optional;

public interface AlarmRepository extends CrudRepository<Alarm,Long> {
    Optional<List<Alarm>> findAllByUserId(Integer userId);
}

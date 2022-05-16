package com.ssafy.adventsvr.repository;

import com.ssafy.adventsvr.entity.Advent;
import com.ssafy.adventsvr.repository.querydsl.AdventRepositoryCustom;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface AdventRepository extends JpaRepository<Advent,String>, AdventRepositoryCustom {
    Optional<Advent> findByUrl(String url);
    List<Advent> findAllByUserId(Integer userId);
    List<Advent> findPageAllByUserId(Pageable pageable, Integer userId);
}

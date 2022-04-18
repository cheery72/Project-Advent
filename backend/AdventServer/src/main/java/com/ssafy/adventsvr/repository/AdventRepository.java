package com.ssafy.adventsvr.repository;

import com.ssafy.adventsvr.entity.Advent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdventRepository extends JpaRepository<Advent,Integer> {
    Optional<Advent> findByUserId(Integer userId);
}

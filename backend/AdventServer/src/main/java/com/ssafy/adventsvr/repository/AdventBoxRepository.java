package com.ssafy.adventsvr.repository;

import com.ssafy.adventsvr.entity.AdventBox;
import com.ssafy.adventsvr.repository.querydsl.AdventBoxRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface AdventBoxRepository extends JpaRepository<AdventBox,String>, AdventBoxRepositoryCustom {
    List<AdventBox> findAllByAdventIdOrderByAdventDayAsc(String adventId);
    List<AdventBox> findAllByAdventId(String adventId);
    Optional<AdventBox> findByAdventIdAndAdventDay(String adventId, Integer adventDay);
}

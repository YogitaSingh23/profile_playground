package com.example.profileplayground.repository;

import com.example.profileplayground.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface SkillRepository extends JpaRepository<Skill, Long> {
    @Query("select s.name from Skill s")
    List<String> findAllNames();
}

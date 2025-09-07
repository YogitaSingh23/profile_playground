package com.example.profileplayground.repository;

import com.example.profileplayground.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    @Query("select pr from Project pr where lower(pr.description) like lower(concat('%', ?1, '%')) or lower(pr.title) like lower(concat('%', ?1, '%'))")
    List<Project> findBySkillInText(String skill);
}

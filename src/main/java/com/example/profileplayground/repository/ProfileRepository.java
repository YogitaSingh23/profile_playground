package com.example.profileplayground.repository;

import com.example.profileplayground.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    @Query("select p from Profile p where lower(p.name) like lower(concat('%', ?1, '%')) or lower(p.email) like lower(concat('%', ?1, '%'))")
    List<Profile> search(String q);
}

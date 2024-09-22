package com.global.RecruitmentSystem.repository;

import com.global.RecruitmentSystem.model.Admin;
import com.global.RecruitmentSystem.model.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
    Admin findByUsername(String username);
}

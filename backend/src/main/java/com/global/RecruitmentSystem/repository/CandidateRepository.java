package com.global.RecruitmentSystem.repository;

import com.global.RecruitmentSystem.model.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidateRepository extends JpaRepository<Candidate,Integer> {
    Candidate findByUsername(String username);
}

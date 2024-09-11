package com.global.RecruitmentSystem.repository;

import com.global.RecruitmentSystem.model.CandidateApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CandidateApplicationRepository extends JpaRepository<CandidateApplication,Integer> {
    List<CandidateApplication> findByClientRequirementRequirementId(Integer requirementId);
}

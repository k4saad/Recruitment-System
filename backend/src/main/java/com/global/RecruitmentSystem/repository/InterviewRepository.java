package com.global.RecruitmentSystem.repository;

import com.global.RecruitmentSystem.model.Interview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InterviewRepository extends JpaRepository<Interview, Integer> {
}

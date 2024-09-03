package com.global.RecruitmentSystem.repository;

import com.global.RecruitmentSystem.model.Client;
import com.global.RecruitmentSystem.model.ClientRequirement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRequirementRepository extends JpaRepository<ClientRequirement,Integer> {
}

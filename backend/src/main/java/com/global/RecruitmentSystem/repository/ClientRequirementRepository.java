package com.global.RecruitmentSystem.repository;

import com.global.RecruitmentSystem.model.Client;
import com.global.RecruitmentSystem.model.ClientRequirement;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ClientRequirementRepository extends JpaRepository<ClientRequirement,Integer> {
    @Modifying
    @Transactional
    @Query("DELETE FROM ClientRequirement cr WHERE cr.requirementId = :requirementId")
    void removeById(@Param("requirementId") Integer requirementId);
}

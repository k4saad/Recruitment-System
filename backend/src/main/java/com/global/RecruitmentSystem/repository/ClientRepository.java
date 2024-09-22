package com.global.RecruitmentSystem.repository;

import com.global.RecruitmentSystem.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Integer> {
    Client findByUsername(String username);

    Client findByEmail(String email);
}

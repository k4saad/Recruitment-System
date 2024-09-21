package com.global.RecruitmentSystem.repository;

import com.global.RecruitmentSystem.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
}

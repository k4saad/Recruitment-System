package com.global.RecruitmentSystem.model;

import com.global.RecruitmentSystem.enums.CandidateApplicationStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CandidateApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer applicationId;

    @ManyToOne
    @JoinColumn(name = "candidate_id")
    private Candidate candidate;

    @ManyToOne
    @JoinColumn(name = "requirement_id")
    private ClientRequirement clientRequirement;

    @Enumerated(EnumType.STRING)
    private CandidateApplicationStatus status;

    private LocalDate dateApplied;

    @OneToOne(
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            mappedBy = "candidateApplication"
    )
    private Payment payment;

    @OneToOne(
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            mappedBy = "candidateApplication"
    )
    private Interview interview;

    @OneToOne(
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            mappedBy = "candidateApplication"
    )
    private CandidateVisaDocument candidateVisaDocument;

    @OneToOne(
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            mappedBy = "candidateApplication"
    )
    private Ticket ticket;
}

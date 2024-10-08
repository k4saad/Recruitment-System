package com.global.RecruitmentSystem.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.global.RecruitmentSystem.enums.CandidateApplicationStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
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
            mappedBy = "candidateApplication",
            orphanRemoval = true
    )
    private Payment payment;

    @OneToOne(
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            mappedBy = "candidateApplication",
            orphanRemoval = true
    )
    private Interview interview;

    @OneToOne(
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            mappedBy = "candidateApplication",
            orphanRemoval = true
    )
    private CandidateVisaDocument candidateVisaDocument;

    @OneToOne(
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            mappedBy = "candidateApplication",
            orphanRemoval = true
    )
    private Ticket ticket;

    public void addInterview(Interview interview) {
        this.interview = interview;
        this.status = CandidateApplicationStatus.SELECTED_FOR_INTERVIEW;
        interview.setCandidateApplication(this);
    }

    public void addPayment(Payment payment) {
        this.payment = payment;
        this.status = CandidateApplicationStatus.SELECTED;
        payment.setCandidateApplication(this);
    }
    public void addTicket(Ticket ticket){
        this.ticket = ticket;
        ticket.setCandidateApplication(this);
    }

    public void addVisa(CandidateVisaDocument visa) {
        this.candidateVisaDocument = visa;
        visa.setCandidateApplication(this);
    }
}

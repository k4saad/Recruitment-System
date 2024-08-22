package com.global.RecruitmentSystem.model;

import com.global.RecruitmentSystem.enums.TicketStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Blob;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ticketId;

    @OneToOne
    @JoinColumn(name = "candidate_application_id")
    private CandidateApplication candidateApplication;

    @Lob
    private Blob ticket;

    @Enumerated(EnumType.STRING)
    private TicketStatus status;

}

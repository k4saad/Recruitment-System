package com.global.RecruitmentSystem.model;

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
public class CandidateVisaDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer visaDocumentId;

    @OneToOne
    @JoinColumn(name = "candidate_application_id")
    private CandidateApplication candidateApplication;

    @Lob
    private Blob visaDocument;

}

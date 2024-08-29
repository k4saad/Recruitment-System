package com.global.RecruitmentSystem.model;

import com.global.RecruitmentSystem.enums.CandidateStatus;
import com.global.RecruitmentSystem.enums.MedicalStatus;
import com.global.RecruitmentSystem.enums.MedicalValidity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Blob;
import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Candidate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer candidateId;

    private String name;
    private String contactNumber;

    @Enumerated(EnumType.STRING)
    private CandidateStatus status;

    @Lob
    private Blob resume;

    @Lob
    private Blob medicalReport;

    @Enumerated(EnumType.STRING)
    private MedicalStatus medicalStatus;

    @Enumerated(EnumType.STRING)
    private MedicalValidity medicalValidity;

    @Column(unique = true)
    private String username;

    private String password;

    @Column(columnDefinition = "json")
    private String documents;

    @OneToMany(
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            mappedBy = "candidate"
    )
    private List<CandidateApplication> candidateApplications;

    @OneToMany(
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            mappedBy = "candidate"
    )
    private List<CandidateNotification> candidateNotifications;

}

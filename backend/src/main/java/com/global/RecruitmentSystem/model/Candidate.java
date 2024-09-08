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
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
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
            mappedBy = "candidate",
            orphanRemoval = true
    )
    private List<CandidateApplication> candidateApplications;

    @OneToMany(
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            mappedBy = "candidate",
            orphanRemoval = true
    )
    private List<CandidateNotification> candidateNotifications;

    public Candidate(){
        this.candidateApplications = new ArrayList<>();
        this.candidateNotifications = new ArrayList<>();
    }

    public void addCandidateApplication(CandidateApplication candidateApplication) {
        if(candidateApplications == null){
            candidateApplications = new ArrayList<>();
        }
        candidateApplications.add(candidateApplication);
        candidateApplication.setCandidate(this);
    }
}

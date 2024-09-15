package com.global.RecruitmentSystem.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.global.RecruitmentSystem.enums.InterviewStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Interview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer interviewId;

    @OneToOne
    @JoinColumn(name = "candidate_application_id")
    @JsonIgnore
    private CandidateApplication candidateApplication;

    @Enumerated(EnumType.STRING)
    private InterviewStatus status;

    private String meetingId;

    private LocalDateTime interviewTimestamp;

}

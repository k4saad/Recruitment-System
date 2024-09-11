package com.global.RecruitmentSystem.response;

import com.global.RecruitmentSystem.enums.CandidateApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ApplicantCardResponse {
    private Integer applicationId;
    private CandidateApplicationStatus status;
    private String applicantName;

}

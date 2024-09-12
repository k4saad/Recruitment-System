package com.global.RecruitmentSystem.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.global.RecruitmentSystem.enums.InterviewStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class InterviewCardResponse {
    private Integer interviewId;
    private Integer applicationId;
    private String candidateName;
    private String requirementTitle;
    private InterviewStatus status;
    private LocalDateTime interviewTimestamp;
}

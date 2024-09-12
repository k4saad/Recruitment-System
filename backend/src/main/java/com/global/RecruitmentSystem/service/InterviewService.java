package com.global.RecruitmentSystem.service;

import com.global.RecruitmentSystem.enums.InterviewStatus;
import com.global.RecruitmentSystem.model.CandidateApplication;
import com.global.RecruitmentSystem.model.Interview;
import com.global.RecruitmentSystem.repository.InterviewRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
@Slf4j
public class InterviewService {
    private final InterviewRepository interviewRepository;
    private final CandidateApplicationService candidateApplicationService;


    public Interview scheduleInterview(Integer applicationId, LocalDateTime time) {
        CandidateApplication candidateApplication = candidateApplicationService.getCandidateApplicationById(applicationId);
        Interview interview = Interview.builder()
                .status(InterviewStatus.SCHEDULED)
                .interviewTimestamp(time)
                .build();
        candidateApplication.addInterview(interview);
        return interviewRepository.save(interview);
    }
}

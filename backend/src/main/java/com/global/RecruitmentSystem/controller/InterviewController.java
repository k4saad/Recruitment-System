package com.global.RecruitmentSystem.controller;

import com.global.RecruitmentSystem.model.*;
import com.global.RecruitmentSystem.response.InterviewCandidateCardResponse;
import com.global.RecruitmentSystem.response.InterviewCardResponse;
import com.global.RecruitmentSystem.service.CandidateService;
import com.global.RecruitmentSystem.service.ClientRequirementService;
import com.global.RecruitmentSystem.service.ClientService;
import com.global.RecruitmentSystem.service.InterviewService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Slf4j
@RestController
@RequestMapping("/interview")
@CrossOrigin(origins = "http://localhost:5173")
public class InterviewController {

    private final InterviewService interviewService;
    private final ClientService clientService;
    private final CandidateService candidateService;

    @PreAuthorize("hasRole('ROLE_CLIENT')")
    @PostMapping("/schedule/{applicationId}")
    public ResponseEntity<Interview> scheduleInterview(
            @PathVariable Integer applicationId,
            @RequestParam LocalDateTime time
    ){
        return ResponseEntity.ok(interviewService.scheduleInterview(applicationId,time));
    }

    @PreAuthorize("hasRole('ROLE_CLIENT')")
    @GetMapping("/upcomming/{username}")
    public ResponseEntity<List<InterviewCardResponse>> getUpcommingInterview(
            @PathVariable String username
    ){
        Client client = clientService.findByUsername(username);
        List<ClientRequirement> clientRequirements = client.getClientRequirements();
        List<InterviewCardResponse> interviewCardResponses = new ArrayList<>();
        for(ClientRequirement clientRequirement : clientRequirements){
            for(CandidateApplication candidateApplication : clientRequirement.getCandidateApplications()){
                InterviewCardResponse interviewCardResponse = getInterviewCardResponse(candidateApplication);
                if(interviewCardResponse != null && interviewCardResponse.getInterviewTimestamp().isAfter(LocalDateTime.now()))
                    interviewCardResponses.add(interviewCardResponse);
            }
        }

        return ResponseEntity.ok(interviewCardResponses);
    }

    @PreAuthorize("hasRole('ROLE_CLIENT')")
    @PutMapping("meetingId/{interviewId}")
    public ResponseEntity<Boolean> setMeetingId(
            @PathVariable Integer interviewId,
            @RequestParam String meetingId
    ){
        log.info("Request received to set meeting id to Interview table");
        interviewService.setMeetingId(interviewId, meetingId);
        return ResponseEntity.ok(true);
    }

    @PreAuthorize("hasRole('ROLE_CLIENT')")
    @PutMapping("update/status/ongoing/{interviewId}")
    public ResponseEntity<Boolean> setMeetingStatusToOngoing(
            @PathVariable Integer interviewId
    ){
        log.info("Request recived to update Interview status to ongoing");
        interviewService.updateInterviewStatusToOngoing(interviewId);
        return ResponseEntity.ok(true);
    }

    @PreAuthorize("hasRole('ROLE_CLIENT')")
    @PutMapping("update/status/completed/{interviewId}")
    public ResponseEntity<Boolean> setMeetingStatusToCompleted(
            @PathVariable Integer interviewId
    ){
        log.info("Request recived to update Interview status to ongoing");
        interviewService.updateInterviewStatusToCompleted(interviewId);
        return ResponseEntity.ok(true);
    }

    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    @GetMapping("upcomming/candidate/{username}")
    public ResponseEntity<List<InterviewCandidateCardResponse>> getInterviewCandidateCardResponse(
            @PathVariable String username
    ){
        Candidate candidate = candidateService.findByUsername(username);
        List<CandidateApplication> candidateApplications = candidate.getCandidateApplications();
        List<InterviewCandidateCardResponse> interviewCandidateCardResponses = new ArrayList<>();
        for(CandidateApplication candidateApplication : candidateApplications){
            InterviewCandidateCardResponse interviewCandidateCardResponse =
                    convertToInterviewCandidateCardResponse(candidateApplication);
            if(interviewCandidateCardResponse != null )
                interviewCandidateCardResponses.add(interviewCandidateCardResponse);
        }
        return ResponseEntity.ok(interviewCandidateCardResponses);
    }

    private InterviewCandidateCardResponse convertToInterviewCandidateCardResponse(CandidateApplication candidateApplication) {
        if(candidateApplication.getInterview() != null){
            return new InterviewCandidateCardResponse(
                    candidateApplication.getInterview().getInterviewId(),
                    candidateApplication.getApplicationId(),
                    candidateApplication.getInterview().getMeetingId(),
                    candidateApplication.getClientRequirement().getClient().getOrganizationName(),
                    candidateApplication.getClientRequirement().getTitle(),
                    candidateApplication.getInterview().getStatus(),
                    candidateApplication.getInterview().getInterviewTimestamp()
            );
        }
        return null;
    }

    private InterviewCardResponse getInterviewCardResponse(CandidateApplication candidateApplication) {
        if(candidateApplication.getInterview() != null){
            return new InterviewCardResponse(
                    candidateApplication.getInterview().getInterviewId(),
                    candidateApplication.getApplicationId(),
                    candidateApplication.getCandidate().getName(),
                    candidateApplication.getClientRequirement().getTitle(),
                    candidateApplication.getInterview().getStatus(),
                    candidateApplication.getInterview().getInterviewTimestamp()
                    );
        }
        return null;
    }

}

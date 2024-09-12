package com.global.RecruitmentSystem.controller;

import com.global.RecruitmentSystem.model.CandidateApplication;
import com.global.RecruitmentSystem.model.Client;
import com.global.RecruitmentSystem.model.ClientRequirement;
import com.global.RecruitmentSystem.model.Interview;
import com.global.RecruitmentSystem.response.InterviewCardResponse;
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

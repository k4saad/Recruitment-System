package com.global.RecruitmentSystem.service;

import com.global.RecruitmentSystem.enums.CandidateApplicationStatus;
import com.global.RecruitmentSystem.exceptions.CandidateApplicationNotFound;
import com.global.RecruitmentSystem.exceptions.ClientRequirementNotFound;
import com.global.RecruitmentSystem.exceptions.DocumentMissing;
import com.global.RecruitmentSystem.model.Candidate;
import com.global.RecruitmentSystem.model.CandidateApplication;
import com.global.RecruitmentSystem.model.ClientRequirement;
import com.global.RecruitmentSystem.repository.CandidateApplicationRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class CandidateApplicationService {
    private final CandidateApplicationRepository candidateApplicationRepository;
    private final ClientRequirementService clientRequirementService;
    private final CandidateService candidateService;

    public CandidateApplication addCandidateApplication(String username, Integer requirementId) {
        log.info("Getting ClientRequirement with id : {}",requirementId);
        ClientRequirement clientRequirement = clientRequirementService.getRequirementById(requirementId);
        log.info("Getting candidate with username : {}",username);
        Candidate candidate = candidateService.findByUsername(username);
        log.info("Checking to see if candidate has resume");
        if(candidate.getResume() == null){
            throw new DocumentMissing("Please upload resume");
        }
        log.info("Creating object of CandidateApplication");
        CandidateApplication candidateApplication = CandidateApplication.builder()
                .status(CandidateApplicationStatus.APPLIED)
                .dateApplied(LocalDate.now())
                .build();
        log.info("Attaching CandidateApplication to the ClientRequirement with id : {}",requirementId);
        clientRequirement.addCandidateApplication(candidateApplication);
        log.info("Attaching CandidateApplication to the Candidate with username : {}",username);
        candidate.addCandidateApplication(candidateApplication);
        return candidateApplicationRepository.save(candidateApplication);

    }

    public List<CandidateApplication> getCandidateApplicationsByUsername(String username) {
        Candidate candidate = candidateService.findByUsername(username);
        return candidate.getCandidateApplications();
    }

    public CandidateApplication getCandidateApplicationById(Integer applicationId) {
        return candidateApplicationRepository.findById(applicationId).orElseThrow(
                () -> new CandidateApplicationNotFound("Client Requirement with id " + applicationId + "does not exist")
        );
    }
}

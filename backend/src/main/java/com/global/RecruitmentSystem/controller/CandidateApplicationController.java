package com.global.RecruitmentSystem.controller;

import com.global.RecruitmentSystem.exceptions.DocumentMissing;
import com.global.RecruitmentSystem.model.CandidateApplication;
import com.global.RecruitmentSystem.model.ClientRequirement;
import com.global.RecruitmentSystem.service.CandidateApplicationService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@Slf4j
@RestController
@RequestMapping("/applications")
@CrossOrigin(origins = "http://localhost:5173")
public class CandidateApplicationController {

    private final CandidateApplicationService candidateApplicationService;

    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    @PostMapping("/{username}")
    public ResponseEntity<?> addCandidateApplication(
            @PathVariable String username,
            @RequestParam Integer requirementId
    ) {
        log.info("Received request to add CandidateApplication for candidate : {}", username);
        try {
            CandidateApplication candidateApplication = candidateApplicationService.addCandidateApplication(username, requirementId);
            return ResponseEntity.ok(true);
        } catch (DocumentMissing e) {
            return ResponseEntity.badRequest().body(e.getMessage());

        }
    }
}

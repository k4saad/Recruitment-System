package com.global.RecruitmentSystem.controller;

import com.global.RecruitmentSystem.exceptions.MedicalReportRetrievalException;
import com.global.RecruitmentSystem.exceptions.ResumeRetrievalException;
import com.global.RecruitmentSystem.model.Candidate;
import com.global.RecruitmentSystem.model.Client;
import com.global.RecruitmentSystem.response.CandidateDetailsResponse;
import com.global.RecruitmentSystem.response.ClientResponse;
import com.global.RecruitmentSystem.service.CandidateService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Slf4j
@RestController
@RequestMapping("/candidate")
@CrossOrigin(origins = "http://localhost:5173")
public class CandidateController {
    private final CandidateService candidateService;


    @GetMapping("/{username}")
    public ResponseEntity<CandidateDetailsResponse> getCandidateDetails(
            @PathVariable String username
    ){
        log.info("Received request to get Candidate details with username : {}", username);
        Candidate candidate = candidateService.findByUsername(username);
        log.info("Converting Candidate to CandidateDetailResponse");
        CandidateDetailsResponse candidateDetailsResponse = getCandidateDetailsResponse(candidate);
        log.info("Successfully Converted Candidate to CandidateDetailResponse");
        return ResponseEntity.ok(candidateDetailsResponse);
    }

    @PutMapping("/{username}")
    public ResponseEntity<CandidateDetailsResponse> updateCandidateDetails(
            @PathVariable String username,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String contactNumber,
            @RequestParam(required = false) MultipartFile resume,
            @RequestParam(required = false) MultipartFile medicalReport
    ) throws IOException {
        log.info("Received request to update candidate profile with username : {}", username);
        log.info("Checking if resume is null or not");
        byte[] resumeBytes = resume != null ? resume.getBytes() : null;
        log.info("Checking if medical report is null or not");
        byte[] medicalReportBytes = medicalReport != null ? medicalReport.getBytes() : null;
        log.info("Updating candidate profile");
        Candidate candidate = candidateService.updateProfile(username, name, contactNumber, resumeBytes, medicalReportBytes);
        log.info("Successfully updated candidate profile");
        log.info("Converting Candidate to CandidateDetailResponse");
        CandidateDetailsResponse candidateDetailsResponse = getCandidateDetailsResponse(candidate);
        log.info("Successfully Converted Candidate to CandidateDetailResponse");
        return ResponseEntity.ok(candidateDetailsResponse);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<CandidateDetailsResponse>> getAllCandidate(){
        List<CandidateDetailsResponse> candidateDetailsResponses = new ArrayList<>();
        List<Candidate> candidates = candidateService.findAllCandidates();
        for(Candidate candidate : candidates){
            CandidateDetailsResponse candidateDetailsResponse = getCandidateDetailsResponse(candidate);
            candidateDetailsResponses.add(candidateDetailsResponse);
        }
        return ResponseEntity.ok(candidateDetailsResponses);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("{candidateId}")
    public ResponseEntity<Boolean> deleteCandidateById(
            @PathVariable Integer candidateId
    ){
        try{
            log.info("Received request to delete candidate with id : {}", candidateId);
            candidateService.deleteCandidateById(candidateId);
            log.info("Candidate deleted successfully");
            return ResponseEntity.ok(true);
        }catch(Error error){
            return ResponseEntity.ok(false);
        }
    }

    private CandidateDetailsResponse getCandidateDetailsResponse(Candidate candidate) {
        byte[] resumeBytes = null;
        byte[] medicalReportBytes = null;
        Blob resumeBlob = candidate.getResume();
        Blob medicalReportBlob = candidate.getMedicalReport();
        if(resumeBlob != null) {
            try{
                resumeBytes = resumeBlob.getBytes(1, (int) resumeBlob.length());
            } catch (SQLException e) {
                throw new ResumeRetrievalException();
            }
        }
        if(medicalReportBlob != null){
            try{
                medicalReportBytes = medicalReportBlob.getBytes(1, (int) medicalReportBlob.length());
            } catch (SQLException e) {
                throw new MedicalReportRetrievalException();
            }
        }

        return new CandidateDetailsResponse(candidate.getCandidateId(),
                candidate.getName(), candidate.getContactNumber(),
                resumeBytes, medicalReportBytes, candidate.getMedicalStatus(),
                candidate.getMedicalValidity(), candidate.getUsername()

        );
    }
}

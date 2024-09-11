package com.global.RecruitmentSystem.controller;

import com.global.RecruitmentSystem.exceptions.*;
import com.global.RecruitmentSystem.model.CandidateApplication;
import com.global.RecruitmentSystem.model.CandidateVisaDocument;
import com.global.RecruitmentSystem.model.Ticket;
import com.global.RecruitmentSystem.response.*;
import com.global.RecruitmentSystem.service.CandidateApplicationService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

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


    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    @GetMapping("/{username}")
    public ResponseEntity<List<CandidateApplicationCardResponse>> getCandidateApplications(
            @PathVariable String username
    ){
        log.info("Received request for CandidateApplication for candidate : {}", username);
        List<CandidateApplicationCardResponse> candidateApplicationCardResponses = new ArrayList<>();
        List<CandidateApplication> candidateApplications = candidateApplicationService
                .getCandidateApplicationsByUsername(username);
        for(CandidateApplication candidateApplication : candidateApplications){
            CandidateApplicationCardResponse candidateApplicationCardResponse =
                    getCandidateApplicationCardResponse(candidateApplication);
            candidateApplicationCardResponses.add(candidateApplicationCardResponse);
        }
        return ResponseEntity.ok(candidateApplicationCardResponses);
    }


    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    @GetMapping("/detail/{applicationId}")
    public ResponseEntity<CandidateApplicationDetailResponse> getCandidateApplicationById(
            @PathVariable Integer applicationId
    ){
        log.info("Received request for candidate application detail");
        CandidateApplication candidateApplication = candidateApplicationService
                .getCandidateApplicationById(applicationId);
        log.info("Converting CandidateApplication to CandidateApplicationDetailResponse");
        CandidateApplicationDetailResponse candidateApplicationDetailResponse =
                getCandidateApplicationDetailResponse(candidateApplication);
        return ResponseEntity.ok(candidateApplicationDetailResponse);
    }


    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    @PutMapping("/withdraw/{applicationId}")
    public ResponseEntity<Boolean> withdrawApplication(
            @PathVariable Integer applicationId
    ){
        // TODO -- Implement withdraw application
        return ResponseEntity.ok(false);
    }

    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    @PutMapping("/accept/{applicationId}")
    public ResponseEntity<Boolean> acceptOffer(
            @PathVariable Integer applicationId
    ){
        // TODO -- Implement accept offer
        return ResponseEntity.ok(false);
    }

    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    @PutMapping("/reject/{applicationId}")
    public ResponseEntity<Boolean> rejectOffer(
            @PathVariable Integer applicationId
    ){
        // TODO -- Implement reject offer
        return ResponseEntity.ok(false);
    }


    @PreAuthorize("hasRole('ROLE_CLIENT')")
    @PutMapping("/status/underreview/{applicationId}")
    public ResponseEntity<Boolean> updateStatusToUnderReview(
            @PathVariable Integer applicationId
    ){
        log.info("Received request to update application status to UNDER_REVIEW : {}", applicationId);
        candidateApplicationService.updateStatusToUnderReview(applicationId);
        return ResponseEntity.ok(true);
    }

    @PreAuthorize("hasRole('ROLE_CLIENT')")
    @GetMapping("/requirements/{requirementId}")
    public ResponseEntity<List<ApplicantCardResponse>> getCandidateApplicationsByRequirement(
            @PathVariable Integer requirementId
    ){
        log.info("Received request for CandidateApplications for requirementId : {}", requirementId);
        List<ApplicantCardResponse> applicantCardResponses = new ArrayList<>();
        log.info("Getting all CandidateApplications for requirementId : {}", requirementId);
        List<CandidateApplication> candidateApplications = candidateApplicationService
                .getCandidateApplicationsByRequirementId(requirementId);
        log.info("Converting CandidateApplication to ApplicantCardResponse");
        for(CandidateApplication candidateApplication : candidateApplications){
            ApplicantCardResponse applicantCardResponse =
                    getApplicantCardResponse(candidateApplication);
            applicantCardResponses.add(applicantCardResponse);
        }
        log.info("Successfully converted CandidateApplication to ApplicantCardResponse");
        return ResponseEntity.ok(applicantCardResponses);
    }

    @PreAuthorize("hasRole('ROLE_CLIENT')")
    @GetMapping("/detail/client/{applicationId}")
    public ResponseEntity<CandidateApplicationDetailForClientResponse> getCandidateApplicationDetailForClientResponse(
            @PathVariable Integer applicationId
    ){
        log.info("Received request for candidate application detail for client");
        CandidateApplication candidateApplication = candidateApplicationService
                .getCandidateApplicationById(applicationId);
        log.info("Converting CandidateApplication to CandidateApplicationDetailForClientResponse");
        CandidateApplicationDetailForClientResponse candidateApplicationDetailForClientResponse =
                convertToCandidateApplicationDetailResponse(candidateApplication);
        log.info("Successfully converted CandidateApplication to CandidateApplicationDetailForClientResponse");
        return ResponseEntity.ok(candidateApplicationDetailForClientResponse);
    }

    @PreAuthorize("hasRole('ROLE_CLIENT')")
    @PutMapping("/reject/applicant/{applicationId}")
    public ResponseEntity<Boolean> rejectApplicant(
            @PathVariable Integer applicationId
    ){
        log.info("Request received to update application status to rejected");
        candidateApplicationService.rejectApplicant(applicationId);
        return ResponseEntity.ok(true);
    }

    @PreAuthorize("hasRole('ROLE_CLIENT')")
    @PutMapping("/fit/{applicationId}")
    public ResponseEntity<Boolean> markApplicantAsFit(
            @PathVariable Integer applicationId
    ){
        log.info("Request received to update application status to fit");
        candidateApplicationService.markAsFit(applicationId);
        return ResponseEntity.ok(true);
    }

    @PreAuthorize("hasRole('ROLE_CLIENT')")
    @PutMapping("/unfit/{applicationId}")
    public ResponseEntity<Boolean> markApplicantAsUnfit(
            @PathVariable Integer applicationId
    ){
        log.info("Request received to update application status to unfit");
        candidateApplicationService.markAsUnfit(applicationId);
        return ResponseEntity.ok(true);
    }

    private CandidateApplicationDetailForClientResponse convertToCandidateApplicationDetailResponse(CandidateApplication candidateApplication) {
        CandidateVisaDocumentResponse candidateVisaDocumentResponse = candidateApplication.getCandidateVisaDocument() != null ?
                getCandidateVisaDocumentResponse(candidateApplication.getCandidateVisaDocument()) : null;
        CandidateTicketResponse candidateTicketResponse = candidateApplication.getTicket() != null ?
                getCandidateTicketResponse(candidateApplication.getTicket()) : null;

        byte[] resumeBytes = null;
        Blob resumeBlob = candidateApplication.getCandidate().getResume();
        byte[] medicalReportBytes = null;
        Blob medicalReportBlob = candidateApplication.getCandidate().getMedicalReport();
        if(resumeBlob != null){
            try{
                resumeBytes = resumeBlob.getBytes(1, (int) resumeBlob.length());
            } catch (SQLException e) {
                throw new ResumeRetrievalException("Error retrieving Candidate resume");
            }
        }
        if(medicalReportBlob != null){
            try{
                medicalReportBytes = medicalReportBlob.getBytes(1, (int) medicalReportBlob.length());
            } catch (SQLException e) {
                throw new MedicalReportRetrievalException("Error retrieving Candidate medical report");
            }
        }

        return new CandidateApplicationDetailForClientResponse(
                candidateApplication.getApplicationId(), candidateApplication.getStatus(),
                candidateApplication.getDateApplied(), candidateApplication.getInterview(),
                candidateVisaDocumentResponse,
                candidateTicketResponse,
                resumeBytes,
                medicalReportBytes,
                candidateApplication.getClientRequirement().getRequirementId(),
                candidateApplication.getClientRequirement().getTitle(),
                candidateApplication.getClientRequirement().getMinSalary(),
                candidateApplication.getClientRequirement().getMaxSalary(),
                candidateApplication.getClientRequirement().getCurrency(),
                candidateApplication.getClientRequirement().getLocation(),
                candidateApplication.getCandidate().getName(),
                candidateApplication.getCandidate().getMedicalStatus(),
                candidateApplication.getCandidate().getMedicalValidity()
        );

    }

    private ApplicantCardResponse getApplicantCardResponse(CandidateApplication candidateApplication) {
        return new ApplicantCardResponse(
                candidateApplication.getApplicationId(), candidateApplication.getStatus(),
                candidateApplication.getCandidate().getName()
        );
    }

    private CandidateApplicationDetailResponse getCandidateApplicationDetailResponse(CandidateApplication candidateApplication) {
        CandidateVisaDocumentResponse candidateVisaDocumentResponse = candidateApplication.getCandidateVisaDocument() != null ?
                getCandidateVisaDocumentResponse(candidateApplication.getCandidateVisaDocument()) : null;
        CandidateTicketResponse candidateTicketResponse = candidateApplication.getTicket() != null ?
                getCandidateTicketResponse(candidateApplication.getTicket()) : null;
        return new CandidateApplicationDetailResponse(
                candidateApplication.getApplicationId(), candidateApplication.getStatus(),
                candidateApplication.getDateApplied(), candidateApplication.getInterview(),
                candidateVisaDocumentResponse,
                candidateTicketResponse,
                candidateApplication.getClientRequirement().getTitle(),
                candidateApplication.getClientRequirement().getDescription(),
                candidateApplication.getClientRequirement().getMinSalary(),
                candidateApplication.getClientRequirement().getMaxSalary(),
                candidateApplication.getClientRequirement().getCurrency(),
                candidateApplication.getClientRequirement().getLocation(),

                candidateApplication.getClientRequirement().getClient().getName(),
                candidateApplication.getClientRequirement().getClient().getOrganizationName()
        );
    }

    private CandidateTicketResponse getCandidateTicketResponse(Ticket ticket) {
        byte[] ticketBytes = null;
        Blob ticketBlob = ticket.getTicket();
        if(ticketBlob != null){
            try{
                ticketBytes = ticketBlob.getBytes(1, (int) ticketBlob.length());
            } catch (SQLException e) {
                throw new TicketRetrievalException("Error retrieving Candidate Visa document");
            }
        }
        return new CandidateTicketResponse(
                ticket.getTicketId(),
                ticketBytes,
                ticket.getStatus()
        );
    }

    private CandidateVisaDocumentResponse getCandidateVisaDocumentResponse(CandidateVisaDocument candidateVisaDocument) {
        byte[] visaDocumentBytes = null;
        Blob visaDocumentBlob = candidateVisaDocument.getVisaDocument();
        if(visaDocumentBlob != null){
            try{
                visaDocumentBytes = visaDocumentBlob.getBytes(1, (int) visaDocumentBlob.length());
            } catch (SQLException e) {
                throw new VisaDocumentRetrievalException("Error retrieving Candidate Visa document");
            }
        }
        return new CandidateVisaDocumentResponse(
                candidateVisaDocument.getVisaDocumentId(),
                visaDocumentBytes
        );
    }

    private CandidateApplicationCardResponse getCandidateApplicationCardResponse(CandidateApplication candidateApplication) {
        return new CandidateApplicationCardResponse(
                candidateApplication.getApplicationId(),candidateApplication.getStatus(),
                candidateApplication.getClientRequirement().getTitle(),
                candidateApplication.getClientRequirement().getClient().getOrganizationName()
        );
    }
}

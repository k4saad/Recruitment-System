package com.global.RecruitmentSystem.controller;

import com.global.RecruitmentSystem.exceptions.DocumentMissing;
import com.global.RecruitmentSystem.exceptions.TicketRetrievalException;
import com.global.RecruitmentSystem.exceptions.VisaDocumentRetrievalException;
import com.global.RecruitmentSystem.model.CandidateApplication;
import com.global.RecruitmentSystem.model.CandidateVisaDocument;
import com.global.RecruitmentSystem.model.ClientRequirement;
import com.global.RecruitmentSystem.model.Ticket;
import com.global.RecruitmentSystem.response.CandidateApplicationCardResponse;
import com.global.RecruitmentSystem.response.CandidateApplicationDetailResponse;
import com.global.RecruitmentSystem.response.CandidateTicketResponse;
import com.global.RecruitmentSystem.response.CandidateVisaDocumentResponse;
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

    @PutMapping("/withdraw/{username}")
    public ResponseEntity<Boolean> withdrawApplication(
            @RequestParam Integer applicationId
    ){
        // TODO -- Implement withdraw application
        return ResponseEntity.ok(false);
    }

    @PutMapping("/accept/{username}")
    public ResponseEntity<Boolean> acceptOffer(
            @RequestParam Integer applicationId
    ){
        // TODO -- Implement accept offer
        return ResponseEntity.ok(false);
    }

    @PutMapping("/reject/{username}")
    public ResponseEntity<Boolean> rejectOffer(
            @RequestParam Integer applicationId
    ){
        // TODO -- Implement reject offer
        return ResponseEntity.ok(false);
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

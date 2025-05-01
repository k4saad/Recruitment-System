package com.global.RecruitmentSystem.service;

import com.global.RecruitmentSystem.enums.CandidateApplicationStatus;
import com.global.RecruitmentSystem.enums.MedicalStatus;
import com.global.RecruitmentSystem.enums.TicketStatus;
import com.global.RecruitmentSystem.exceptions.CandidateApplicationNotFound;
import com.global.RecruitmentSystem.exceptions.ClientRequirementNotFound;
import com.global.RecruitmentSystem.exceptions.DocumentMissing;
import com.global.RecruitmentSystem.exceptions.InternalServerException;
import com.global.RecruitmentSystem.model.*;
import com.global.RecruitmentSystem.repository.CandidateApplicationRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.SQLException;
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
            throw new DocumentMissing();
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
                () -> new CandidateApplicationNotFound(applicationId)
        );
    }


    public void updateStatusToUnderReview(Integer applicationId) {
        CandidateApplication candidateApplication = candidateApplicationRepository.findById(applicationId)
                .orElseThrow(
                        () -> new CandidateApplicationNotFound(applicationId)
                );
        candidateApplication.setStatus(CandidateApplicationStatus.UNDER_REVIEW);
        candidateApplicationRepository.save(candidateApplication);
    }

    public List<CandidateApplication> getCandidateApplicationsByRequirementId(Integer requirementId) {
          return candidateApplicationRepository.findByClientRequirementRequirementId(requirementId);
    }

    public void rejectApplicant(Integer applicationId) {
        CandidateApplication candidateApplication = candidateApplicationRepository.findById(applicationId).orElseThrow(
                () -> new CandidateApplicationNotFound(applicationId)
        );
        if(candidateApplication.getInterview() != null){
            candidateApplication.setInterview(null);
        }
        candidateApplication.setInterview(null);
        candidateApplication.setStatus(CandidateApplicationStatus.REJECTED);
        candidateApplicationRepository.save(candidateApplication);
    }

    public void markAsFit(Integer applicationId) {
        CandidateApplication candidateApplication = candidateApplicationRepository.findById(applicationId).orElseThrow(
                () -> new CandidateApplicationNotFound(applicationId)
        );
        candidateApplication.getCandidate().setMedicalStatus(MedicalStatus.FIT);
        candidateApplicationRepository.save(candidateApplication);
    }

    public void markAsUnfit(Integer applicationId) {
        CandidateApplication candidateApplication = candidateApplicationRepository.findById(applicationId).orElseThrow(
                () -> new CandidateApplicationNotFound(applicationId)
        );
        candidateApplication.getCandidate().setMedicalStatus(MedicalStatus.UNFIT);
        candidateApplicationRepository.save(candidateApplication);
    }


    public void addTicket(Integer applicationId, MultipartFile ticketFile) throws IOException {
        Ticket ticket = Ticket.builder()
                .status(TicketStatus.BOOKED)
                .build();
        byte[] ticketBytes = ticketFile != null ? ticketFile.getBytes() : null;
        CandidateApplication candidateApplication = getCandidateApplicationById(applicationId);
        if(ticketBytes != null && ticketBytes.length > 0){
            try{
                ticket.setTicket(new SerialBlob(ticketBytes));
            }catch (SQLException exception){
                throw new InternalServerException("ticket");
            }
        }
        candidateApplication.addTicket(ticket);
        candidateApplicationRepository.save(candidateApplication);

    }

    public void addVisa(Integer applicationId, MultipartFile visaFile) throws IOException {
        CandidateVisaDocument visa = new CandidateVisaDocument();
        byte[] visaBytes = visaFile != null ? visaFile.getBytes() : null;
        CandidateApplication candidateApplication = getCandidateApplicationById(applicationId);
        if(visaBytes != null && visaBytes.length > 0){
            try{
                visa.setVisaDocument(new SerialBlob(visaBytes));
            }catch (SQLException exception){
                throw new InternalServerException("visa");
            }
        }
        candidateApplication.addVisa(visa);
        candidateApplicationRepository.save(candidateApplication);
    }
}

package com.global.RecruitmentSystem.response;

import com.global.RecruitmentSystem.enums.CandidateApplicationStatus;
import com.global.RecruitmentSystem.enums.MedicalStatus;
import com.global.RecruitmentSystem.enums.MedicalValidity;
import com.global.RecruitmentSystem.model.Interview;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.tomcat.util.codec.binary.Base64;

import java.math.BigDecimal;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CandidateApplicationDetailForClientResponse {
    private Integer applicationId;
    private CandidateApplicationStatus candidateApplicationStatus;
    private LocalDate dateApplied;

    private Interview interview;
    private CandidateVisaDocumentResponse candidateVisaDocument;
    private CandidateTicketResponse ticket;
    private String resume;
    private String medicalDocument;

    private Integer clientRequirementId;
    private String clientRequirementTitle;
    private BigDecimal clientRequirementMinSalary;
    private BigDecimal clientRequirementMaxSalary;
    private String clientRequirementCurrency;
    private String clientRequirementLocation;

    private String candidateName;
    private MedicalStatus candidateMedicalStatus;
    private MedicalValidity candidateMedicalValidity;

    public CandidateApplicationDetailForClientResponse(Integer applicationId,
                                                       CandidateApplicationStatus candidateApplicationStatus, LocalDate dateApplied,
                                                       Interview interview, CandidateVisaDocumentResponse candidateVisaDocument,
                                                       CandidateTicketResponse ticket, byte[] resumeBytes, byte[] medicalDocumentBytes,
                                                       Integer clientRequirementId,
                                                       String clientRequirementTitle, BigDecimal clientRequirementMinSalary,
                                                       BigDecimal clientRequirementMaxSalary,
                                                       String clientRequirementCurrency, String clientRequirementLocation,
                                                       String candidateName, MedicalStatus candidateMedicalStatus,
                                                       MedicalValidity candidateMedicalValidity

    ) {
        this.applicationId = applicationId;
        this.candidateApplicationStatus = candidateApplicationStatus;
        this.dateApplied = dateApplied;
        this.interview = interview;
        this.candidateVisaDocument = candidateVisaDocument;
        this.ticket = ticket;
        this.resume = resumeBytes != null ? Base64.encodeBase64String(resumeBytes) : null;
        this.medicalDocument = medicalDocumentBytes != null ? Base64.encodeBase64String(medicalDocumentBytes) : null;
        this.clientRequirementId = clientRequirementId;
        this.clientRequirementTitle = clientRequirementTitle;
        this.clientRequirementMinSalary = clientRequirementMinSalary;
        this.clientRequirementMaxSalary = clientRequirementMaxSalary;
        this.clientRequirementCurrency = clientRequirementCurrency;
        this.clientRequirementLocation = clientRequirementLocation;
        this.candidateName = candidateName;
        this.candidateMedicalStatus = candidateMedicalStatus;
        this.candidateMedicalValidity = candidateMedicalValidity;
    }
}

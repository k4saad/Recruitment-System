package com.global.RecruitmentSystem.response;

import com.global.RecruitmentSystem.enums.CandidateApplicationStatus;
import com.global.RecruitmentSystem.model.CandidateVisaDocument;
import com.global.RecruitmentSystem.model.Interview;
import com.global.RecruitmentSystem.model.Payment;
import com.global.RecruitmentSystem.model.Ticket;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CandidateApplicationDetailResponse {
    private Integer applicationId;
    private CandidateApplicationStatus candidateApplicationStatus;
    private LocalDate dateApplied;

    private Interview interview;
    private CandidateVisaDocumentResponse candidateVisaDocument;
    private CandidateTicketResponse ticket;


    private String clientRequirementTitle;
    private String clientRequirementDescription;
    private BigDecimal clientRequirementMinSalary;
    private BigDecimal clientRequirementMaxSalary;
    private String clientRequirementCurrency;
    private String clientRequirementLocation;


    private String clientName;
    private String clientRequirementOrganizationName;
}

package com.global.RecruitmentSystem.response;

import com.global.RecruitmentSystem.enums.ClientRequirementStatus;
import com.global.RecruitmentSystem.model.Client;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor

public class ClientRequirementTableResponse {

    private Integer requirementId;
    private String title;

    private ClientRequirementStatus status;

    private BigDecimal minSalary;
    private BigDecimal maxSalary;
    private String currency;
    private Integer numberOfApplicants;
}

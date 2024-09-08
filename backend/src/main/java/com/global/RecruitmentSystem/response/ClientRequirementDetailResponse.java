package com.global.RecruitmentSystem.response;

import com.global.RecruitmentSystem.enums.ClientRequirementStatus;
import com.global.RecruitmentSystem.enums.SelectionProcessType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.math.BigDecimal;
import java.time.LocalDate;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class ClientRequirementDetailResponse {
    private Integer requirementId;
    private String title;
    private String description;
    private ClientRequirementStatus status;
    private LocalDate datePosted;
    private LocalDate validTill;
    private BigDecimal minSalary;
    private BigDecimal maxSalary;
    private String currency;
    private String location;

    private String ClientName;
    private String ClientOrganizationName;
}

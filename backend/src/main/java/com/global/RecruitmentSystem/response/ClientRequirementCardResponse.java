package com.global.RecruitmentSystem.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class ClientRequirementCardResponse {
    private Integer requirementId;
    private String title;
    private String organizationName;
    private BigDecimal minSalary;
    private BigDecimal maxSalary;
    private String currency;
    private String location;
}

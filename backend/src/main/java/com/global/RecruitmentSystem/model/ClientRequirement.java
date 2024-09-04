package com.global.RecruitmentSystem.model;

import com.global.RecruitmentSystem.enums.ClientRequirementStatus;
import com.global.RecruitmentSystem.enums.SelectionProcessType;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;


@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClientRequirement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer requirementId;

    @ManyToOne
    @JoinColumn(
            name = "client_id"
    )
    private Client client;

    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private ClientRequirementStatus status;

    private LocalDate datePosted;
    private LocalDate validTill;
    private BigDecimal minSalary;
    private BigDecimal maxSalary;
    private String currency;
    private String location;
    private SelectionProcessType selectionProcessType;

    @OneToMany(
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            mappedBy = "clientRequirement",
            orphanRemoval = true
    )
    private List<CandidateApplication> candidateApplications;


}


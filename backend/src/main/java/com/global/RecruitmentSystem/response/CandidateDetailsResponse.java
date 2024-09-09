package com.global.RecruitmentSystem.response;

import com.global.RecruitmentSystem.enums.CandidateStatus;
import com.global.RecruitmentSystem.enums.MedicalStatus;
import com.global.RecruitmentSystem.enums.MedicalValidity;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.tomcat.util.codec.binary.Base64;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class CandidateDetailsResponse {
    private Integer candidateId;

    private String name;
    private String contactNumber;


    private String resume;

    private String medicalReport;

    private MedicalStatus medicalStatus;

    private MedicalValidity medicalValidity;

    private String username;

//    TODO - implement this , currently not doing because of time constraint
//    private String documents;


    public CandidateDetailsResponse(Integer candidateId, String name,
                                    String contactNumber, byte[] resumeBytes,
                                    byte[] medicalReportBytes, MedicalStatus medicalStatus,
                                    MedicalValidity medicalValidity, String username
    ) {

        this.candidateId = candidateId;
        this.name = name;
        this.contactNumber = contactNumber;
        this.resume = resumeBytes != null ? Base64.encodeBase64String(resumeBytes) : null;
        this.medicalReport = medicalReportBytes != null ? Base64.encodeBase64String(medicalReportBytes) : null;
        this.medicalStatus = medicalStatus;
        this.medicalValidity = medicalValidity;
        this.username = username;
    }
}

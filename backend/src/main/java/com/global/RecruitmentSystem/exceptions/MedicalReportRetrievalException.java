package com.global.RecruitmentSystem.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.sql.SQLException;

import static com.global.RecruitmentSystem.util.Constants.Exceptions.MEDICAL_REPORT;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class MedicalReportRetrievalException extends RuntimeException {
    public MedicalReportRetrievalException() {
        super(MEDICAL_REPORT);
    }
}

package com.global.RecruitmentSystem.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.sql.SQLException;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class MedicalReportRetrievalException extends RuntimeException {
    public MedicalReportRetrievalException(String s) {
        super(s);
    }
}

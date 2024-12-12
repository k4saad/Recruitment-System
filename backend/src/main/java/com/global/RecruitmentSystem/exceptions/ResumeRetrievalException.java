package com.global.RecruitmentSystem.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ResumeRetrievalException extends RuntimeException {
    public ResumeRetrievalException(String s) {
        super(s);
    }
}

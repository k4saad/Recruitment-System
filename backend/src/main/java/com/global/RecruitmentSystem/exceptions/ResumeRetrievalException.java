package com.global.RecruitmentSystem.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import static com.global.RecruitmentSystem.util.Constants.Exceptions.CANDIDATE_RESUME;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ResumeRetrievalException extends RuntimeException {
    public ResumeRetrievalException() {
        super(CANDIDATE_RESUME);
    }
}

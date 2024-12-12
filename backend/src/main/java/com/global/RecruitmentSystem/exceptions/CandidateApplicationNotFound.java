package com.global.RecruitmentSystem.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import static com.global.RecruitmentSystem.util.Constants.Exceptions.APPLICATION_NOT_FOUND;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class CandidateApplicationNotFound extends RuntimeException {

    public CandidateApplicationNotFound(Integer applicationId) {
        super(String.format(APPLICATION_NOT_FOUND, applicationId));
    }
}

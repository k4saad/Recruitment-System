package com.global.RecruitmentSystem.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import static com.global.RecruitmentSystem.util.Constants.Exceptions.SERVER_ERROR;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class InternalServerException extends RuntimeException {
    public InternalServerException(String component) {
        super(SERVER_ERROR.formatted(component));
    }
}

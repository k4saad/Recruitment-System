package com.global.RecruitmentSystem.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class TicketRetrievalException extends RuntimeException {
    public TicketRetrievalException(String s) {
        super(s);
    }
}

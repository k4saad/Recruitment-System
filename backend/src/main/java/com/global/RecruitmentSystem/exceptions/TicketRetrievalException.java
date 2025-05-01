package com.global.RecruitmentSystem.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import static com.global.RecruitmentSystem.util.Constants.Exceptions.TICKER_RETRIEVAL;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class TicketRetrievalException extends RuntimeException {
    public TicketRetrievalException() {
        super(TICKER_RETRIEVAL);
    }
}

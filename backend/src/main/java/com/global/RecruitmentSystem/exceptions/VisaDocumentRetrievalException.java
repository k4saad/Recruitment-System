package com.global.RecruitmentSystem.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import static com.global.RecruitmentSystem.util.Constants.Exceptions.VISA_DOCUMENT;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class VisaDocumentRetrievalException extends RuntimeException {
    public VisaDocumentRetrievalException() {
        super(VISA_DOCUMENT);
    }
}

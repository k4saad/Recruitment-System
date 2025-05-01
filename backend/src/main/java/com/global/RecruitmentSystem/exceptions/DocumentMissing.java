package com.global.RecruitmentSystem.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import static com.global.RecruitmentSystem.util.Constants.Exceptions.DOCUMENT_MISSING;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class DocumentMissing extends RuntimeException{
    public DocumentMissing(){
        super(DOCUMENT_MISSING);
    }
}

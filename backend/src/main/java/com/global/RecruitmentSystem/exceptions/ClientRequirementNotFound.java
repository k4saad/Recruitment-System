package com.global.RecruitmentSystem.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import static com.global.RecruitmentSystem.util.Constants.Exceptions.REQUIREMENT_NOT_FOUND;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ClientRequirementNotFound extends RuntimeException {
    public ClientRequirementNotFound(Integer requirementId){
        super(REQUIREMENT_NOT_FOUND.formatted(requirementId));
    }

}

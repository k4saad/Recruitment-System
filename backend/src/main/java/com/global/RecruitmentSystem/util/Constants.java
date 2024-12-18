package com.global.RecruitmentSystem.util;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class Constants {

    public static final class Exceptions{
        public static final String APPLICATION_NOT_FOUND = "Candidature With ApplicationId %d Does Not Exist";
        public static final String REQUIREMENT_NOT_FOUND = "Client Requirement With RequirementId %d Does Not Exist";
        public static final String DOCUMENT_MISSING = "Please Upload Resume";
        public static final String MEDICAL_REPORT = "Error While Retrieving Candidate Medical Report";
        public static final String CANDIDATE_RESUME = "Error While Retrieving Candidate Resume";
        public static final String TICKER_RETRIEVAL = "Error While Retrieving Candidate Ticker";
        public static final String USER_ALREADY_EXISTS = "User With Username %s Already Exists";
        public static final String VISA_DOCUMENT = "Error While Retrieving Candidate Visa Document";
        public static final String SERVER_ERROR = "Error While Updating %s";
    }
}

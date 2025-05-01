package com.global.RecruitmentSystem.exceptions;

import com.global.RecruitmentSystem.util.Util;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.function.TriFunction;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

/**
 * With this exception handler, We no longer need to handle exceptions
 * in controller-layer. The moment an exception is thrown this handler
 * will intercept the exception and finds whether there's a some handling.
 * If so, he will handle it.
 */

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    /**
     * If an exception is thrown, we'd like to know the uri path that caused it
     * as well as the HttpMethod, the message of the exception(detail), and the status returned
     * and of course the date it occurred at.
     */
    private ResponseEntity<ProblemDetail> handleException(
            Exception ex,
            HttpServletRequest request,
            String title,
            HttpStatus status,
            String errorCategory) {

        var method = request.getMethod();
        var path = request.getPathInfo();
        var date = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));


        var problemDetail = ProblemDetail.forStatusAndDetail(status, ex.getMessage());
        problemDetail.setTitle(title);
        problemDetail.setProperty("errorCategory", errorCategory);
        problemDetail.setProperty("date", date);
        problemDetail.setProperty("methodInvoked", method);
        problemDetail.setProperty("path", path);

        log.error(Util.write(problemDetail));
        return ResponseEntity.status(status).body(problemDetail);

    }

    private TriFunction<Exception,HttpServletRequest,String,ResponseEntity<ProblemDetail>> handleRetrievalException(){
        return (ex, request, title) -> handleException(
                ex,
                request,
                title,
                HttpStatus.BAD_REQUEST,
                "RETRIEVAL_FAILED");
    }

    private TriFunction<Exception,HttpServletRequest,String,ResponseEntity<ProblemDetail>> handleNotFoundException(){
        return (ex, request, title) -> handleException(
                ex,
                request,
                title,
                HttpStatus.NOT_FOUND,
                "RESOURCE_NOT_FOUND");
    }

    private TriFunction<Exception,HttpServletRequest,String,ResponseEntity<ProblemDetail>> handleAlreadyExistsException(){
        return (ex, request, title) -> handleException(
                ex,
                request,
                title,
                HttpStatus.BAD_REQUEST,
                "RESOURCE_ALREADY_EXISTS");
    }

    @ExceptionHandler(InternalServerException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<ProblemDetail> handleGeneralException(InternalServerException ex, HttpServletRequest request) {
        return handleException(
                ex,
                request,
                "General Exception",
                HttpStatus.INTERNAL_SERVER_ERROR,
                "GENERAL_ERROR");
    }

    @ExceptionHandler(DocumentMissing.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<ProblemDetail> handleDocumentMissingException(DocumentMissing ex, HttpServletRequest request) {
        return handleNotFoundException().apply(ex,request,"Document Not Found");
    }


    @ExceptionHandler(ClientRequirementNotFound.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<ProblemDetail> handleClientRequirementNotFoundException(ClientRequirementNotFound ex, HttpServletRequest request) {
        return handleNotFoundException().apply(ex,request,"Client Requirement Not Found");
    }

    @ExceptionHandler(CandidateApplicationNotFound.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<ProblemDetail> handleNotFoundCandidatureApplication(CandidateApplicationNotFound ex, HttpServletRequest request) {
        return handleNotFoundException().apply(ex,request,"Candidature Application Not Found");
    }



    @ExceptionHandler(VisaDocumentRetrievalException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ProblemDetail> handleVisaDocumentRetrievalException(VisaDocumentRetrievalException ex, HttpServletRequest request) {
        return handleRetrievalException().apply(ex,request,"Visa Document Retrieval Exception");
    }

    @ExceptionHandler(ResumeRetrievalException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ProblemDetail> handleResumeRetrievalException(ResumeRetrievalException ex, HttpServletRequest request) {
        return handleRetrievalException().apply(ex,request,"Resume Retrieval Exception");
    }

    @ExceptionHandler(TicketRetrievalException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ProblemDetail> handleTicketRetrievalException(TicketRetrievalException ex, HttpServletRequest request) {
        return handleRetrievalException().apply(ex,request,"Ticket Retrieval Exception");
    }

    @ExceptionHandler(MedicalReportRetrievalException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ProblemDetail> handleMedicalReportRetrievalException(MedicalReportRetrievalException ex, HttpServletRequest request) {
        return handleRetrievalException().apply(ex,request,"Medical Report Retrieval Exception");
    }



    @ExceptionHandler(UserAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ProblemDetail> handleUserAlreadyExistsException(UserAlreadyExistsException ex, HttpServletRequest request) {
        return handleAlreadyExistsException().apply(ex,request,"User Already Exists");
    }


}

package com.global.RecruitmentSystem.controller;

import com.global.RecruitmentSystem.model.CandidateApplication;
import com.global.RecruitmentSystem.service.CandidateApplicationService;
import com.global.RecruitmentSystem.service.paymentService;
import jakarta.activation.DataSource;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.util.ByteArrayDataSource;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;

import java.io.InputStream;
import java.sql.Blob;

@AllArgsConstructor
@Slf4j
@RestController
@RequestMapping("/payment")
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {
    private final com.global.RecruitmentSystem.service.paymentService paymentService;
    private final CandidateApplicationService candidateApplicationService;
    private final JavaMailSender mailSender;

    @PostMapping("/{applicationId}")
    public ResponseEntity<Boolean> addPayment(
            @PathVariable Integer applicationId
    ){
        Boolean success = paymentService.addPayment(applicationId);
        if(success){
            try{
                mailReceipt(applicationId);
            }catch(MessagingException e){
                e.printStackTrace();
            }
        }
        return ResponseEntity.ok(success);

    }

    private void mailReceipt(Integer applicationId) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        CandidateApplication candidateApplication = candidateApplicationService
                .getCandidateApplicationById(applicationId);
        String email = candidateApplication.getClientRequirement().getClient().getEmail();

        helper.setFrom("globalmanpower108b@gmail.com");
        helper.setTo(email);
        helper.setSubject("Payment Successful");
        helper.setText("Your Payment for candidate " + candidateApplication.getCandidate().getName() + " was successful\nHere is the receipt");

        Blob receiptBlob = candidateApplication.getPayment().getReceipt();

        try (InputStream inputStream = receiptBlob.getBinaryStream()) {

            byte[] receiptBytes = inputStream.readAllBytes();

            DataSource dataSource = new ByteArrayDataSource(receiptBytes, "application/pdf");

            helper.addAttachment("receipt.pdf", dataSource);
        } catch (Exception e) {
            log.error("Error while adding receipt attachment", e);
        }

        mailSender.send(message);

    }
}

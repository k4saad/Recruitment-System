package com.global.RecruitmentSystem.controller;

import com.global.RecruitmentSystem.exceptions.UserAlreadyExistsException;
import com.global.RecruitmentSystem.model.Admin;
import com.global.RecruitmentSystem.model.Candidate;
import com.global.RecruitmentSystem.model.Client;
import com.global.RecruitmentSystem.response.AdminResponse;
import com.global.RecruitmentSystem.response.JwtResponse;
import com.global.RecruitmentSystem.security.User;
import com.global.RecruitmentSystem.security.service.JWTService;
import com.global.RecruitmentSystem.service.AdminService;
import com.global.RecruitmentSystem.service.CandidateService;
import com.global.RecruitmentSystem.service.ClientService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/auth")
@Slf4j
public class AuthController {

    private CandidateService candidateService;
    private ClientService clientService;
    private AdminService adminService;
    private final JWTService jwtService;
    private final JavaMailSender mailSender;
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(5);


    @PostMapping("/register/candidate")
    public ResponseEntity<?> registerCandidate(
            @RequestBody Candidate candidate
    ){
        try{
            if(candidateService.findByUsername(candidate.getUsername()) != null)
                throw new UserAlreadyExistsException("User Already Exists");
            if(clientService.findByUsername(candidate.getUsername()) != null)
                throw new UserAlreadyExistsException("User Already Exists");
            candidateService.register(candidate);
            log.info("Candidate Registered");
            return ResponseEntity.ok("Registration Successful");
        }
        catch (UserAlreadyExistsException userAlreadyExistsException){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(userAlreadyExistsException.getMessage());
        }
    }

    @PostMapping("/register/client")
    public ResponseEntity<?> registerClient(
            @RequestBody Client client
    ){
        try{
            if(candidateService.findByUsername(client.getUsername()) != null)
                throw new UserAlreadyExistsException("User Already Exists");
            if(clientService.findByUsername(client.getUsername()) != null)
                throw new UserAlreadyExistsException("User Already Exists");
            clientService.register(client);
            log.info("Client Registered");
            return ResponseEntity.ok("Registration Successful");
        }
        catch (UserAlreadyExistsException userAlreadyExistsException){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(userAlreadyExistsException.getMessage());
        }
    }

    @PostMapping("/login/candidate")
    public JwtResponse loginCandidate(
            @RequestBody User user
    ){

        return new JwtResponse(candidateService.verify(user));
    }

    @PostMapping("/login/client")
    public JwtResponse loginClient(
            @RequestBody User user
    ){
        return new JwtResponse(clientService.verify(user));
    }

    @PostMapping("/login/admin")
    public JwtResponse loginAdmin(
            @RequestBody User user
    ){
        return new JwtResponse(adminService.verify(user));
    }

    @PostMapping("/forgot-password/{email}")
            public ResponseEntity<String> sendResetPasswordLink(
                    @PathVariable String email
    ) {

        Client client = clientService.findByEmail(email);
        if (client == null) {
            return ResponseEntity.badRequest().body("No user found with that email address.");
        }

        String token = jwtService.generateTokenForEmail(email);


        String resetLink = "http://localhost:5173/reset-password?token=" + token;
        sendEmail(email, resetLink);

        return ResponseEntity.ok("Password reset link has been sent to your email.");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(
            @RequestParam String token,
            @RequestParam String newPassword
    ) {
        log.info("Request received to change password");
        String email = jwtService.extractEmail(token);
        Client client = clientService.findByEmail(email);
        if(jwtService.validateToken(token) && client != null) {
            client.setPassword( bCryptPasswordEncoder.encode(newPassword));
            clientService.save(client);
            return ResponseEntity.ok("Password has been reset successfully.");
        }

        return ResponseEntity.badRequest().body("Invalid token.");
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/admin")
    public ResponseEntity<AdminResponse> getAdminDetails(){
        log.info("Received request for admin details");
        Admin admin = adminService.findByUsername("Admin");
        AdminResponse adminResponse = getAdminResponse(admin);
        return ResponseEntity.ok(adminResponse);
    }

    private AdminResponse getAdminResponse(Admin admin) {
        return new AdminResponse(
                admin.getId(),admin.getName(),
                admin.getUsername(),admin.getEmail()
        );
    }

    private void sendEmail(String toEmail, String resetLink) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setFrom("globalmanpower108b@gmail.com");
            helper.setTo(toEmail);
            helper.setSubject("Reset your password");
            helper.setText("Click on the link below to reset your password: \n" + resetLink);

            mailSender.send(mimeMessage);
            log.info("Password reset email sent to: {}", toEmail);
        } catch (MessagingException e) {
            log.error("Failed to send email", e);
            throw new RuntimeException("Failed to send email.");
        }
    }
}

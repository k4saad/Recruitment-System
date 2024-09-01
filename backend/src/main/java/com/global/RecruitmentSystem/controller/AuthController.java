package com.global.RecruitmentSystem.controller;

import com.global.RecruitmentSystem.exceptions.UserAlreadyExistsException;
import com.global.RecruitmentSystem.model.Candidate;
import com.global.RecruitmentSystem.model.Client;
import com.global.RecruitmentSystem.response.JwtResponse;
import com.global.RecruitmentSystem.security.User;
import com.global.RecruitmentSystem.service.CandidateService;
import com.global.RecruitmentSystem.service.ClientService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/auth")
public class AuthController {

    private CandidateService candidateService;
    private ClientService clientService;


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


}

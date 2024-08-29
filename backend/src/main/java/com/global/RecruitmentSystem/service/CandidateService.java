package com.global.RecruitmentSystem.service;

import com.global.RecruitmentSystem.model.Candidate;
import com.global.RecruitmentSystem.repository.CandidateRepository;
import com.global.RecruitmentSystem.security.service.JWTService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CandidateService {
    private CandidateRepository candidateRepository;
    private AuthenticationManager authenticationManager;
    private JWTService jwtService;

    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(5);


    public Candidate register(Candidate candidate){
        Candidate newCandidate = new Candidate();
        newCandidate.setUsername(candidate.getUsername());
        candidate.setPassword(bCryptPasswordEncoder.encode(candidate.getPassword()));
        return candidateRepository.save(candidate);
    }

    public String verify(Candidate candidate) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        candidate.getUsername(),
                        candidate.getPassword()
                )
        );
        if(authentication.isAuthenticated())
            return jwtService.generateToken(candidate.getUsername());
        else
            return "failure";
    }
}

package com.global.RecruitmentSystem.controller;

import com.global.RecruitmentSystem.model.Candidate;
import com.global.RecruitmentSystem.model.Client;
import com.global.RecruitmentSystem.service.CandidateService;
import com.global.RecruitmentSystem.service.ClientService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class UserController {

    private CandidateService candidateService;
    private ClientService clientService;

    @PostMapping("/register/candidate")
    public Candidate registerCandidate(
            @RequestBody Candidate candidate
    ){
        return candidateService.register(candidate);
    }

    @PostMapping("/register/client")
    public Client registerClient(
            @RequestBody Client client
    ){
        return clientService.register(client);
    }

    @PostMapping("/login/candidate")
    public String loginCandidate(
            @RequestBody Candidate candidate
    ){
        return candidateService.verify(candidate);
    }

    @PostMapping("/login/client")
    public String loginClient(
            @RequestBody Client client
    ){
        return clientService.verify(client);
    }


}

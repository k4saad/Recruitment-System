package com.global.RecruitmentSystem.security.service;

import com.global.RecruitmentSystem.model.Candidate;
import com.global.RecruitmentSystem.model.Client;
import com.global.RecruitmentSystem.repository.CandidateRepository;
import com.global.RecruitmentSystem.repository.ClientRepository;
import com.global.RecruitmentSystem.security.model.CandidatePrincipal;
import com.global.RecruitmentSystem.security.model.ClientPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Candidate candidate = candidateRepository.findByUsername(username);
        if (candidate != null) {
            return new CandidatePrincipal(candidate);
        }

        Client client = clientRepository.findByUsername(username);
        if (client != null) {
            return new ClientPrincipal(client);
        }

        throw new UsernameNotFoundException("User not found with username: " + username);
    }
}
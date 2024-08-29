package com.global.RecruitmentSystem.service;

import com.global.RecruitmentSystem.model.Client;
import com.global.RecruitmentSystem.repository.ClientRepository;
import com.global.RecruitmentSystem.security.service.JWTService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ClientService {
    private ClientRepository clientRepository;
    private AuthenticationManager authenticationManager;
    private JWTService jwtService;


    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(5);


    public Client register(Client client){
        client.setPassword(bCryptPasswordEncoder.encode(client.getPassword()));
        return clientRepository.save(client);
    }


    public String verify(Client client) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        client.getUsername(),
                        client.getPassword()
                )
        );
        if(authentication.isAuthenticated())
            return jwtService.generateToken(client.getUsername());
        else
            return "failure";
    }
}

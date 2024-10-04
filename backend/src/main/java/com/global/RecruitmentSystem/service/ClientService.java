package com.global.RecruitmentSystem.service;

import com.global.RecruitmentSystem.model.Client;
import com.global.RecruitmentSystem.repository.ClientRepository;
import com.global.RecruitmentSystem.security.User;
import com.global.RecruitmentSystem.security.service.JWTService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

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


    public String verify(User user) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(),
                        user.getPassword()
                )
        );
        if(authentication.isAuthenticated())
            return jwtService.generateToken(user.getUsername());
        else
            return "failure";
    }

    public Client findByUsername(String username) {
        return clientRepository.findByUsername(username);
    }

    public List<Client> findAllClient() {
        return clientRepository.findAll();
    }

    public Client findByEmail(String email) {
        return clientRepository.findByEmail(email);
    }

    public void save(Client client) {
        clientRepository.save(client);
    }

    public void deleteClientById(Integer clientId) {
        clientRepository.deleteById(clientId);
    }
}

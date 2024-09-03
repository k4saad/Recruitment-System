package com.global.RecruitmentSystem.service;

import com.global.RecruitmentSystem.model.Client;
import com.global.RecruitmentSystem.model.ClientRequirement;
import com.global.RecruitmentSystem.repository.ClientRequirementRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class ClientRequirementService {
    private final ClientRequirementRepository clientRequirementRepository;

    private final ClientService clientService;

    public ClientRequirement addRequirement(String username, ClientRequirement newClientRequirement){
        Client client = clientService.findByUsername(username);
        log.info("Attaching requirement to the client {}",username);
        client.addRequirement(newClientRequirement);
        log.info("Attached requirement successfully");
        return clientRequirementRepository.save(newClientRequirement);
    }

}

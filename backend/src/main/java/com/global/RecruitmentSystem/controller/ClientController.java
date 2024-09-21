package com.global.RecruitmentSystem.controller;

import com.global.RecruitmentSystem.model.Client;
import com.global.RecruitmentSystem.response.ClientResponse;
import com.global.RecruitmentSystem.service.ClientService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@Slf4j
@RestController
@RequestMapping("/client")
@CrossOrigin(origins = "http://localhost:5173")
public class ClientController {
    private final ClientService clientService;

    @GetMapping(value = "/{username}", produces = "application/json")
    public ResponseEntity<ClientResponse> getClient(
            @PathVariable String username
    ){
        log.info("Received request for candidate profile with username : {}", username);
        Client client = clientService.findByUsername(username);
        ClientResponse clientResponse = getClientResponse(client);
        log.info("returning client response : {}", clientResponse.toString());
        return ResponseEntity.ok(clientResponse);
    }

    private ClientResponse getClientResponse(Client client) {
        return new ClientResponse(
                client.getClientId(),client.getName(),
                client.getOrganizationName(),client.getContactNumber(),
                client.getEmail(), client.getUsername()
        );
    }
}

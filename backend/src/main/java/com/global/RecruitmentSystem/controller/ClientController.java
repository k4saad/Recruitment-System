package com.global.RecruitmentSystem.controller;

import com.global.RecruitmentSystem.model.Client;
import com.global.RecruitmentSystem.response.ClientResponse;
import com.global.RecruitmentSystem.service.ClientService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

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

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<ClientResponse>> getAllClient(){
        List<ClientResponse> clientResponses = new ArrayList<>();
        List<Client> clients = clientService.findAllClient();
        for(Client client : clients){
            ClientResponse clientResponse = getClientResponse(client);
            clientResponses.add(clientResponse);
        }
        return ResponseEntity.ok(clientResponses);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("{clientId}")
    public ResponseEntity<Boolean> deleteClientById(
            @PathVariable Integer clientId
    ){
        try{
            log.info("Received request to delete client with id : {}", clientId);
            clientService.deleteClientById(clientId);
            log.info("Client deleted successfully");
            return ResponseEntity.ok(true);
        }catch(Error error){
            return ResponseEntity.ok(false);
        }
    }

    private ClientResponse getClientResponse(Client client) {
        return new ClientResponse(
                client.getClientId(),client.getName(),
                client.getOrganizationName(),client.getContactNumber(),
                client.getEmail(), client.getUsername()
        );
    }
}

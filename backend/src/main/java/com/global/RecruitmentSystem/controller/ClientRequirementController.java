package com.global.RecruitmentSystem.controller;

import com.global.RecruitmentSystem.model.ClientRequirement;
import com.global.RecruitmentSystem.response.ClientRequirementTableResponse;
import com.global.RecruitmentSystem.service.ClientRequirementService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Slf4j
@RestController
@RequestMapping("/requirements")
@CrossOrigin(origins = "http://localhost:5173")
public class ClientRequirementController {
    private final ClientRequirementService clientRequirementService;


    @PreAuthorize("hasRole('ROLE_CLIENT')")
    @PostMapping("/{username}")
    public ResponseEntity<ClientRequirement>  addRequirement(
            @PathVariable String username,
            @RequestBody ClientRequirement newClientRequirement
    ){
        return ResponseEntity.ok(clientRequirementService.addRequirement(username, newClientRequirement));
    }

    @PreAuthorize("hasRole('ROLE_CLIENT') or hasRole('ROLE_ADMIN')")
    @GetMapping("table/{username}")
    public ResponseEntity<List<ClientRequirementTableResponse>> getClientRequirementsByUsername(
            @PathVariable String username
    ){
        List<ClientRequirementTableResponse> clientRequirementTableResponses = new ArrayList<>();
        log.info("Received request for client requirements for client with username {}",username);
        List<ClientRequirement>clientRequirements = clientRequirementService
                .getRequirementByUsername(username);
        log.info("Converting ClientRequirement to ClientRequirementTableResponse");
        for(ClientRequirement clientRequirement : clientRequirements){
            ClientRequirementTableResponse clientRequirementTableResponse =
                    getClientRequirementsTableResponse(clientRequirement);
            clientRequirementTableResponses.add(clientRequirementTableResponse);
        }
        log.info("Successfully converted ClientRequirement to ClientRequirementTableResponse");
        return ResponseEntity.ok(clientRequirementTableResponses);
    }

    @PreAuthorize("hasRole('ROLE_CLIENT') or hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{requirementId}")
    public ResponseEntity<Boolean> deleteClientRequirementById(
            @PathVariable Integer requirementId
    ){
        try{
            log.info("Received request to delete client requirement with id : {}", requirementId);
            log.info("Initiating deletion of client requirement with id : {}",requirementId);
            clientRequirementService.deleteClientRequirementById(requirementId);
            log.info("Successfully deleted client requirement with id : {}", requirementId);
            return ResponseEntity.ok(true);
        }catch (Error error){
            return ResponseEntity.ok(false);
        }

    }



    // helper method to convert ClientRequirement object to ClientRequirementTableResponse object to send to frontend
    private ClientRequirementTableResponse getClientRequirementsTableResponse(
            ClientRequirement clientRequirement
    ) {
        return new ClientRequirementTableResponse(clientRequirement.getRequirementId(),
                clientRequirement.getTitle(), clientRequirement.getStatus(),
                clientRequirement.getMinSalary(), clientRequirement.getMaxSalary(),
                clientRequirement.getCurrency(), clientRequirement.getCandidateApplications().size()
        );
    }
}

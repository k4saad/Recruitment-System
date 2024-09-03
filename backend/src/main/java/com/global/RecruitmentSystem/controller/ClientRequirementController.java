package com.global.RecruitmentSystem.controller;

import com.global.RecruitmentSystem.model.ClientRequirement;
import com.global.RecruitmentSystem.service.ClientRequirementService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
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
}

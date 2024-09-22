package com.global.RecruitmentSystem.service;

import com.global.RecruitmentSystem.exceptions.InternalServerException;
import com.global.RecruitmentSystem.model.Admin;
import com.global.RecruitmentSystem.model.Candidate;
import com.global.RecruitmentSystem.model.CandidateApplication;
import com.global.RecruitmentSystem.model.ClientRequirement;
import com.global.RecruitmentSystem.repository.AdminRepository;
import com.global.RecruitmentSystem.repository.CandidateRepository;
import com.global.RecruitmentSystem.security.User;
import com.global.RecruitmentSystem.security.service.JWTService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.sql.rowset.serial.SerialBlob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class AdminService {
    private AdminRepository adminRepository;
    private AuthenticationManager authenticationManager;
    private JWTService jwtService;



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
    public Admin findByUsername(String username) {
        return adminRepository.findByUsername(username);
    }
}

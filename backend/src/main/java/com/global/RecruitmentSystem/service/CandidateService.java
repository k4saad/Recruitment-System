package com.global.RecruitmentSystem.service;

import com.global.RecruitmentSystem.exceptions.InternalServerException;
import com.global.RecruitmentSystem.model.Candidate;
import com.global.RecruitmentSystem.model.CandidateApplication;
import com.global.RecruitmentSystem.model.ClientRequirement;
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
public class CandidateService {
    private CandidateRepository candidateRepository;
    private AuthenticationManager authenticationManager;
    private JWTService jwtService;

    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(5);


    public Candidate register(Candidate candidate){
        Candidate newCandidate = new Candidate();
        newCandidate.setUsername(candidate.getUsername());
        candidate.setPassword(bCryptPasswordEncoder.encode(candidate.getPassword()));
        return candidateRepository.save(candidate);
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
    public Candidate findByUsername(String username) {
        return candidateRepository.findByUsername(username);
    }

    public Candidate updateProfile(String username, String name, String contactNumber, byte[] resumeBytes, byte[] medicalReportBytes) {
        Candidate candidate = candidateRepository.findByUsername(username);
        if(name != null) candidate.setName(name);
        if(contactNumber != null) candidate.setContactNumber(contactNumber);
        if(resumeBytes != null && resumeBytes.length > 0){
            try{
                candidate.setResume(new SerialBlob(resumeBytes));
            }catch (SQLException exception){
                throw new InternalServerException("profile");
            }
        }
        if(medicalReportBytes != null && medicalReportBytes.length > 0){
            try{
                candidate.setMedicalReport(new SerialBlob(medicalReportBytes));
            }catch (SQLException exception){
                throw new InternalServerException("Error : Updating profile");
            }
        }
        return candidateRepository.save(candidate);
    }

    public List<ClientRequirement> getAppliedRequirements(String username) {
        log.info("Fetching candidate with username : {}",username);
        Candidate candidate = candidateRepository.findByUsername(username);
        List<ClientRequirement> clientRequirements = new ArrayList<>();
        log.info("Fetching candidate Applications for candidate with username : {}",username);
        List<CandidateApplication> candidateApplications = candidate.getCandidateApplications();
        log.info("Fetching Client requirement that candidate have applied already");
        if(candidateApplications != null && !candidateApplications.isEmpty()){
            for(CandidateApplication candidateApplication : candidateApplications){
                ClientRequirement clientRequirement = candidateApplication.getClientRequirement();
                clientRequirements.add(clientRequirement);
            }
        }
        return clientRequirements;
    }

    public List<Candidate> findAllCandidates() {
        return candidateRepository.findAll();
    }

    public void deleteCandidateById(Integer candidateId) {
        candidateRepository.deleteById(candidateId);
    }
}

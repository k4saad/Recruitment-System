package com.global.RecruitmentSystem.component;

import com.global.RecruitmentSystem.model.Admin;
import com.global.RecruitmentSystem.repository.AdminRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminInitializer {
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(5);

    @Bean
    public CommandLineRunner initializeAdmin(AdminRepository adminRepository) {
        return args -> {
            if (!adminRepository.existsById(1)) {
                Admin admin = new Admin(1, "Saad Khan", "Admin", bCryptPasswordEncoder.encode("Admin"), "globalmanpower108b@gmail.com");
                adminRepository.save(admin);
            }
        };
    }
}

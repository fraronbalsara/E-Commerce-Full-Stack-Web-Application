// Fraron Balsara

package com.fsdgroup11.backendspringbootapplication.service;

import com.fsdgroup11.backendspringbootapplication.model.AdminCredentials;
import com.fsdgroup11.backendspringbootapplication.repository.AdminCredentialsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminCredentialsServiceImplementation implements AdminCredentialsService {
    @Autowired
    private AdminCredentialsRepository adminCredentialsRepository;
    @Override
    public void addAdminCredentials(AdminCredentials adminCredentials) {
        adminCredentialsRepository.save(adminCredentials);
    }
    @Override
    public void updateAdminCredentials(AdminCredentials adminCredentials){
        adminCredentialsRepository.save(adminCredentials);
    }
    @Override
    public AdminCredentials getByEmail(String email) {
        return adminCredentialsRepository.findByEmail(email);
    }
}

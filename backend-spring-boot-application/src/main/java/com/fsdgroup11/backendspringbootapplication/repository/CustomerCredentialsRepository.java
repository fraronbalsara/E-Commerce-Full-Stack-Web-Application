package com.fsdgroup11.backendspringbootapplication.repository;

import com.fsdgroup11.backendspringbootapplication.model.CustomerCredentials;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerCredentialsRepository extends JpaRepository<CustomerCredentials, Integer> {
    CustomerCredentials findByEmail(String email);
    void deleteByEmail(String email);
}

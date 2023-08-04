package com.fsdgroup11.backendspringbootapplication.repository;

import com.fsdgroup11.backendspringbootapplication.model.SellerCredentials;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SellerCredentialsRepository extends JpaRepository<SellerCredentials, Integer> {
    SellerCredentials findByEmail(String email);
    void deleteByEmail(String email);
}

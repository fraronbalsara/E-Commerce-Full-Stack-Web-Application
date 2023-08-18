// Fraron Balsara

package com.fsdgroup11.backendspringbootapplication.repository;

import com.fsdgroup11.backendspringbootapplication.model.AdminCredentials;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface AdminCredentialsRepository extends JpaRepository<AdminCredentials, Integer> {
    AdminCredentials findByEmail(String email);
}

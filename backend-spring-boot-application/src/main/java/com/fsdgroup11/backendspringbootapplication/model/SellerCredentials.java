package com.fsdgroup11.backendspringbootapplication.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Entity
@Table(name="SellerCredentials")
public class SellerCredentials {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int seller_credentials_id;
    @Email(message = "Invalid email")
    @Column(unique = true, nullable = false, updatable = false)
    private String email;
    @Column(nullable = false)
    private String password;

    public SellerCredentials() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) throws NoSuchAlgorithmException {
        MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
        messageDigest.update(password.getBytes());
        String hashed_password = new String(messageDigest.digest());
        this.password = hashed_password;
    }
}
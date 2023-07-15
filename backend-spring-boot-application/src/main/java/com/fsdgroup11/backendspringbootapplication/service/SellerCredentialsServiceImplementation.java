package com.fsdgroup11.backendspringbootapplication.service;

import com.fsdgroup11.backendspringbootapplication.model.SellerCredentials;
import com.fsdgroup11.backendspringbootapplication.repository.SellerCredentialsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SellerCredentialsServiceImplementation implements SellerCredentialsService{
    @Autowired
    private SellerCredentialsRepository sellerCredentialsRepository;
    @Override
    public void addSellerCredentials(SellerCredentials sellerCredentials) {
        sellerCredentialsRepository.save(sellerCredentials);
    }
    @Override
    public void updateSellerCredentials(SellerCredentials sellerCredentials){
        sellerCredentialsRepository.save(sellerCredentials);
    }
    @Override
    public SellerCredentials getByEmail(String email) {
        return sellerCredentialsRepository.findByEmail(email);
    }
}

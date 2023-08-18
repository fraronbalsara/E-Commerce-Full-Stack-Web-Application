// Fraron Balsara

package com.fsdgroup11.backendspringbootapplication.service;

import com.fsdgroup11.backendspringbootapplication.model.SellerCredentials;

import java.util.List;

public interface SellerCredentialsService {
    public void addSellerCredentials(SellerCredentials sellerCredentials);
    public void updateSellerCredentials(SellerCredentials sellerCredentials);
    public SellerCredentials getByEmail(String email);
    public void deleteByEmail(String email);
}

package com.fsdgroup11.backendspringbootapplication.service;

import com.fsdgroup11.backendspringbootapplication.model.CustomerCredentials;

import java.util.List;

public interface CustomerCredentialsService {
    public void addCustomerCredentials(CustomerCredentials customerCredentials);
    public void updateCustomerCredentials(CustomerCredentials customerCredentials);
    public CustomerCredentials getByEmail(String email);
}

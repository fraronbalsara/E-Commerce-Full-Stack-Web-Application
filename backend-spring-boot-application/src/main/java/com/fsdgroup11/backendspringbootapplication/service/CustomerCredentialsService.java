// Fraron Balsara

package com.fsdgroup11.backendspringbootapplication.service;

import com.fsdgroup11.backendspringbootapplication.model.CustomerCredentials;

public interface CustomerCredentialsService {
    public void addCustomerCredentials(CustomerCredentials customerCredentials);
    public void updateCustomerCredentials(CustomerCredentials customerCredentials);
    public CustomerCredentials getByEmail(String email);
    public void deleteByEmail(String email);
}

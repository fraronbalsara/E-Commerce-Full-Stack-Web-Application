// Fraron Balsara

package com.fsdgroup11.backendspringbootapplication.service;

import com.fsdgroup11.backendspringbootapplication.model.CustomerCredentials;
import com.fsdgroup11.backendspringbootapplication.repository.CustomerCredentialsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerCredentialsServiceImplementation implements CustomerCredentialsService{
    @Autowired
    private CustomerCredentialsRepository customerCredentialsRepository;
    @Override
    public void addCustomerCredentials(CustomerCredentials customerCredentials) {
        customerCredentialsRepository.save(customerCredentials);
    }
    @Override
    public void updateCustomerCredentials(CustomerCredentials customerCredentials){
        customerCredentialsRepository.save(customerCredentials);
    }
    @Override
    public CustomerCredentials getByEmail(String email) {
        return customerCredentialsRepository.findByEmail(email);
    }
    @Override
    public void deleteByEmail(String email) {
        customerCredentialsRepository.deleteByEmail(email);
    }
}

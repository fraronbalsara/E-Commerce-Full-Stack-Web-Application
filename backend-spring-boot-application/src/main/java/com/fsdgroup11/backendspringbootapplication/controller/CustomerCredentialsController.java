package com.fsdgroup11.backendspringbootapplication.controller;

import com.fsdgroup11.backendspringbootapplication.model.CustomerCredentials;
import com.fsdgroup11.backendspringbootapplication.service.CustomerCredentialsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customer_credentials")
@CrossOrigin
public class CustomerCredentialsController {
    @Autowired
    private CustomerCredentialsService customerCredentialsService;

    @PostMapping("/add-customer-credentials")
    public String add(@RequestBody CustomerCredentials customerCredentials){
        customerCredentialsService.addCustomerCredentials(customerCredentials);
        return "New customer credentials were added.";
    }

    @PutMapping("/update-customer-credentials/{email}")
    public String update(@RequestBody CustomerCredentials customerCredentials, @PathVariable String email){
        customerCredentialsService.updateCustomerCredentials(customerCredentials);
        return "Customer credentials were updated successfully.";
    }

    @GetMapping("/get-customer-credentials")
    public CustomerCredentials listByEmail(@RequestBody String email) {
        return customerCredentialsService.getByEmail(email);
    }
}

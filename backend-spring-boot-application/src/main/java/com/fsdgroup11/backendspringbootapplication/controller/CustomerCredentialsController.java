package com.fsdgroup11.backendspringbootapplication.controller;

import com.fsdgroup11.backendspringbootapplication.model.CustomerCredentials;
import com.fsdgroup11.backendspringbootapplication.service.CustomerCredentialsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

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

    @PostMapping("/customer-login/{email}")
    public ResponseEntity customerLogin(@RequestBody String password, @PathVariable String email) throws NoSuchAlgorithmException {
        CustomerCredentials customerCredentials = new CustomerCredentials();
        customerCredentials = customerCredentialsService.getByEmail(email);
        String database_password = customerCredentials.getPassword();
        MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
        messageDigest.update(password.getBytes());
        String hashed_password = new String(messageDigest.digest());
	System.out.println(password);
	System.out.println(hashed_password);
	System.out.println(database_password);
        if(hashed_password.equals(database_password)){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }
}

package com.fsdgroup11.backendspringbootapplication.controller;

import com.fsdgroup11.backendspringbootapplication.model.CustomerCredentials;
import com.fsdgroup11.backendspringbootapplication.service.CustomerCredentialsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
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

    @PostMapping("/customer-login")
    public ResponseEntity customerLogin(@RequestBody CustomerCredentials customerCredentials) {
        CustomerCredentials databaseCustomerCredentials = customerCredentialsService.getByEmail(customerCredentials.getEmail());
        if(databaseCustomerCredentials != null) {
            String database_password = databaseCustomerCredentials.getPassword();
            String password = customerCredentials.getPassword();
            if (password.equals(database_password)) {
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
            }
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @Transactional
    @DeleteMapping("/delete-customer_credentials/{email}")
    public String deleteCustomer(@PathVariable String email){
        customerCredentialsService.deleteByEmail(email);
        return "Customer credentials were deleted successfully.";
    }
}

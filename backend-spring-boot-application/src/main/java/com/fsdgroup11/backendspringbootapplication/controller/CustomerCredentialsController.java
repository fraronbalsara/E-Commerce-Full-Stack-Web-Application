// Fraron Balsara

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

    // Request to validate login
    @PostMapping("/customer-login")
    public ResponseEntity customerLogin(@RequestBody CustomerCredentials customerCredentials) {
        CustomerCredentials databaseCustomerCredentials = customerCredentialsService.getByEmail(customerCredentials.getEmail());
        // If email exists in database
        if(databaseCustomerCredentials != null) {
            String database_password = databaseCustomerCredentials.getPassword();
            String password = customerCredentials.getPassword();
            // Returns 200 if credentials match
            if (password.equals(database_password)) {
                return new ResponseEntity<>(HttpStatus.OK);
            }
            // Returns 406 if credentials do not match
            else {
                return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
            }
        }
        // Returns 406 if email does not exist
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

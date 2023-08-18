// Fraron Balsara

package com.fsdgroup11.backendspringbootapplication.controller;

import com.fsdgroup11.backendspringbootapplication.model.SellerCredentials;
import com.fsdgroup11.backendspringbootapplication.service.SellerCredentialsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/seller_credentials")
@CrossOrigin
public class SellerCredentialsController {
    @Autowired
    private SellerCredentialsService sellerCredentialsService;

    @PostMapping("/add-seller-credentials")
    public String add(@RequestBody SellerCredentials sellerCredentials){
        sellerCredentialsService.addSellerCredentials(sellerCredentials);
        return "New seller credentials were added.";
    }

    @PutMapping("/update-seller-credentials/{email}")
    public String update(@RequestBody SellerCredentials sellerCredentials, @PathVariable String email){
        sellerCredentialsService.updateSellerCredentials(sellerCredentials);
        return "Seller credentials were updated successfully.";
    }

    @GetMapping("/get-seller-credentials")
    public SellerCredentials listByEmail(@RequestBody String email) {
        return sellerCredentialsService.getByEmail(email);
    }

    // Request to validate login
    @PostMapping("/seller-login")
    public ResponseEntity sellerLogin(@RequestBody SellerCredentials sellerCredentials) {
        SellerCredentials databaseSellerCredentials = sellerCredentialsService.getByEmail(sellerCredentials.getEmail());
        // If email exists in database
        if(databaseSellerCredentials != null) {
            String database_password = databaseSellerCredentials.getPassword();
            String password = sellerCredentials.getPassword();
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
    @DeleteMapping("/delete-seller_credentials/{email}")
    public String deleteCustomer(@PathVariable String email){
        sellerCredentialsService.deleteByEmail(email);
        return "Seller credentials were deleted successfully.";
    }
}

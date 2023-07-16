package com.fsdgroup11.backendspringbootapplication.controller;

import com.fsdgroup11.backendspringbootapplication.model.SellerCredentials;
import com.fsdgroup11.backendspringbootapplication.service.SellerCredentialsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

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

    @PostMapping("/seller-login/{email}")
    public ResponseEntity sellerLogin(@RequestBody String password, @PathVariable String email) throws NoSuchAlgorithmException {
        SellerCredentials sellerCredentials = new SellerCredentials();
        sellerCredentials = sellerCredentialsService.getByEmail(email);
        String database_password = sellerCredentials.getPassword();
        MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
        messageDigest.update(password.getBytes());
        String hashed_password = new String(messageDigest.digest());
        if(hashed_password.equals(database_password)){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }
}

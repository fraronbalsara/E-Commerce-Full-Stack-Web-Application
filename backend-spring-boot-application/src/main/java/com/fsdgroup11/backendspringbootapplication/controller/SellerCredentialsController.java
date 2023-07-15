package com.fsdgroup11.backendspringbootapplication.controller;

import com.fsdgroup11.backendspringbootapplication.model.SellerCredentials;
import com.fsdgroup11.backendspringbootapplication.service.SellerCredentialsService;
import org.springframework.beans.factory.annotation.Autowired;
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
}

package com.fsdgroup11.backendspringbootapplication.controller;

import com.fsdgroup11.backendspringbootapplication.model.AdminCredentials;
import com.fsdgroup11.backendspringbootapplication.service.AdminCredentialsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin_credentials")
@CrossOrigin
public class AdminCredentialsController {
    @Autowired
    public AdminCredentialsService adminCredentialsService;
    @PostMapping("/add-admin-credentials")
    public String add(@RequestBody AdminCredentials adminCredentials){
        adminCredentialsService.addAdminCredentials(adminCredentials);
        return "New admin credentials were added.";
    }
    @PutMapping("/update-admin-credentials/{email}")
    public String update(@RequestBody AdminCredentials adminCredentials, @PathVariable String email){
        adminCredentialsService.updateAdminCredentials(adminCredentials);
        return "Admin credentials were updated successfully.";
    }
    @GetMapping("/get-admin-credentials")
    public AdminCredentials ListByEmail(@RequestBody String email){
        return adminCredentialsService.getByEmail(email);
    }
    @PostMapping("/admin-login")
    public ResponseEntity adminLogin(@RequestBody AdminCredentials adminCredentials) {
        AdminCredentials databaseAdminCredentials = adminCredentialsService.getByEmail(adminCredentials.getEmail());
        if(databaseAdminCredentials != null) {
            String database_password = databaseAdminCredentials.getPassword();
            String password = adminCredentials.getPassword();
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
}

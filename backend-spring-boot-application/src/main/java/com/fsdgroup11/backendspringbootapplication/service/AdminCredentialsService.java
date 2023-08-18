// Fraron Balsara

package com.fsdgroup11.backendspringbootapplication.service;

import com.fsdgroup11.backendspringbootapplication.model.AdminCredentials;

public interface AdminCredentialsService {
    public void addAdminCredentials(AdminCredentials adminCredentials);
    public void updateAdminCredentials(AdminCredentials adminCredentials);
    public AdminCredentials getByEmail(String email);
}

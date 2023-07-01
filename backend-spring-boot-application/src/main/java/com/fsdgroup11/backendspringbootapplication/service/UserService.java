package com.fsdgroup11.backendspringbootapplication.service;

import com.fsdgroup11.backendspringbootapplication.model.User;

import java.util.List;

public interface UserService {
    public void addUser(User user);
    public void updateUser(User user);
    public List<User> getAllUsers();
    public User getOneUser(int user_id);
    public User getByEmail(String email);
    public void deleteUser(int user_id);
}

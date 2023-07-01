package com.fsdgroup11.backendspringbootapplication.service;

import com.fsdgroup11.backendspringbootapplication.model.User;
import com.fsdgroup11.backendspringbootapplication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImplmentation implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public void addUser(User user) { userRepository.save(user);}

    @Override
    public void updateUser(User user){
        userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    @Override
    public User getByEmail(String email){
        return userRepository.findByEmail(email);
    }

    @Override
    public User getOneUser(int user_id){
        return userRepository.findById(user_id).get();
    }

    @Override
    public void deleteUser(int user_id){
        userRepository.deleteById(user_id);
    }
}

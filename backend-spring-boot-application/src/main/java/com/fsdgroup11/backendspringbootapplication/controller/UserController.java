package com.fsdgroup11.backendspringbootapplication.controller;

import com.fsdgroup11.backendspringbootapplication.model.User;
import com.fsdgroup11.backendspringbootapplication.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/add-user")
    public String add(@RequestBody User user){
        userService.addUser(user);
        return "New user was added.";
    }

    @PutMapping("/update-user/{user_id}")
    public String update(@RequestBody User user, @PathVariable int user_id){
        userService.updateUser(user);
        return "User was updated Successfully.";
    }

    @GetMapping("/list-users")
    public List<User> listAll(){
        return userService.getAllUsers();
    }

    @GetMapping("/list-user-by-email/{email}")
    public User listByEmail(@PathVariable String email) {
        return userService.getByEmail(email);
    }

    @GetMapping("/list-user/{user_id}")
    public User listOne(@PathVariable int user_id){
        return userService.getOneUser(user_id);
    }

    @DeleteMapping("/delete-user/{user_id}")
    public String deleteUser(@PathVariable int user_id){
        userService.deleteUser(user_id);
        return "User was deleted successfully.";
    }
}

package com.fsdgroup11.backendspringbootapplication.service;

import com.fsdgroup11.backendspringbootapplication.model.Customer;

import java.util.List;

public interface CustomerService {
    public void addCustomer(Customer customer);
    public void updateCustomer(Customer customer);
    public List<Customer> getAllCustomers();
    public Customer getOneCustomer(int customer_id);
    public Customer getByEmail(String email);
    public void deleteCustomer(int customer_id);
}

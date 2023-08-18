// Fraron Balsara

package com.fsdgroup11.backendspringbootapplication.service;

import com.fsdgroup11.backendspringbootapplication.model.Customer;
import com.fsdgroup11.backendspringbootapplication.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImplementation implements CustomerService{

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public void addCustomer(Customer customer) {
        customerRepository.save(customer);
    }

    @Override
    public void updateCustomer(Customer customer){
        customerRepository.save(customer);
    }

    @Override
    public List<Customer> getAllCustomers(){
        return customerRepository.findAll();
    }

    @Override
    public Customer getByEmail(String email){
        return customerRepository.findByEmail(email);
    }

    @Override
    public Customer getOneCustomer(int customer_id){
        return customerRepository.findById(customer_id).get();
    }

    @Override
    public void deleteCustomer(int customer_id){
        customerRepository.deleteById(customer_id);
    }
}

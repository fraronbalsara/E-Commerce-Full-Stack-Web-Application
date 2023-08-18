// Fraron Balsara

package com.fsdgroup11.backendspringbootapplication.controller;

import com.fsdgroup11.backendspringbootapplication.model.Customer;
import com.fsdgroup11.backendspringbootapplication.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")
@CrossOrigin
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping("/add-customer")
    public String add(@RequestBody Customer customer){
        customerService.addCustomer(customer);
        return "New customer was added.";
    }

    @PutMapping("/update-customer/{customer_id}")
    public String update(@RequestBody Customer customer, @PathVariable int customer_id){
        customerService.updateCustomer(customer);
        return "Customer was updated successfully.";
    }

    @GetMapping("/list-customers")
    public List<Customer> listAll(){
        return customerService.getAllCustomers();
    }

    @GetMapping("/list-customer-by-email/{email}")
    public Customer listByEmail(@PathVariable String email) {
        return customerService.getByEmail(email);
    }

    @GetMapping("/list-customer/{customer_id}")
    public Customer listOne(@PathVariable int customer_id){
        return customerService.getOneCustomer(customer_id);
    }

    @DeleteMapping("/delete-customer/{customer_id}")
    public String deleteCustomer(@PathVariable int customer_id){
        customerService.deleteCustomer(customer_id);
        return "Customer was deleted successfully.";
    }
}

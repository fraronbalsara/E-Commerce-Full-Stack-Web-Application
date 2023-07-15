package com.fsdgroup11.backendspringbootapplication.controller;

import com.fsdgroup11.backendspringbootapplication.model.Seller;
import com.fsdgroup11.backendspringbootapplication.service.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/seller")
@CrossOrigin
public class SellerController {

    @Autowired
    private SellerService sellerService;

    @PostMapping("/add-seller")
    public String add(@RequestBody Seller seller){
        sellerService.addSeller(seller);
        return "New seller was added.";
    }

    @PutMapping("/update-seller/{seller_id}")
    public String update(@RequestBody Seller seller, @PathVariable int seller_id){
        sellerService.updateSeller(seller);
        return "Seller was updated successfully.";
    }

    @GetMapping("/list-sellers")
    public List<Seller> listAll(){
        return sellerService.getAllSellers();
    }

    @GetMapping("/list-seller-by-email/{email}")
    public Seller listByEmail(@PathVariable String email) {
        return sellerService.getByEmail(email);
    }

    @GetMapping("/list-seller/{seller_id}")
    public Seller listOne(@PathVariable int seller_id){
        return sellerService.getOneSeller(seller_id);
    }

    @DeleteMapping("/delete-seller/{seller_id}")
    public String deleteSeller(@PathVariable int seller_id){
        sellerService.deleteSeller(seller_id);
        return "Seller was deleted successfully.";
    }
}
package com.fsdgroup11.backendspringbootapplication.service;

import com.fsdgroup11.backendspringbootapplication.model.Seller;

import java.util.List;

public interface SellerService {
    public void addSeller(Seller seller);
    public void updateSeller(Seller seller);
    public List<Seller> getAllSellers();
    public Seller getOneSeller(int seller_id);
    public Seller getByEmail(String email);
    public void deleteSeller(int seller_id);
}
// Fraron Balsara

package com.fsdgroup11.backendspringbootapplication.service;

import com.fsdgroup11.backendspringbootapplication.model.Seller;
import com.fsdgroup11.backendspringbootapplication.repository.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SellerServiceImplementation implements SellerService{

    @Autowired
    private SellerRepository sellerRepository;

    @Override
    public void addSeller(Seller seller) { sellerRepository.save(seller);}

    @Override
    public void updateSeller(Seller seller){
        sellerRepository.save(seller);
    }

    @Override
    public List<Seller> getAllSellers(){
        return sellerRepository.findAll();
    }

    @Override
    public Seller getByEmail(String email){
        return sellerRepository.findByEmail(email);
    }

    @Override
    public Seller getOneSeller(int seller_id){
        return sellerRepository.findById(seller_id).get();
    }

    @Override
    public void deleteSeller(int seller_id){
        sellerRepository.deleteById(seller_id);
    }
}
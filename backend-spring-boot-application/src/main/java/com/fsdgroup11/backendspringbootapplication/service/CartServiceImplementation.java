package com.fsdgroup11.backendspringbootapplication.service;

import com.fsdgroup11.backendspringbootapplication.model.Cart;
import com.fsdgroup11.backendspringbootapplication.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImplementation implements CartService{

    @Autowired
    private CartRepository cartRepository;

    @Override
    public void addCart(Cart cart) {
        cartRepository.save(cart);
    }

    @Override
    public void updateCart(Cart cart) {
        cartRepository.save(cart);
    }

    @Override
    public Cart getByEmail(String email) {
        return cartRepository.findByEmail(email);
    }
}

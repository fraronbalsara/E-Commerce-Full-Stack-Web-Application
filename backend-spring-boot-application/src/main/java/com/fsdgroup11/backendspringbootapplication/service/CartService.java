package com.fsdgroup11.backendspringbootapplication.service;

import com.fsdgroup11.backendspringbootapplication.model.Cart;

public interface CartService {
    public void addCart(Cart cart);
    public void updateCart(Cart cart);
    public Cart getByEmail(String email);
    public void deleteByEmail(String email);
}

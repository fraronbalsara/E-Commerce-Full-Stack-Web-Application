// Fraron Balsara

package com.fsdgroup11.backendspringbootapplication.service;

import com.fsdgroup11.backendspringbootapplication.model.CartItem;

import java.util.List;

public interface CartItemService {
    public void addCartItem(CartItem cartItem);
    public void updateCartItem(CartItem cartItem);
    public List<CartItem> getByEmail(String email);
    public void deleteByEmail(String email);
    public void deleteById(int cartItem_id);
}

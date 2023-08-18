// Fraron Balsara

package com.fsdgroup11.backendspringbootapplication.service;

import com.fsdgroup11.backendspringbootapplication.model.CartItem;
import com.fsdgroup11.backendspringbootapplication.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartItemServiceImplementation implements CartItemService {
    @Autowired
    private CartItemRepository cartItemRepository;

    @Override
    public void addCartItem(CartItem cartItem) {
        cartItemRepository.save(cartItem);
    }

    @Override
    public void updateCartItem(CartItem cartItem) {
        cartItemRepository.save(cartItem);
    }

    @Override
    public List<CartItem> getByEmail(String email) {
        return cartItemRepository.findByEmail(email);
    }

    @Override
    public void deleteByEmail(String email) {
        cartItemRepository.deleteByEmail(email);
    }

    @Override
    public void deleteById(int cartItem_id) { cartItemRepository.deleteById(cartItem_id);}
}

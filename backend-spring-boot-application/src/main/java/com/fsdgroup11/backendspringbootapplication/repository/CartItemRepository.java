package com.fsdgroup11.backendspringbootapplication.repository;

import com.fsdgroup11.backendspringbootapplication.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
    List<CartItem> findByEmail(String email);
    void deleteByEmail(String email);
}

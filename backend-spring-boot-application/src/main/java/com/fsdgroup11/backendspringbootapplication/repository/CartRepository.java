package com.fsdgroup11.backendspringbootapplication.repository;

import com.fsdgroup11.backendspringbootapplication.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Integer> {
     Cart findByEmail(String email);
     void deleteByEmail(String email);
}

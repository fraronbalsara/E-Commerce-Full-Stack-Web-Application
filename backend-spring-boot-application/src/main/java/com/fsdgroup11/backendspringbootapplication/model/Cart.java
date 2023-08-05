package com.fsdgroup11.backendspringbootapplication.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;

import java.util.List;

@Entity
@Table(name = "Carts")
public class Cart{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cart_id;
    @Email(message = "Invalid email")
    @Column(unique = true, nullable = false, updatable = false)
    private String email;
    @OneToMany(fetch = FetchType.LAZY)
    private List<Product> products;

    public Cart() {
    }

    public int getCart_id() {
        return cart_id;
    }

    public void setCart_id(int cart_id) {
        this.cart_id = cart_id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}

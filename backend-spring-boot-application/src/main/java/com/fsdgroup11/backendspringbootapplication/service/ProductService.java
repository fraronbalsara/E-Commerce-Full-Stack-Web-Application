package com.fsdgroup11.backendspringbootapplication.service;

import com.fsdgroup11.backendspringbootapplication.model.Product;

import java.util.List;

public interface ProductService {
    public void addProduct(Product product);
    public void updateProduct(Product product);
    public List<Product> getAllProducts();
    public Product getOneProduct(int product_id);
    public void deleteProduct(int product_id);
}

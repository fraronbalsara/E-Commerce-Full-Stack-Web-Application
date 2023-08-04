package com.fsdgroup11.backendspringbootapplication.repository;

import com.fsdgroup11.backendspringbootapplication.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findAllByCategory(Product.Category category);
    List<Product> findAllBySubcategory(Product.SubCategory subcategory);
    List<Product> findAllBySellerEmail(String sellerEmail);
    void deleteBySellerEmail(String sellerEmail);
}

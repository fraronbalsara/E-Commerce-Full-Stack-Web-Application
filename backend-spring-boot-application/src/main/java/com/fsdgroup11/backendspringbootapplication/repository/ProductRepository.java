// Fraron Balsara

package com.fsdgroup11.backendspringbootapplication.repository;

import com.fsdgroup11.backendspringbootapplication.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findAllByCategory(Product.Category category);
    List<Product> findAllBySubcategory(Product.SubCategory subcategory);
    List<Product> findAllBySellerEmail(String sellerEmail);
    void deleteBySellerEmail(String sellerEmail);
}

package com.fsdgroup11.backendspringbootapplication.service;

import com.fsdgroup11.backendspringbootapplication.model.Product;
import com.fsdgroup11.backendspringbootapplication.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImplementation implements ProductService{

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void addProduct(Product product){
        productRepository.save(product);
    }

    @Override
    public void updateProduct(Product product){
        productRepository.save(product);
    }

    @Override
    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    @Override
    public List<Product> getAllByCategory(Product.Category category){
        return productRepository.findAllByCategory(category);
    }

    @Override
    public List<Product> getAllBySubcategory(Product.SubCategory subcategory){
        return productRepository.findAllBySubcategory(subcategory);
    }

    @Override
    public Product getOneProduct(int product_id){
        return productRepository.findById(product_id).get();
    }

    @Override
    public void deleteProduct(int product_id){
        productRepository.deleteById(product_id);
    }
}

package com.fsdgroup11.backendspringbootapplication.controller;

import com.fsdgroup11.backendspringbootapplication.model.Product;
import com.fsdgroup11.backendspringbootapplication.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
@CrossOrigin
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/add-product")
    public String add(@RequestBody Product product){
        productService.addProduct(product);
        return "New product was added.";
    }

    @PutMapping("/update-product/{product_id}")
    public String update(@RequestBody Product product, @PathVariable int product_id){
        productService.updateProduct(product);
        return "Product was updated successfully.";
    }

    @GetMapping("/list-products")
    public List<Product> listAll(){
        return productService.getAllProducts();
    }

    @GetMapping("/list-products-by-category/{category}")
    public List<Product> listAllByCategory(@PathVariable Product.Category category) {
        return productService.getAllByCategory(category);
    }

    @GetMapping("/list-products-by-subcategory/{subcategory}")
    public List<Product> listAllBySubcategory(@PathVariable Product.SubCategory subcategory) {
        return productService.getAllBySubcategory(subcategory);
    }

    @GetMapping("/list-product/{product_id}")
    public Product listOne(@PathVariable int product_id){
        return productService.getOneProduct(product_id);
    }

    @DeleteMapping("/delete-product/{product_id}")
    public String deleteProduct(@PathVariable int product_id){
        productService.deleteProduct(product_id);
        return "Product was deleted successfully.";
    }
}

// Fraron Balsara

package com.fsdgroup11.backendspringbootapplication.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name="products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int product_id;
    @Column(nullable = false)
    private String name;
    private String short_summary;
    @Column(columnDefinition = "LONGTEXT")
    private String description;
    @Column(nullable = false)
    private float price;
    @CreationTimestamp
    @Column(nullable = false)
    private Timestamp date_created;
    @UpdateTimestamp
    private Timestamp date_modified;
    @Column(nullable = false)
    private int stock;
    private String weight;
    private String dimensions;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Category category;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private SubCategory subcategory;
    private String variant;
    private String imageFilePath;
    @Email(message = "Invalid email")
    @Column(nullable = false)
    private String sellerEmail;

    public enum Category{Electronics, Clothing, Health, Stationary, Other}
    public enum SubCategory{Mobile, Laptop, Earphones, Shirts, Trousers, Sunglasses, Probiotics, Cosmetics, Books, Paper, Ink, Other}

    public Product() {
    }

    public Product(int product_id, String name, String short_summary, String description, float price, Timestamp date_created, Timestamp date_modified, int stock, String weight, String dimensions, Category category, SubCategory subcategory, String variant, String imageFilePath, String sellerEmail) {
        this.product_id = product_id;
        this.name = name;
        this.short_summary = short_summary;
        this.description = description;
        this.price = price;
        this.date_created = date_created;
        this.date_modified = date_modified;
        this.stock = stock;
        this.weight = weight;
        this.dimensions = dimensions;
        this.category = category;
        this.subcategory = subcategory;
        this.variant = variant;
        this.imageFilePath = imageFilePath;
        this.sellerEmail = sellerEmail;
    }

    public int getProduct_id() {
        return product_id;
    }

    public void setProduct_id(int product_id) {
        this.product_id = product_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShort_summary() {
        return short_summary;
    }

    public void setShort_summary(String short_summary) {
        this.short_summary = short_summary;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public Timestamp getDate_created() {
        return date_created;
    }

    public void setDate_created(Timestamp date_created) {
        this.date_created = date_created;
    }

    public Timestamp getDate_modified() {
        return date_modified;
    }

    public void setDate_modified(Timestamp date_modified) {
        this.date_modified = date_modified;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public String getWeight() {
        return weight;
    }

    public void setWeight(String weight) {
        this.weight = weight;
    }

    public String getDimensions() {
        return dimensions;
    }

    public void setDimensions(String dimensions) {
        this.dimensions = dimensions;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public SubCategory getSubcategory() {
        return subcategory;
    }

    public void setSubcategory(SubCategory subcategory) {
        this.subcategory = subcategory;
    }

    public String getVariant() {
        return variant;
    }

    public void setVariant(String variant) {
        this.variant = variant;
    }

    public String getImageFilePath() {
        return imageFilePath;
    }

    public void setImageFilePath(String imageFilePath) {
        this.imageFilePath = imageFilePath;
    }

    public String getSellerEmail() {
        return sellerEmail;
    }

    public void setSellerEmail(String sellerEmail) {
        this.sellerEmail = sellerEmail;
    }
}

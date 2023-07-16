package com.fsdgroup11.backendspringbootapplication.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;

@Entity
@Table(name="Sellers")
public class Seller {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int seller_id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String address;
    @Email(message = "Invalid email")
    @Column(unique = true, nullable = false)
    private String email;
    @CreationTimestamp
    @Column(nullable = false)
    private Timestamp date_created;
    @UpdateTimestamp
    @Column(nullable = false)
    private Timestamp date_modified;

    @Pattern(regexp = "^[7-9][0-9]{9}$", message = "Invalid mobile number")
    @Column(unique = true, nullable = false)
    private String mobile;

    public Seller() {
    }

    public int getSeller_id() {
        return seller_id;
    }

    public void setSeller_id(int seller_id) {
        this.seller_id = seller_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }
}

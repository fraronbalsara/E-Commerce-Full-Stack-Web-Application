// Fraron Balsara

package com.fsdgroup11.backendspringbootapplication.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name="customers")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int customer_id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String address;
    @Email(message = "Invalid email")
    @Column(unique = true, nullable = false, updatable = false)
    private String email;
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Timestamp date_created;
    @UpdateTimestamp
    private Timestamp date_modified;

    @Pattern(regexp = "^[7-9][0-9]{9}$", message = "Invalid mobile number")
    @Column(unique = true, nullable = false)
    private String mobile;

    public Customer() {
    }

    public Customer(int customer_id, String name, String address, String email, Timestamp date_created, Timestamp date_modified, String mobile) {
        this.customer_id = customer_id;
        this.name = name;
        this.address = address;
        this.email = email;
        this.date_created = date_created;
        this.date_modified = date_modified;
        this.mobile = mobile;
    }

    public int getCustomer_id() {
        return customer_id;
    }

    public void setCustomer_id(int customer_id) {
        this.customer_id = customer_id;
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

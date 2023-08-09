package com.fsdgroup11.backendspringbootapplication.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "Orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int order_id;
    @Email(message = "Invalid email")
    @Column(nullable = false, updatable = false)
    private String customerEmail;
    @Column(nullable = false)
    private String address;
    @CreationTimestamp
    @Column(nullable = false)
    private Timestamp orderDate;
    @Column(nullable = false)
    private OrderStatusList orderStatus;
    @Column(nullable = false)
    private PaymentStatusList paymentStatus;
    @Column(nullable = false)
    private PaymentModeList paymentMode;
    private String transaction_id;
    private int[] productIds;
    private String[] productNames;
    private String[] productImageFilePaths;
    private int[] productPrices;
    private int[] productQuantities;
    private float[] productSubTotals;
    private float totalCost;
    public enum OrderStatusList{Placed, Dispatched, Delivered, Cancelled}
    public enum PaymentStatusList{Pending, Completed}
    public enum PaymentModeList{CashOnDelivery, Online}

    public Order() {
    }

    public int getOrder_id() {
        return order_id;
    }

    public void setOrder_id(int order_id) {
        this.order_id = order_id;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Timestamp getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Timestamp orderDate) {
        this.orderDate = orderDate;
    }

    public OrderStatusList getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(OrderStatusList orderStatus) {
        this.orderStatus = orderStatus;
    }

    public PaymentStatusList getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(PaymentStatusList paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public PaymentModeList getPaymentMode() {
        return paymentMode;
    }

    public void setPaymentMode(PaymentModeList paymentMode) {
        this.paymentMode = paymentMode;
    }

    public String getTransaction_id() {
        return transaction_id;
    }

    public void setTransaction_id(String transaction_id) {
        this.transaction_id = transaction_id;
    }

    public int[] getProductIds() {
        return productIds;
    }

    public void setProductIds(int[] productIds) {
        this.productIds = productIds;
    }

    public String[] getProductNames() {
        return productNames;
    }

    public void setProductNames(String[] productNames) {
        this.productNames = productNames;
    }

    public String[] getProductImageFilePaths() {
        return productImageFilePaths;
    }

    public void setProductImageFilePaths(String[] productImageFilePaths) {
        this.productImageFilePaths = productImageFilePaths;
    }

    public int[] getProductPrices() {
        return productPrices;
    }

    public void setProductPrices(int[] productPrices) {
        this.productPrices = productPrices;
    }

    public int[] getProductQuantities() {
        return productQuantities;
    }

    public void setProductQuantities(int[] productQuantities) {
        this.productQuantities = productQuantities;
    }

    public float[] getProductSubTotals() {
        return productSubTotals;
    }

    public void setProductSubTotals(float[] productSubTotals) {
        this.productSubTotals = productSubTotals;
    }

    public float getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(float totalCost) {
        this.totalCost = totalCost;
    }
}

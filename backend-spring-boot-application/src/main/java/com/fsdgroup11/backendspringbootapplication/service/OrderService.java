package com.fsdgroup11.backendspringbootapplication.service;

import com.fsdgroup11.backendspringbootapplication.model.Order;
import com.fsdgroup11.backendspringbootapplication.model.TransactionDetails;

import java.util.List;
import java.util.Optional;

public interface OrderService {
    public void addOrder(Order order);
    public void updateOrder(Order order);
    public List<Order> getByCustomerEmail(String customerEmail);
    public List<Order> getAllOrders();
    public Order getOrderById(int order_id);
    public void deleteById(int order_id);
    public TransactionDetails razorpayTransaction(float amount);
}

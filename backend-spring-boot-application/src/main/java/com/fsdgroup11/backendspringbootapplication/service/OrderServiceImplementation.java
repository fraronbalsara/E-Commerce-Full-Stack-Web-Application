// Fraron Balsara

package com.fsdgroup11.backendspringbootapplication.service;

import com.fsdgroup11.backendspringbootapplication.model.Order;
import com.fsdgroup11.backendspringbootapplication.model.TransactionDetails;
import com.fsdgroup11.backendspringbootapplication.repository.OrderRepository;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImplementation implements OrderService {

    private static final String KEY_ID = "rzp_test_ukDELYCqE2Fg1f";
    private static final String KEY_SECRET = "ZgzfbrwFtKyIGgT3Tsb3VhRj";

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public void addOrder(Order order) {
        orderRepository.save(order);
    }

    @Override
    public void updateOrder(Order order) {
        orderRepository.save(order);
    }

    @Override
    public List<Order> getByCustomerEmail(String customerEmail) {
        return orderRepository.findByCustomerEmail(customerEmail);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order getOrderById(int order_id) {
        return orderRepository.findById(order_id).get();
    }

    @Override
    public void deleteById(int order_id) {
        orderRepository.deleteById(order_id);
    }

    @Override
    public TransactionDetails razorpayTransaction(float amount) {
        try {
            RazorpayClient razorpayClient = new RazorpayClient(KEY_ID, KEY_SECRET);
            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", amount*100);
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", "order_receipt_11");

            com.razorpay.Order order = razorpayClient.orders.create(orderRequest);

            return prepareTransactionDetails(order);
        }
        catch(Exception e){
            System.out.println(e);
        }
        return null;
    }

    private TransactionDetails prepareTransactionDetails(com.razorpay.Order order){
        String orderId = order.get("id");
        String currency = order.get("currency");
        Integer amount = order.get("amount");
        Integer amount_paid = order.get("amount_paid");
        Integer amount_due = order.get("amount_due");

        TransactionDetails transactionDetails = new TransactionDetails(orderId, currency, amount, amount_paid, amount_due);
        return transactionDetails;
    }
}

// Fraron Balsara

package com.fsdgroup11.backendspringbootapplication.controller;

import com.fsdgroup11.backendspringbootapplication.model.Order;
import com.fsdgroup11.backendspringbootapplication.model.TransactionDetails;
import com.fsdgroup11.backendspringbootapplication.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
@CrossOrigin
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/add-order")
    public String add(@RequestBody Order order){
        orderService.addOrder(order);
        return "New order was added.";
    }

    @PutMapping("/update-order/{order_id}")
    public String update(@RequestBody Order order, @PathVariable int order_id){
        orderService.updateOrder(order);
        return "Order was updated successfully.";
    }

    @GetMapping("list-orders-by-email/{customerEmail}")
    public List<Order> listAllByCustomerEmail(@PathVariable String customerEmail){
        return orderService.getByCustomerEmail(customerEmail);
    }

    @GetMapping("/list-orders")
    public List<Order> listAll(){
        return orderService.getAllOrders();
    }

    @GetMapping("/list-order/{order_id}")
    public Order listOne(@PathVariable int order_id){
        return orderService.getOrderById(order_id);
    }

    @DeleteMapping("/delete-order/{order_id}")
    public String deleteOrder(@PathVariable int order_id){
        orderService.deleteById(order_id);
        return "Order was deleted successfully.";
    }

    @GetMapping("/razorpay-transaction/{amount}")
    public TransactionDetails createRazorpayTransaction(@PathVariable float amount){
        return orderService.razorpayTransaction(amount);
    }
}

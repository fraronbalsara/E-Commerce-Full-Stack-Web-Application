package com.fsdgroup11.backendspringbootapplication.controller;

import com.fsdgroup11.backendspringbootapplication.model.Cart;
import com.fsdgroup11.backendspringbootapplication.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@CrossOrigin
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/create-cart")
    public String create(@RequestBody Cart cart){
        cartService.addCart(cart);
        return "New cart was created.";
    }

    @PutMapping("/update-cart/{cart_id}")
    public String update(@RequestBody Cart cart, @PathVariable int cart_id){
        cartService.updateCart(cart);
        return "Cart was updated successfully.";
    }

    @GetMapping("/get-cart/{email}")
    public Cart getCart(@PathVariable String email){
        return cartService.getByEmail(email);
    }

    @Transactional
    @DeleteMapping("/delete-cart/{email}")
    public String deleteCartByEmail(@PathVariable String email){
        cartService.deleteByEmail(email);
        return "Cart deleted successfully.";
    }
}

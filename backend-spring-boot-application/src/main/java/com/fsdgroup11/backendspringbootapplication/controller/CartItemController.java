// Fraron Balsara

package com.fsdgroup11.backendspringbootapplication.controller;

import com.fsdgroup11.backendspringbootapplication.model.CartItem;
import com.fsdgroup11.backendspringbootapplication.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cartItem")
@CrossOrigin
public class CartItemController {
    @Autowired
    private CartItemService cartItemService;

    @PostMapping("/add-cartItem")
    public String create(@RequestBody CartItem cartItem){
        cartItemService.addCartItem(cartItem);
        return "New cart item was created.";
    }

    @PutMapping("/update-cartItem/{cartItem_id}")
    public String update(@RequestBody CartItem cartItem, @PathVariable int cartItem_id){
        cartItemService.updateCartItem(cartItem);
        return "Cart item was updated successfully.";
    }

    @GetMapping("/get-cartItems/{email}")
    public List<CartItem> getCartItem(@PathVariable String email){
        return cartItemService.getByEmail(email);
    }

    @Transactional
    @DeleteMapping("/delete-cartItems/{email}")
    public String deleteCartItemByEmail(@PathVariable String email){
        cartItemService.deleteByEmail(email);
        return "Cart items deleted successfully.";
    }

    @DeleteMapping("/delete-cartItem/{cartItem_id}")
    public String deleteCartItemById(@PathVariable int cartItem_id){
        cartItemService.deleteById(cartItem_id);
        return "Cart item deleted successfully.";
    }
}

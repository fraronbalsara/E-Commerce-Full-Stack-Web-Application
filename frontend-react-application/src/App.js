import React from 'react';
import './App.css';
import Home from './pages/Home';
import SellerSignup from './pages/SellerSignup';
import SellerLogin from './pages/SellerLogin';
import CustomerSignup from './pages/CustomerSignup';
import CustomerLogin from './pages/CustomerLogin';
import AdminLogin from './pages/AdminLogin';
import AddNewAdmin from './pages/AddNewAdmin';
import ListUsers from './pages/ListUsers';
import AddProduct from './pages/AddProduct';
import MyProducts from './pages/MyProducts';
import ModifyProduct from './pages/ModifyProduct';
import Cart from './pages/Cart';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <div className='App'>
          <div className='container'>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/SellerSignup" element={<SellerSignup/>}></Route>
            <Route path="/SellerLogin" element={<SellerLogin/>}></Route>
            <Route path="/CustomerSignup" element={<CustomerSignup/>}></Route>
            <Route path="/CustomerLogin" element={<CustomerLogin/>}></Route>
            <Route path="/AdminLogin" element={<AdminLogin/>}></Route>
            <Route path="/Admin/AddNewAdmin" element={<AddNewAdmin/>}></Route>
            <Route path="/Admin/ListUsers" element={<ListUsers/>}></Route>
            <Route path="/Seller/AddProduct" element={<AddProduct/>}></Route>
            <Route path="/Seller/MyProducts" element={<MyProducts/>}></Route>
            <Route path="/Seller/MyProducts/ModifyProduct/:id" element={<ModifyProduct/>}></Route>
            <Route path="/Customer/Cart" element={<Cart/>}></Route>
          </Routes>
          </div>
        </div>
    </BrowserRouter>
  );
}

export default App;

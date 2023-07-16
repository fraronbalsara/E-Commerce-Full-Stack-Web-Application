import React from 'react';
import './App.css';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import CustomerSignup from './pages/CustomerSignup';
import SellerSignup from './pages/SellerSignup';
import CustomerLogin from './pages/CustomerLogin';
import SellerLogin from './pages/SellerLogin';


import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <div className='App'>
          <div className='container'>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/AddProduct" element={<AddProduct/>}></Route>
            <Route path="/CustomerSignup" element={<CustomerSignup/>}></Route>
            <Route path="/SellerSignup" element={<SellerSignup/>}></Route>
            <Route path="/CustomerLogin" element={<CustomerLogin/>}></Route>
            <Route path="/SellerLogin" element={<SellerLogin/>}></Route>
          </Routes>
          </div>
        </div>
    </BrowserRouter>
  );
}

export default App;

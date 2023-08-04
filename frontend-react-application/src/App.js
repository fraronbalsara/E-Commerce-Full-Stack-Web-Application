import React from 'react';
import './App.css';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import CustomerSignup from './pages/CustomerSignup';
import SellerSignup from './pages/SellerSignup';
import CustomerLogin from './pages/CustomerLogin';
import SellerLogin from './pages/SellerLogin';
import AdminLogin from './pages/AdminLogin';
import AddNewAdmin from './pages/AddNewAdmin';
import ListUsers from './pages/ListUsers';
import MyProducts from './pages/MyProducts';
import ModifyProduct from './pages/ModifyProduct';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <div className='App'>
          <div className='container'>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/AddProduct" element={<AddProduct/>}></Route>
            <Route path="/MyProducts" element={<MyProducts/>}></Route>
            <Route path="/MyProducts/ModifyProduct/:id" element={<ModifyProduct/>}></Route>
            <Route path="/ListUsers" element={<ListUsers/>}></Route>
            <Route path="/AddNewAdmin" element={<AddNewAdmin/>}></Route>
            <Route path="/CustomerSignup" element={<CustomerSignup/>}></Route>
            <Route path="/SellerSignup" element={<SellerSignup/>}></Route>
            <Route path="/CustomerLogin" element={<CustomerLogin/>}></Route>
            <Route path="/SellerLogin" element={<SellerLogin/>}></Route>
            <Route path="/AdminLogin" element={<AdminLogin/>}></Route>
          </Routes>
          </div>
        </div>
    </BrowserRouter>
  );
}

export default App;

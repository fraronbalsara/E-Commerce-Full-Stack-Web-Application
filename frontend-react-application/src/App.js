import React from 'react';
import './App.css';
import AddProduct from './pages/AddProduct';
import Home from './pages/Home';
import CustomerSignup from './pages/CustomerSignup';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <div className='App'>
          <div className='container'>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/AddProduct" element={<AddProduct/>}></Route>
          </Routes>
          </div>
        </div>
    </BrowserRouter>
  );
}

export default App;

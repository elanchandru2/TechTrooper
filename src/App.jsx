import React, {useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Mainpage from './components/Mainpage';
import ProductDetail from './components/ProductDetail';
import Checkout from './components/Checkout';
import { Footer } from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import "./App.css"


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/checkout/:id/:quantity/:image/:title/:description/:price" element={<Checkout />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer /> 
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Showcase from './pages/Showcase';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import { CartProvider } from './components/CartContext';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;

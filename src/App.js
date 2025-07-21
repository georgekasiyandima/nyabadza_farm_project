import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Showcase from './pages/Showcase';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Compare from './pages/Compare';
import ProductDetails from './pages/ProductDetails';
import FarmInfo from './pages/FarmInfo';
import { CartProvider } from './components/CartContext';
import { WishlistProvider } from './components/WishlistContext';
import { CompareProvider } from './components/CompareContext';

function App() {
  return (
    <CompareProvider>
      <WishlistProvider>
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
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/farm-info" element={<FarmInfo />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </WishlistProvider>
    </CompareProvider>
  );
}

export default App;

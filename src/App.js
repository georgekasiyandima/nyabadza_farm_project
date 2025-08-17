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
import Checkout from './pages/Checkout';        // ✅ Added checkout
import Confirmation from './pages/Confirmation'; // ✅ Added confirmation
import Orders from './pages/Orders';
import FarmProfile from './pages/FarmProfile';
import PolicyDocs from './pages/PolicyDocs';
import PolicyTerms from './pages/PolicyTerms';
import PolicySustainability from './pages/PolicySustainability';
import PolicyReturns from './pages/PolicyReturns';
import PolicyPrivacy from './pages/PolicyPrivacy';
import PolicyCommunity from './pages/PolicyCommunity';
import { CartProvider } from './components/CartContext';
import { WishlistProvider } from './components/WishlistContext';
import { CompareProvider } from './components/CompareContext';
import Footer from './components/Footer';

function App() {
  return (
    <CompareProvider>
      <WishlistProvider>
        <CartProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              {/* Main Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/showcase" element={<Showcase />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/farm-info" element={<FarmInfo />} />
              <Route path="/farm-profile" element={<FarmProfile />} />
              <Route path="/policy" element={<PolicyDocs />} />
              <Route path="/policy/terms" element={<PolicyTerms />} />
              <Route path="/policy/sustainability" element={<PolicySustainability />} />
              <Route path="/policy/returns" element={<PolicyReturns />} />
              <Route path="/policy/privacy" element={<PolicyPrivacy />} />
              <Route path="/policy/community" element={<PolicyCommunity />} />

              {/* Product + Shopping Flow */}
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />         {/* ✅ checkout */}
              <Route path="/confirmation" element={<Confirmation />} /> {/* ✅ confirmation */}
              <Route path="/orders" element={<Orders />} />

              {/* User Actions */}
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/compare" element={<Compare />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </CartProvider>
      </WishlistProvider>
    </CompareProvider>
  );
}

export default App;

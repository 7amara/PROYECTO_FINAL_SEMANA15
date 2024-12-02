import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/shop/Home';
import ProductDetails from './pages/shop/ProductDetails';
import Cart from './pages/shop/Cart';
import Message from './pages/shop/Message';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProtectedRoute from './components/ProtectedRoute';
import ProductManagemen from './pages/admin/ProductManagement';
import ProductForm from './pages/admin/ProductForm';



const listCategory = [
  'Gato',
  'Perro',
  'Conejo',
]

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-4">
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/Message" element={<Message />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas protegidas para admin */}
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute adminOnly>
                <ProductManagemen />
              </ProtectedRoute>
            }
            
          />
          
          <Route
            path="/admin/products/add"
            element={
              <ProtectedRoute adminOnly>
                <ProductForm categories={listCategory} onSuccess={() => { }} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products/edit/:id"
            element={
              <ProtectedRoute adminOnly>
                <ProductForm
                  categories={listCategory}
                  onSuccess={() => { }}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;

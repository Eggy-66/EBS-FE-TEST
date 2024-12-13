
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import ProductList from './pages/ProductList';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import  Header  from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="App">
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
      <Footer />
    </CartProvider>
    </div>
  );
};

export default App;

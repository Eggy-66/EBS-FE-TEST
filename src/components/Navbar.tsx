import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css'; // Importăm fișierul CSS

const Navbar: React.FC = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error('CartContext must be used within a CartProvider');
  }

  const { cart } = cartContext;

  // Calculăm numărul total de produse din coș
  const totalItems = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-link">
        <FontAwesomeIcon icon={faHome} className="icon" />
        <span className="link-text">Home</span>
      </Link>
      <Link to="/cart" className="navbar-link cart-link">
        <FontAwesomeIcon icon={faShoppingCart} className="icon" />
        <span className="link-text">Cart</span>
        {totalItems > 0 && (
          <span className="cart-badge">{totalItems}</span>
        )}
      </Link>
    </nav>
  );
};

export default Navbar;

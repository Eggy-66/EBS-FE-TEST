import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error('CartContext must be used within a CartProvider');
  }

  const { cart } = cartContext;

  // Calculăm numărul total de produse din coș
  const totalItems = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f4f4f4' }}>
      <Link to="/">Home</Link>
      <Link to="/cart" style={{ position: 'relative', textDecoration: 'none', color: 'black' }}>
        <span>Cart</span>
        {totalItems > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              backgroundColor: 'red',
              color: 'white',
              borderRadius: '50%',
              padding: '5px 10px',
              fontSize: '12px',
            }}
          >
            {totalItems}
          </span>
        )}
      </Link>
    </nav>
  );
};

export default Navbar;

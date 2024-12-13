import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Product } from '../types/types';

const CartPage: React.FC = () => {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error('CartContext must be used within a CartProvider');
  }

  const { cart, addToCart, removeFromCart, clearCart } = cartContext;
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Eroare la preluarea produselor:', error);
      }
    };

    fetchProducts();
  }, []);

  const getProductById = (id: string) =>
    products.find((product) => product.id === parseInt(id));


  const calculateTotalPrice = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = getProductById(productId);
      return product ? total + product.price * quantity : total;
    }, 0);
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {Object.keys(cart).length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {Object.entries(cart).map(([productId, quantity]) => {
              const product = getProductById(productId);
              return product ? (
                <div className="card" key={productId}>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                  <h2>{product.title}</h2>
                  <p>Price: ${product.price}</p>
                  <p>Quantity: {quantity}</p>
                  <button onClick={() => addToCart(productId)}>+</button>
                  <button onClick={() => removeFromCart(productId)}>-</button>
                </div>
              ) : null;
            })}
          </ul>
          {/* Afișarea prețului total */}
          <div style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>
            Total Price: ${calculateTotalPrice().toFixed(2)}
          </div>
        </div>
      )}
      <button onClick={clearCart} style={{ marginTop: '20px' }}>
        Clear Cart
      </button>
      <Link to="/" style={{ marginTop: '20px', display: 'block' }}>
        Back to Products
      </Link>
    </div>
  );
};

export default CartPage;

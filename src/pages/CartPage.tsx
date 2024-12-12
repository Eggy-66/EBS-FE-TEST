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

  return (
    <div>
      <h1>Your Cart</h1>
      {Object.keys(cart).length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {Object.entries(cart).map(([productId, quantity]) => {
            const product = getProductById(productId);
            return product ? (
              <div className="card" >
                <img src={product.image} alt={product.title} style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                <h2>{product.title}</h2>
                <p>Price: ${product.price}</p>
                <p>Quantity: {quantity}</p>
                <button onClick={() => addToCart(productId)}>{quantity}</button>
                <button onClick={() => removeFromCart(productId)}>-</button>
              
              </div>
            ) : null;
          })}
        </ul>
      )}
      <button onClick={clearCart}>Clear Cart</button>
      <Link to="/">Back to Products</Link>
    </div>
  );
};

export default CartPage;

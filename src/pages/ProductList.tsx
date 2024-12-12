import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';
import { Product } from '../types/types';
import Card from '../components/';
import '../components/Card.css';



const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error('CartContext must be used within a CartProvider');
  }

  const { addToCart } = cartContext;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Eroare la preluarea produselor:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div>
      <h1>Products</h1>
      <Link to="/cart">Go to Cart</Link>
      <div className="product-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        {products.map((product) => (
          <Card
            key={product.id}
            product={product}
            onAddToCart={() => addToCart(product.id.toString())}
            onViewDetails={() => console.log(`View details for product ${product.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;

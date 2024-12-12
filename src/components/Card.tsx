import React from 'react';
import { Product } from '../types/types';


interface CardProps {
  product: Product;
  onAddToCart: () => void;
  onViewDetails?: () => void;
}

const Card: React.FC<CardProps> = ({ product, onAddToCart, onViewDetails }) => {
  return (
    <div className="card" style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
      <img
        src={product.image}
        alt={product.title}
        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
      />
      <h3>{product.title}</h3>
      <p>Price: ${product.price}</p>
      <button onClick={onAddToCart}>Add to Cart</button>
      {onViewDetails && <button onClick={onViewDetails}>View Details</button>}
    </div>
  );
};

export default Card;

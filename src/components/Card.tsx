import React from 'react';
import { Product } from '../types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './Card.css';

interface CardProps {
  product: Product;
  onAddToCart: () => void;
  onViewDetails?: () => void;
}

const Card: React.FC<CardProps> = ({ product, onAddToCart, onViewDetails }) => {
  return (
    <div className="card">
      <img src={product.image} alt={product.title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{product.title}</h3>
        <p className="card-price">Price: ${product.price.toFixed(2)}</p>
        <div className="card-actions">
          <button onClick={onAddToCart} className="card-button">
            <FontAwesomeIcon icon={faCartPlus} className="card-icon" /> Add to Cart
          </button>
          {onViewDetails && (
            <button onClick={onViewDetails} className="card-button">
              <FontAwesomeIcon icon={faInfoCircle} className="card-icon" /> View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;

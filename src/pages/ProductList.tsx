import React, { useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';
import { Product } from '../types/types';
import Card from '../components/Card';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1); // Pagina curentă
  const productsPerPage = 8; // Numărul de produse pe pagină

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

  // Calculăm indexul produselor afișate
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Funcții pentru schimbarea paginii
  const nextPage = () => {
    if (currentPage < Math.ceil(products.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h1>Products</h1>
      <div className="product-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        {currentProducts.map((product) => (
          <Card
            key={product.id}
            product={product}
            onAddToCart={() => addToCart(product.id.toString())}
          />
        ))}
      </div>

      {/* Navigație pentru pagini */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span style={{ margin: '0 10px' }}>
          Page {currentPage} of {Math.ceil(products.length / productsPerPage)}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(products.length / productsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;

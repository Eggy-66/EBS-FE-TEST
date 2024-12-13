import React, { useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';
import { Product } from '../types/types';
import Card from '../components/Card';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [loading, setLoading] = useState<boolean>(true);

  // State pentru paginare
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 8;

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
        setFilteredProducts(data);

        // Extragem categoriile din produse
        const uniqueCategories = Array.from(new Set(data.map((product: Product) => product.category)));
        setCategories(['All', ...uniqueCategories]);

        setLoading(false);
      } catch (error) {
        console.error('Eroare la preluarea produselor:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Aplicăm filtrele pe produsele originale
    let filtered = products;

    // Filtrare după categorie
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Filtrare după interval de preț
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1]);

    setFilteredProducts(filtered);
    // Resetăm pagina curentă la 1 când schimbăm filtrarea
    setCurrentPage(1);
  }, [products, selectedCategory, priceRange]);

  if (loading) {
    return <p>Loading products...</p>;
  }

  // Calcul pentru paginare
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Funcții de navigare între pagini
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
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

      {/* Filtre */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
        {/* Filtrare după categorie */}
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Filtrare după preț */}
        <div>
          <label>Price: </label>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
          />
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          />
          <span>
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
      </div>

      {/* Lista de produse */}
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
      {filteredProducts.length > productsPerPage && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span style={{ margin: '0 10px' }}>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;

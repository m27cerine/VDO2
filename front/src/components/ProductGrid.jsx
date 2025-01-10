
// Composant ProductGrid
import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ title, products }) => {
    return (
      <section className="my-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <div className="flex gap-2">
            <button className="p-1 border rounded">←</button>
            <button className="p-1 border rounded">→</button>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    );
  };

  export default ProductGrid;
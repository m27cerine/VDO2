import React from 'react';
import Layout from '../../components/Layout';
import CategoryGrid from '../../components/CategoryGrid';
import PromoSection from '../../components/PromoSection';
import ProductGrid from '../../components/productGrid';
import { bestSellerProducts, flashSaleProducts } from '../../data/products';

const Accueil = () => {
  return (
    <Layout>
      <CategoryGrid />
      <PromoSection />
      <ProductGrid 
        title="Meilleurs ventes"
        products={bestSellerProducts}
      />
      <ProductGrid 
        title="Nos ventes flashs"
        products={flashSaleProducts}
      />
    </Layout>
  );
};

export default Accueil;
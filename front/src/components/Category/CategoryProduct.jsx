import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, CircularProgress } from '@mui/material';
import ProductCard from '../Product/ProductCard';
import { getAllCategoriesFn, getCategorieFn } from '../../api/categorieApi';
import { getPiecesByCategoryFn } from '../../api/pieceApi';

const CategoryProducts = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await getAllCategoriesFn();
        setCategories(categoryData);

        // Automatically select the first category
        if (categoryData.length > 0) {
          setSelectedCategory(categoryData[0]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch subcategories and products when the selected category changes
  useEffect(() => {
    const fetchSubCategoriesAndProducts = async () => {
      if (selectedCategory) {
        setIsLoading(true);
        try {
          const categoryDetails = await getCategorieFn(selectedCategory.id_categorie);
          setSubCategories(categoryDetails.sousCategories || []);
  
          // Fetch products for the selected category
          const categoryPieces = await getPiecesByCategoryFn(selectedCategory.id_categorie);
          console.log("Products for selected category:", categoryPieces);
          setProducts(categoryPieces);
        } catch (error) {
          console.error('Error fetching subcategories or products:', error);
          setProducts([]);
        } finally {
          setIsLoading(false);
        }
      }
    };
  
    fetchSubCategoriesAndProducts();
  }, [selectedCategory]);

  // Fetch products when the selected subcategory changes
  useEffect(() => {
    const fetchProducts = async () => {
      if (selectedSubCategory) {
        setIsLoading(true);
        try {
          const productData = await getPiecesByCategoryFn(
            selectedCategory.id_categorie, 
            selectedSubCategory.id_sous_categorie
          );
          console.log("Products for subcategory:", productData);
          setProducts(productData);
        } catch (error) {
          console.error("Error fetching products:", error);
          setProducts([]);
        } finally {
          setIsLoading(false);
        }
      }
    };
  
    fetchProducts();
  }, [selectedSubCategory, selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory(null);
    setSubCategories([]);
  };

  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ my: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Products by Category
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, bgcolor: 'white', borderRadius: 1, p: 0.5 }}>
          {categories.map((category) => (
            <Typography
              key={category.id_categorie}
              onClick={() => handleCategoryClick(category)}
              sx={{
                px: 1,
                py: 0.5,
                borderRadius: 1,
                cursor: 'pointer',
                bgcolor: selectedCategory?.id_categorie === category.id_categorie ? '#fabd15' : 'transparent',
                '&:hover': { bgcolor: '#f5f5f5' }
              }}
            >
              {category.nom_categorie}
            </Typography>
          ))}
        </Box>
      </Box>

      {selectedCategory && subCategories.length > 0 && (
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          {subCategories.map((subCategory) => (
            <Typography
              key={subCategory.id_sous_categorie}
              onClick={() => handleSubCategoryClick(subCategory)}
              sx={{
                px: 2,
                py: 1,
                borderRadius: 1,
                cursor: 'pointer',
                bgcolor: selectedSubCategory?.id_sous_categorie === subCategory.id_sous_categorie ? '#fabd15' : 'transparent',
                '&:hover': { bgcolor: '#f5f5f5' }
              }}
            >
              {subCategory.nom_sous_categorie}
            </Typography>
          ))}
        </Box>
      )}

      {products.length > 0 ? (
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id_piece}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
          No products available for this category or subcategory.
        </Typography>
      )}
    </Box>
  );
};

export default CategoryProducts;
import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Grid, CircularProgress, Skeleton } from '@mui/material';
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
  const [error, setError] = useState(null);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const categoryData = await getAllCategoriesFn();
        
        if (categoryData?.length > 0) {
          setCategories(categoryData);
          setSelectedCategory(categoryData[0]);
        } else {
          setError('No categories available');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Memoized fetch function for subcategories and products
  const fetchSubCategoriesAndProducts = useCallback(async (categoryId) => {
    if (!categoryId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const [categoryDetails, categoryProducts] = await Promise.all([
        getCategorieFn(categoryId),
        getPiecesByCategoryFn(categoryId)
      ]);

      setSubCategories(categoryDetails.sousCategories || []);
      setProducts(categoryProducts || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load category details');
      setProducts([]);
      setSubCategories([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Effect for category changes
  useEffect(() => {
    if (selectedCategory?.id_categorie) {
      fetchSubCategoriesAndProducts(selectedCategory.id_categorie);
    }
  }, [selectedCategory, fetchSubCategoriesAndProducts]);

  // Memoized fetch function for subcategory products
  const fetchSubCategoryProducts = useCallback(async (categoryId, subCategoryId) => {
    if (!categoryId || !subCategoryId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const productData = await getPiecesByCategoryFn(categoryId, subCategoryId);
      setProducts(productData || []);
    } catch (error) {
      console.error('Error fetching subcategory products:', error);
      setError('Failed to load products');
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Effect for subcategory changes
  useEffect(() => {
    if (selectedCategory?.id_categorie && selectedSubCategory?.id_sous_categorie) {
      fetchSubCategoryProducts(
        selectedCategory.id_categorie,
        selectedSubCategory.id_sous_categorie
      );
    }
  }, [selectedSubCategory, selectedCategory, fetchSubCategoryProducts]);

  const handleCategoryClick = (category) => {
    if (category.id_categorie !== selectedCategory?.id_categorie) {
      setSelectedCategory(category);
      setSelectedSubCategory(null);
      setSubCategories([]);
    }
  };

  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(
      selectedSubCategory?.id_sous_categorie === subCategory.id_sous_categorie 
        ? null 
        : subCategory
    );
  };

  if (error) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '300px',
        color: 'error.main'
      }}>
        <Typography>{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ my: 4 }}>
      {/* Category Header */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'flex-start', md: 'center' }, 
        gap: 2, 
        mb: 2 
      }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', minWidth: 'max-content' }}>
          Products by Category
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          gap: 1, 
          bgcolor: 'white', 
          borderRadius: 1, 
          p: 0.5,
          width: { xs: '100%', md: 'auto' }
        }}>
          {isLoading ? (
            [...Array(3)].map((_, index) => (
              <Skeleton key={index} width={100} height={32} />
            ))
          ) : (
            categories.map((category) => (
              <Typography
                key={category.id_categorie}
                onClick={() => handleCategoryClick(category)}
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  cursor: 'pointer',
                  bgcolor: selectedCategory?.id_categorie === category.id_categorie ? '#fabd15' : 'transparent',
                  transition: 'background-color 0.2s',
                  '&:hover': { bgcolor: selectedCategory?.id_categorie === category.id_categorie ? '#fabd15' : '#f5f5f5' },
                  userSelect: 'none'
                }}
              >
                {category.nom_categorie}
              </Typography>
            ))
          )}
        </Box>
      </Box>

      {/* Subcategories */}
      {selectedCategory && (
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          gap: 2, 
          mb: 3 
        }}>
          {isLoading ? (
            [...Array(4)].map((_, index) => (
              <Skeleton key={index} width={120} height={40} />
            ))
          ) : (
            subCategories.map((subCategory) => (
              <Typography
                key={subCategory.id_sous_categorie}
                onClick={() => handleSubCategoryClick(subCategory)}
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  cursor: 'pointer',
                  bgcolor: selectedSubCategory?.id_sous_categorie === subCategory.id_sous_categorie ? '#fabd15' : 'transparent',
                  transition: 'background-color 0.2s',
                  '&:hover': { 
                    bgcolor: selectedSubCategory?.id_sous_categorie === subCategory.id_sous_categorie ? '#fabd15' : '#f5f5f5' 
                  },
                  userSelect: 'none'
                }}
              >
                {subCategory.nom_sous_categorie}
              </Typography>
            ))
          )}
        </Box>
      )}

      {/* Products Grid */}
      {isLoading ? (
        <Grid container spacing={2}>
          {[...Array(6)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton variant="rectangular" height={200} />
            </Grid>
          ))}
        </Grid>
      ) : products.length > 0 ? (
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id_piece}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography 
          variant="body1" 
          sx={{ 
            textAlign: 'center', 
            mt: 4,
            color: 'text.secondary'
          }}
        >
          No products available for this {selectedSubCategory ? 'subcategory' : 'category'}.
        </Typography>
      )}
    </Box>
  );
};

export default CategoryProducts;
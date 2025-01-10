import React from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryCard from './CategoryCard';

const categories = [
  { 
    id: 1,
    icon: "🚗",
    name: "Moteur",
    image: "/api/placeholder/200/200"
  },
  {
    id: 2,
    icon: "⚡",
    name: "Energie",
    image: "/api/placeholder/200/200"
  },
  {
    id: 3,
    icon: "⚙️",
    name: "Pièces",
    image: "/api/placeholder/200/200"
  },
  {
    id: 4,
    icon: "🔧",
    name: "Mécanique",
    image: "/api/placeholder/200/200"
  },
  {
    id: 5,
    icon: "🚘",
    name: "Carrosserie",
    image: "/api/placeholder/200/200"
  },
  {
    id: 6,
    icon: "💡",
    name: "Electricité",
    image: "/api/placeholder/200/200"
  }
];

const CategoryGrid = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/categorie/${categoryId}`);
  };

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-4 my-8">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          {...category}
          onClick={() => handleCategoryClick(category.id)}
        />
      ))}
    </div>
  );
};

export default CategoryGrid;
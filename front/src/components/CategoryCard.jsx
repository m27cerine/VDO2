import React from 'react';

const CategoryCard = ({ icon, name, image, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="w-12 h-12 mb-2 flex items-center justify-center">
        <img src={image} alt={name} className="w-full h-full object-contain" />
      </div>
      <span className="text-sm font-medium text-gray-700">{name}</span>
    </div>
  );
};

export default CategoryCard;
// Composant PromoSection
import React from 'react';

const PromoSection = () => {
    return (
      <div className="grid grid-cols-2 gap-4 my-8">
        <div className="bg-gray-900 text-white p-8 rounded-lg">
          <h3 className="text-2xl font-bold">40% De remise sur nos Accessoires</h3>
          <button className="bg-yellow-400 text-black px-4 py-2 rounded mt-4">
            Commander
          </button>
        </div>
        <div className="bg-gray-900 text-white p-8 rounded-lg">
          <h3 className="text-2xl font-bold">Toutes pièces à partir de 2'500 DA</h3>
          <button className="bg-yellow-400 text-black px-4 py-2 rounded mt-4">
            Commander
          </button>
        </div>
      </div>
    );
  };

export default PromoSection;
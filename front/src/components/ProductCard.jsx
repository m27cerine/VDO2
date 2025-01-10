// Composant ProductCard mis à jour
const ProductCard = ({ name, price, oldPrice, image, timeLeft }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
        <div className="relative">
          <img src={image} alt={name} className="w-full h-48 object-cover rounded"/>
          {timeLeft && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
              {timeLeft}
            </div>
          )}
        </div>
        <h3 className="mt-4 font-medium text-gray-900 truncate">{name}</h3>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <p className="text-gray-900 font-bold">{price.toLocaleString()} DA</p>
            {oldPrice && (
              <p className="text-sm text-gray-500 line-through">
                {oldPrice.toLocaleString()} DA
              </p>
            )}
          </div>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded text-sm">
            + Panier
          </button>
        </div>
      </div>
    );
  };

export default ProductCard;
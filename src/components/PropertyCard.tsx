import React from 'react';
import { Plus, Minus, ShoppingCart, Bed, Bath, Square } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { addToCart, removeFromCart, isInCart, getQuantity } = useCart();
  const quantity = getQuantity(property.id);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
        <p className="text-gray-600 mb-2">{property.location}</p>
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <Bed size={18} className="mr-1" />
            <span>{property.bedrooms} beds</span>
          </div>
          <div className="flex items-center">
            <Bath size={18} className="mr-1" />
            <span>{property.bathrooms} baths</span>
          </div>
          <div className="flex items-center">
            <Square size={18} className="mr-1" />
            <span>{property.area} sqft</span>
          </div>
        </div>
        <p className="text-2xl font-bold mb-4">${property.price.toLocaleString()}</p>
        <div className="flex items-center justify-between">
          {isInCart(property.id) ? (
            <div className="flex items-center">
              <button
                onClick={() => removeFromCart(property.id)}
                className="bg-red-500 text-white p-2 rounded-l"
              >
                <Minus size={18} />
              </button>
              <span className="bg-gray-200 px-4 py-2">{quantity}</span>
              <button
                onClick={() => addToCart(property)}
                className="bg-green-500 text-white p-2 rounded-r"
              >
                <Plus size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(property)}
              className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
            >
              <ShoppingCart size={18} className="mr-2" />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
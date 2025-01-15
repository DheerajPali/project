import React from 'react';
import { Plus, ShoppingCart } from 'lucide-react';
import { useStore } from '../lib/store';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  onAddToCart,
}) => {
  const cartItems = useStore((state) => state.cartItems);
  const cartQuantity = cartItems.find(item => item.id === id)?.quantity || 0;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{name}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-teal-600">₹{price}</span>
          <div className="flex items-center gap-2">
            {cartQuantity > 0 && (
              <span className="text-sm text-gray-600 flex items-center gap-1">
                <ShoppingCart size={16} />
                {cartQuantity}
              </span>
            )}
            <button
              onClick={onAddToCart}
              className="flex items-center gap-1 bg-teal-600 text-white px-3 py-1.5 rounded-lg hover:bg-teal-700"
            >
              <Plus size={16} />
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
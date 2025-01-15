import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User } from 'lucide-react';
import { useStore } from '../lib/store';

const Navbar = () => {
  const { searchQuery, setSearchQuery, cartItems } = useStore();
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-teal-600">
            HealthCare
          </Link>
          
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search medicines and healthcare products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/cart" className="text-gray-600 hover:text-teal-600 relative">
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <Link to="/profile" className="text-gray-600 hover:text-teal-600">
              <User size={24} />
            </Link>
          </div>
        </div>
        
        <div className="py-2 flex items-center space-x-6 text-sm">
          <Link to="/products" className="text-gray-600 hover:text-teal-600">All Products</Link>
          <Link to="/products?category=medicines" className="text-gray-600 hover:text-teal-600">Medicines</Link>
          <Link to="/products?category=healthcare" className="text-gray-600 hover:text-teal-600">Healthcare</Link>
          <Link to="/book-appointment" className="text-gray-600 hover:text-teal-600">Book Appointment</Link>
          <Link to="/admin" className="text-gray-600 hover:text-teal-600">Admin</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
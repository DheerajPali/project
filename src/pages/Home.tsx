import React from 'react';
import { Link } from 'react-router-dom';
import { Pill, Stethoscope, Clock } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-teal-600 text-white rounded-2xl overflow-hidden">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-lg">
            <h1 className="text-4xl font-bold mb-4">Your Health, Our Priority</h1>
            <p className="text-lg mb-8">Order medicines online and book healthcare services at your doorstep</p>
            <Link
              to="/products"
              className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <Pill className="text-teal-600 mb-4" size={32} />
          <h3 className="text-xl font-semibold mb-2">Online Pharmacy</h3>
          <p className="text-gray-600">Order medicines and healthcare products online with doorstep delivery</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <Stethoscope className="text-teal-600 mb-4" size={32} />
          <h3 className="text-xl font-semibold mb-2">Healthcare Services</h3>
          <p className="text-gray-600">Book healthcare services like checkups and tests at your home</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <Clock className="text-teal-600 mb-4" size={32} />
          <h3 className="text-xl font-semibold mb-2">Quick Delivery</h3>
          <p className="text-gray-600">Get your medicines delivered within hours</p>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {/* Product cards will be dynamically rendered here */}
        </div>
      </section>
    </div>
  );
}

export default Home;
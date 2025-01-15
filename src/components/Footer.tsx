import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">HealthCare</h3>
            <p className="text-gray-600 text-sm">
              Your trusted partner for all healthcare needs. Order medicines and book healthcare services from the comfort of your home.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products" className="text-gray-600 hover:text-teal-600">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/book-appointment" className="text-gray-600 hover:text-teal-600">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-teal-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-teal-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-gray-600">
                <Phone size={16} />
                <span>1800-123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <Mail size={16} />
                <span>support@healthcare.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <MapPin size={16} />
                <span>123 Healthcare Street, City</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Download Our App</h4>
            <p className="text-sm text-gray-600 mb-4">
              Get our app for the best experience
            </p>
            <div className="space-y-2">
              <button className="bg-black text-white w-full py-2 rounded-lg text-sm">
                Download on App Store
              </button>
              <button className="bg-black text-white w-full py-2 rounded-lg text-sm">
                Get it on Google Play
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
          <p>© 2024 HealthCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
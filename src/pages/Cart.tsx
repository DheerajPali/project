import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useStore } from '../lib/store';

const Cart = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity, clearCart } = useStore();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [processing, setProcessing] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    setProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('Payment successful! Your order has been placed.');
    clearCart();
    setProcessing(false);
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="space-y-6">
        {/* Cart Items */}
        <div className="bg-white rounded-lg shadow-sm">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center p-4 border-b last:border-b-0">
              <img
                src={item.image_url}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="flex-1 ml-4">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-teal-600 font-semibold">₹{item.price}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <button
                    onClick={() => updateCartItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="px-2 py-1 border rounded-l"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-y">{item.quantity}</span>
                  <button
                    onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 border rounded-r"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select payment method</option>
                <option value="card">Credit/Debit Card</option>
                <option value="upi">UPI</option>
                <option value="cod">Cash on Delivery</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>₹40</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{total + 40}</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleCheckout}
            disabled={processing}
            className="w-full bg-teal-600 text-white py-3 rounded-lg mt-6 hover:bg-teal-700 disabled:bg-gray-400"
          >
            {processing ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
import React, { useState } from 'react';
import { User, ShoppingBag, Calendar, Edit2 } from 'lucide-react';
import { useStore } from '../lib/store';

const Profile = () => {
  const { user, updateProfile, orders, appointments } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-teal-100 p-3 rounded-full">
              <User size={32} className="text-teal-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 text-teal-600 hover:text-teal-700"
          >
            <Edit2 size={20} />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={3}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium">{user.phone}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-gray-600">Address</p>
              <p className="font-medium">{user.address}</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <ShoppingBag className="text-teal-600" />
            <h2 className="text-xl font-semibold">Orders</h2>
          </div>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="p-4 border rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Order #{order.id}</span>
                  <span className="text-teal-600">₹{order.total}</span>
                </div>
                <p className="text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm font-medium mt-1 capitalize text-yellow-600">
                  {order.status}
                </p>
              </div>
            ))}
            {orders.length === 0 && (
              <p className="text-gray-600 text-center py-4">No orders yet</p>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="text-teal-600" />
            <h2 className="text-xl font-semibold">Appointments</h2>
          </div>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="p-4 border rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{appointment.serviceType}</span>
                  <span className="text-yellow-600">{appointment.status}</span>
                </div>
                <p className="text-sm text-gray-600">
                  {new Date(appointment.appointmentDate).toLocaleString()}
                </p>
              </div>
            ))}
            {appointments.length === 0 && (
              <p className="text-gray-600 text-center py-4">No appointments yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
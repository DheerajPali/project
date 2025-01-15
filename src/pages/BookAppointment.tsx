import React, { useState } from 'react';
import { useStore } from '../lib/store';
import { AlertCircle } from 'lucide-react';

const services = [
  { id: 'sugar', name: 'Sugar Checkup', price: 299 },
  { id: 'blood-pressure', name: 'Blood Pressure Checkup', price: 199 },
  { id: 'injection', name: 'Injection Administration', price: 149 },
  { id: 'drip', name: 'IV Drip Administration', price: 499 },
];

const BookAppointment = () => {
  const addAppointment = useStore((state) => state.addAppointment);
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    address: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.address.toLowerCase().includes('indore')) {
      alert('Sorry, we currently only serve in Indore.');
      return;
    }
    
    addAppointment({
      userId: 'demo-user',
      serviceType: formData.service,
      appointmentDate: `${formData.date}T${formData.time}`,
      address: formData.address,
    });

    alert('Appointment booked successfully!');
    setFormData({ service: '', date: '', time: '', address: '' });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Book a Home Visit</h1>
      
      {/* Location Notice */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
        <div className="flex items-center">
          <AlertCircle className="text-yellow-400 mr-3" size={24} />
          <p className="text-sm text-yellow-700">
            We're currently only available in Indore. Please ensure your address is within Indore city limits.
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Service
          </label>
          <select
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name} - ₹{service.price}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time
            </label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <textarea
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={3}
            required
            placeholder="Please enter your complete address in Indore"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;
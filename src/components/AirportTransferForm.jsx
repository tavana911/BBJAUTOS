import React, { useState } from 'react';

export default function AirportTransferForm() {
  const [formData, setFormData] = useState({
    name: '',
    flightNumber: '',
    date: '',
    time: '',
    serviceType: 'airport-pickup',
    passengers: '1',
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct a clean, detailed WhatsApp message
    const message = `*Airport Transfer Booking*
---------------------------
Name: ${formData.name}
Service: ${formData.serviceType === 'airport-pickup' ? 'Airport Pickup' : 'Drop-off / Charter'}
Flight Number: ${formData.flightNumber || 'N/A'}
Date: ${formData.date}
Time: ${formData.time}
Passengers: ${formData.passengers}
Additional Notes: ${formData.notes || 'None'}`;

    // Replace with the actual business number (e.g., 2348012345678)
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/2347078236267?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto my-8 bg-white rounded-lg shadow-md border p-6 sm:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Airport Transfer & Protocol</h2>
        <p className="mt-1 text-sm text-gray-500">Book chauffeur services and airport pick-ups directly.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input 
              type="text" 
              name="name"
              required 
              onChange={handleInputChange}
              value={formData.name}
              placeholder="John Doe"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" 
            />
          </div>

          {/* Service Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Service Type</label>
            <select 
              name="serviceType"
              onChange={handleInputChange}
              value={formData.serviceType}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="airport-pickup">Airport Pickup</option>
              <option value="airport-dropoff">Airport Drop-off</option>
              <option value="protocol-service">Protocol Chauffeur</option>
            </select>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input 
              type="date" 
              name="date"
              required 
              onChange={handleInputChange}
              value={formData.date}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" 
            />
          </div>

          {/* Time Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <input 
              type="time" 
              name="time"
              required 
              onChange={handleInputChange}
              value={formData.time}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" 
            />
          </div>

          {/* Flight Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Flight Number (If applicable)</label>
            <input 
              type="text" 
              name="flightNumber"
              onChange={handleInputChange}
              value={formData.flightNumber}
              placeholder="BA 075"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" 
            />
          </div>

          {/* Number of Passengers */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Passengers</label>
            <input 
              type="number" 
              name="passengers"
              min="1" 
              max="10"
              onChange={handleInputChange}
              value={formData.passengers}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" 
            />
          </div>
        </div>

        {/* Special Requests / Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Special Notes / Requests</label>
          <textarea 
            name="notes"
            rows="3"
            onChange={handleInputChange}
            value={formData.notes}
            placeholder="E.g., Extra luggage space, baby seat needed, specific drop-off destination."
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md transition duration-150 flex items-center justify-center gap-2 shadow-sm"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.967-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.884-.788-1.48-1.76-1.653-2.057-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.174.198-.298.297-.497.099-.198-.05-.371-.124-.52-.074-.149-.672-1.619-.92-2.216-.241-.579-.485-.5-.672-.51-.173-.007-.371-.006-.57-.006-.198 0-.521.074-.794.371-.273.297-1.042 1.018-1.042 2.484 0 1.466 1.066 2.875 1.214 3.074.149.198 2.094 3.203 5.071 4.493.708.303 1.264.484 1.696.621.712.226 1.362.194 1.874.118.572-.085 1.758-.719 2.007-1.413.249-.694.249-1.289.174-1.413-.075-.124-.273-.198-.57-.347m-5.421 7.403h-.004a6.743 6.743 0 0 1-3.468-.953l-.249-.148-2.585.677.69-2.522-.162-.258a6.75 6.75 0 1 1 5.776-3.042m-1.396-10.963c-.354.017-.706.079-1.05.185C7.942 5.045 5.86 7.124 5.832 9.774c-.012.784.186 1.554.577 2.235l.068.125-.333 1.218 1.248-.328.121.066a5.558 5.558 0 0 0 2.834.78h.004c2.88 0 5.225-2.333 5.239-5.213a5.21 5.21 0 0 0-2.234-4.298 5.215 5.215 0 0 0-1.897-.478z"/>
            </svg>
            Send Booking to WhatsApp
          </button>
        </div>
      </form>
    </div>
  );
}
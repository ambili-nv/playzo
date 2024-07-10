


import React, { useState, useEffect } from 'react';
import { USER_API } from '../../constants';
import axios from 'axios';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  venueId: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, venueId }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedDate) {
      const fetchAvailableSlots = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${USER_API}/get-slots/${venueId}/${selectedDate}`);
          console.log(response.data.timeSlots, "slots user");
          setAvailableSlots(response.data.timeSlots); // Set the actual timeSlots array
        } catch (err) {
          setError('Error fetching available slots');
        } finally {
          setLoading(false);
        }
      };

      fetchAvailableSlots();
    }
  }, [selectedDate, venueId]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleBooking = (slot: any) => {
    // Handle booking logic
    console.log(`Booking slot: ${slot.startTime} - ${slot.endTime} on date: ${selectedDate}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Book a Slot</h2>
        <div className="mb-4">
          <label htmlFor="date" className="block text-lg font-semibold mb-2">
            Select Date:
          </label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        {loading ? (
          <div>Loading available slots...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div className="space-y-2">
            {availableSlots.length > 0 ? (
              availableSlots.map((slot) => (
                <button
                  key={slot._id}
                  onClick={() => handleBooking(slot)}
                  className="block w-full p-4 bg-green-100 rounded-lg text-left transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <div className="text-lg font-semibold">{slot.startTime} - {slot.endTime}</div>
                  <div className="text-sm text-green-700">{slot.status}</div>
                </button>
              ))
            ) : (
              <div>No available slots for the selected date</div>
            )}
          </div>
        )}
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full text-white font-semibold shadow-md transition-all duration-300 ease-in-out bg-gray-500 hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;

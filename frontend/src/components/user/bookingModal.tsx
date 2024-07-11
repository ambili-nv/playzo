import React, { useState, useEffect } from 'react';
import { USER_API } from '../../constants';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import axiosInstance from '../../utils/axiosInstance';
import { Navigate, useNavigate } from 'react-router-dom';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  venueId: string;
  venuePrice: number;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, venueId, venuePrice }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedDate) {
      const fetchAvailableSlots = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${USER_API}/get-slots/${venueId}/${selectedDate}`);
          setAvailableSlots(response.data.timeSlots);
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

  const handleBooking = async (slot: any) => {

    // console.log("Venue ID:", venueId);
    // console.log("Slot ID:", slot._id);
    // console.log("Selected Date:", selectedDate);
    // console.log("Venue Price:", venuePrice);


    const stripe = await loadStripe('pk_test_51PaimnG8EaTCVCc3V37VRPWK4CHnrsjvdwOmKNyu6SZYIUJGBzPSJIuROfma8eqnXpQfQTOmBonXaPtiCUZBCFkx00OxC7tApr');

    try {
      const response = await axiosInstance.post(`${USER_API}/create-checkout-session`, {
        venueId,
        slotId: slot._id,
        selectedDate,
        fees: venuePrice,
        paymentStatus: "pending",
        appoinmentStatus: "pending",
      });

      if (response.data.sessionId) {
        //@ts-ignore
        const result = await stripe.redirectToCheckout({
          sessionId: response.data.sessionId,
        });

        if (result.error) {
          setError('Failed to initiate payment');
        }

        const bookingId = response.data.booking.bookingId
        console.log(response.data,"dataa");
        Navigate({
          to: `${USER_API}/payment_status/${bookingId}?success=true`,
        });
        
      }
    } catch (err) {
      setError('Error processing payment');
    }
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
                  className="block w-full p-4 bg-green-100 rounded-lg text-left transition duration-300 ease-in-out transform hover:bg-green-200"
                >
                  {slot.startTime} - {slot.endTime}
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
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import showToast from '../../utils/toaster';
import BookingCard from './BookingCard';
import { ADMIN_API } from '../../constants';

interface Booking {
  _id: string;
  venueId: {
    _id: string;
    name: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  fees: number;
  paymentStatus: string;
  bookingStatus: string;
}

const BookingHistory: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const response = await axiosInstance.get(`${ADMIN_API}/bookings/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        setBookings(response.data.bookings);
      } catch (err) {
        showToast('Failed to fetch booking history');
        setError('Failed to fetch booking history');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingHistory();
  }, [userId]);

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Booking History</h1>
      {bookings.length === 0 ? (
        <div>No bookings found for this user.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fees</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <BookingCard key={booking._id} booking={booking} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingHistory;

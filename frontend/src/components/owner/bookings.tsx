// import React, { useEffect, useState } from 'react';
// import axiosInstance from '../../utils/axiosInstance';
// import { OWNER_API } from '../../constants';

// type Booking = {
//     _id: string;
//     bookingStatus: string;
//     createdAt: string;
//     date: string;
//     endTime: string;
//     fees: number;
//     paymentStatus: string;
//     slotId: string;
//     startTime: string;
//     userId: { _id: string; name: string };
//     venueId: { _id: string; name: string };
// };

// const BookingHistoryPage: React.FC = () => {
//     const [bookings, setBookings] = useState<Booking[]>([]);

//     useEffect(() => {
//         const fetchBookingHistory = async () => {
//             try {
//                 const response = await axiosInstance.get<{ success: boolean; bookings: Booking[] }>(OWNER_API + '/bookings');
//                 if (response.data.success) {
//                     setBookings(response.data.bookings);
//                 } else {
//                     console.error('Fetch bookings failed:', response.data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching booking history:', error);
//             }
//         };

//         fetchBookingHistory();
//     }, []);

//     return (
//         <div className="py-6">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
//                 <h1 className="text-2xl font-semibold mb-6 text-center">Booking History</h1>
//                 <div className="overflow-x-auto bg-white shadow-md rounded-lg">
//                     <table className="min-w-full leading-normal">
//                         <thead>
//                             <tr>
//                                 <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                                     Booking ID
//                                 </th>
//                                 <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                                     User
//                                 </th>
//                                 <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                                     Venue
//                                 </th>
//                                 <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                                     Date & Time
//                                 </th>
//                                 <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                                     Booking Status
//                                 </th>
//                                 <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                                     Payment Status
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {bookings.map((booking) => (
//                                 <tr key={booking._id}>
//                                     <td className="px-5 py-5 border-b border-gray-200">{booking._id}</td>
//                                     <td className="px-5 py-5 border-b border-gray-200">{booking.userId.name}</td>
//                                     <td className="px-5 py-5 border-b border-gray-200">{booking.venueId.name}</td>
//                                     <td className="px-5 py-5 border-b border-gray-200">{booking.date} {booking.startTime} - {booking.endTime}</td>
//                                     <td className="px-5 py-5 border-b border-gray-200">{booking.bookingStatus}</td>
//                                     <td className="px-5 py-5 border-b border-gray-200">{booking.paymentStatus}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BookingHistoryPage;




import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { OWNER_API } from '../../constants';

type Booking = {
    _id: string;
    bookingStatus: string;
    createdAt: string;
    date: string;
    endTime: string;
    fees: number;
    paymentStatus: string;
    slotId: string;
    startTime: string;
    userId: { _id: string; name: string };
    venueId: { _id: string; name: string };
};

const BookingHistoryPage: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        const fetchBookingHistory = async () => {
            try {
                const response = await axiosInstance.get<{ success: boolean; bookings: Booking[] }>(OWNER_API + '/bookings');
                if (response.data.success) {
                    setBookings(response.data.bookings);
                } else {
                    console.error('Fetch bookings failed:', response.data);
                }
            } catch (error) {
                console.error('Error fetching booking history:', error);
            }
        };

        fetchBookingHistory();
    }, []);

    const formatTime = (time: string) => {
        const [hourString, minute] = time.split(':');
        const hour = parseInt(hourString, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${minute} ${ampm}`;
    };

    return (
        <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <h1 className="text-2xl font-semibold mb-6 text-center">Booking History</h1>
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Booking ID
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    User
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Venue
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                     Time
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Price
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Booking Status
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Payment Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td className="px-5 py-5 border-b border-gray-200">{booking._id}</td>
                                    <td className="px-5 py-5 border-b border-gray-200">{booking.userId.name}</td>
                                    <td className="px-5 py-5 border-b border-gray-200">{booking.venueId.name}</td>
                                    <td className="px-5 py-5 border-b border-gray-200">{booking.date}</td>
                                    <td className="px-5 py-5 border-b border-gray-200">{formatTime(booking.startTime)}to{formatTime(booking.endTime)}</td>
                                    <td className="px-5 py-5 border-b border-gray-200">{booking.fees}</td>
                                    <td className="px-5 py-5 border-b border-gray-200">{booking.bookingStatus}</td>
                                    <td className="px-5 py-5 border-b border-gray-200">{booking.paymentStatus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BookingHistoryPage;


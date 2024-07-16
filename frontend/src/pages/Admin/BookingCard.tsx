// import React from 'react';

// interface Booking {
//   _id: string;
//   venueId: {
//     _id: string;
//     name: string;
//   };
//   date: string;
//   startTime: string;
//   endTime: string;
//   fees: number;
//   paymentStatus: string;
//   bookingStatus: string;
// }

// interface BookingCardProps {
//   booking: Booking;
// }

// const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
//   return (
//     <tr className="bg-white border-b border-gray-200">
//       <td className="px-6 py-4 whitespace-nowrap">{booking.venueId.name}</td>
//       <td className="px-6 py-4 whitespace-nowrap">{booking.date}</td>
//       <td className="px-6 py-4 whitespace-nowrap">{booking.startTime} - {booking.endTime}</td>
//       <td className="px-6 py-4 whitespace-nowrap">${booking.fees}</td>
//       <td className="px-6 py-4 whitespace-nowrap">{booking.paymentStatus}</td>
//       <td className="px-6 py-4 whitespace-nowrap">
//         <span
//           className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//             booking.bookingStatus === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
//           }`}
//         >
//           {booking.bookingStatus}
//         </span>
//       </td>
//     </tr>
//   );
// };

// export default BookingCard;



import React from 'react';

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

interface BookingCardProps {
  booking: Booking;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const formatTime = (time: string) => {
    const [hourString, minute] = time.split(':');
    const hour = parseInt(hourString, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute} ${ampm}`;
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">{booking.venueId.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{booking.date}</td>
      <td className="px-6 py-4 whitespace-nowrap">{formatTime(booking.startTime)} - {formatTime(booking.endTime)}</td>
      <td className="px-6 py-4 whitespace-nowrap">{booking.fees}</td>
      <td className="px-6 py-4 whitespace-nowrap">{booking.paymentStatus}</td>
      <td className="px-6 py-4 whitespace-nowrap">{booking.bookingStatus}</td>
    </tr>
  );
};

export default BookingCard;

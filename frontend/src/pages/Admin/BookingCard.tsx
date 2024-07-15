// // // // import React from 'react';

// // // // interface Booking {
// // // //   id: string;
// // // //   venueName: string;
// // // //   location: string;
// // // //   bookingDate: string;
// // // //   startTime: string;
// // // //   endTime: string;
// // // //   userName: string;
// // // //   userContact: string;
// // // // }

// // // // interface BookingCardProps {
// // // //   booking: Booking;
// // // // }

// // // // const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
// // // //   return (
// // // //     <div className="bg-white shadow-md rounded-lg p-4">
// // // //       <h2 className="text-xl font-bold mb-2">{booking.venueName}</h2>
// // // //       <p className="text-gray-600">{booking.location}</p>
// // // //       <p className="text-gray-600">Booking Date: {booking.bookingDate}</p>
// // // //       <p className="text-gray-600">Time: {booking.startTime} - {booking.endTime}</p>
// // // //       <hr className="my-2" />
// // // //       <p className="text-gray-600">User: {booking.userName}</p>
// // // //       <p className="text-gray-600">Contact: {booking.userContact}</p>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default BookingCard;




// // // import React from 'react';

// // // interface Booking {
// // //   _id: string;
// // //   venueId: {
// // //     _id: string;
// // //     name: string;
// // //   };
// // //   date: string;
// // //   startTime: string;
// // //   endTime: string;
// // //   fees: number;
// // //   paymentStatus: string;
// // //   bookingStatus: string;
// // // }

// // // interface BookingCardProps {
// // //   booking: Booking;
// // // }

// // // const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
// // //   return (
// // //     <div className="bg-white shadow-md rounded-lg p-4">
// // //       <h2 className="text-xl font-bold mb-2">{booking.venueId.name}</h2>
// // //       <p className="text-gray-600">Date: {booking.date}</p>
// // //       <p className="text-gray-600">Time: {booking.startTime} - {booking.endTime}</p>
// // //       <p className="text-gray-600">Fees: ${booking.fees}</p>
// // //       <p className="text-gray-600">Payment Status: {booking.paymentStatus}</p>
// // //       <p className="text-gray-600">Booking Status: {booking.bookingStatus}</p>
// // //     </div>
// // //   );
// // // };

// // // export default BookingCard;



// // import React from 'react';

// // interface Booking {
// //   _id: string;
// //   venueId: {
// //     _id: string;
// //     name: string;
// //   };
// //   date: string;
// //   startTime: string;
// //   endTime: string;
// //   fees: number;
// //   paymentStatus: string;
// //   bookingStatus: string;
// // }

// // interface BookingCardProps {
// //   booking: Booking;
// // }

// // const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
// //   return (
// //     <tr className="bg-white shadow-md rounded-lg">
// //       <td className="px-6 py-4 whitespace-nowrap">{booking.venueId.name}</td>
// //       <td className="px-6 py-4 whitespace-nowrap">{booking.date}</td>
// //       <td className="px-6 py-4 whitespace-nowrap">{booking.startTime} - {booking.endTime}</td>
// //       <td className="px-6 py-4 whitespace-nowrap">${booking.fees}</td>
// //       <td className="px-6 py-4 whitespace-nowrap">{booking.paymentStatus}</td>
// //       <td className="px-6 py-4 whitespace-nowrap">{booking.bookingStatus}</td>
// //     </tr>
// //   );
// // };

// // export default BookingCard;




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
//     <tr>
//       <td className="px-6 py-4 whitespace-nowrap">{booking.venueId.name}</td>
//       <td className="px-6 py-4 whitespace-nowrap">{booking.date}</td>
//       <td className="px-6 py-4 whitespace-nowrap">{booking.startTime} - {booking.endTime}</td>
//       <td className="px-6 py-4 whitespace-nowrap">${booking.fees}</td>
//       <td className="px-6 py-4 whitespace-nowrap">{booking.paymentStatus}</td>
//       <td className="px-6 py-4 whitespace-nowrap">{booking.bookingStatus}</td>
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
  return (
    <tr className="bg-white border-b border-gray-200">
      <td className="px-6 py-4 whitespace-nowrap">{booking.venueId.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{booking.date}</td>
      <td className="px-6 py-4 whitespace-nowrap">{booking.startTime} - {booking.endTime}</td>
      <td className="px-6 py-4 whitespace-nowrap">${booking.fees}</td>
      <td className="px-6 py-4 whitespace-nowrap">{booking.paymentStatus}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            booking.bookingStatus === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
          }`}
        >
          {booking.bookingStatus}
        </span>
      </td>
    </tr>
  );
};

export default BookingCard;

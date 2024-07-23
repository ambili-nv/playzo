// // // // import React, { useEffect, useState } from 'react';
// // // // import { useParams } from 'react-router-dom';
// // // // import axiosInstance from '../../utils/axiosInstance';
// // // // import showToast from '../../utils/toaster';
// // // // import BookingCard from './BookingCard';
// // // // import { ADMIN_API } from '../../constants';

// // // // interface Booking {
// // // //   _id: string;
// // // //   venueId: {
// // // //     _id: string;
// // // //     name: string;
// // // //   };
// // // //   date: string;
// // // //   startTime: string;
// // // //   endTime: string;
// // // //   fees: number;
// // // //   paymentStatus: string;
// // // //   bookingStatus: string;
// // // // }

// // // // const BookingHistory: React.FC = () => {
// // // //   const { userId } = useParams<{ userId: string }>();
// // // //   const [bookings, setBookings] = useState<Booking[]>([]);
// // // //   const [loading, setLoading] = useState<boolean>(true);
// // // //   const [error, setError] = useState<string | null>(null);

// // // //   useEffect(() => {
// // // //     const fetchBookingHistory = async () => {
// // // //       try {
// // // //         const response = await axiosInstance.get(`${ADMIN_API}/bookings/user/${userId}`, {

// // // //         });
// // // //         console.log(response.data.bookings,"admin user b");
        
// // // //         setBookings(response.data.bookings);
// // // //       } catch (err) {
// // // //         showToast('Failed to fetch booking history');
// // // //         setError('Failed to fetch booking history');
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchBookingHistory();
// // // //   }, [userId]);

// // // //   if (loading) {
// // // //     return <div className="text-center mt-20">Loading...</div>;
// // // //   }

// // // //   if (error) {
// // // //     return <div className="text-center mt-20 text-red-500">{error}</div>;
// // // //   }

// // // //   return (
// // // //     <div className="container mx-auto p-4">
// // // //       <h1 className="text-2xl font-bold mb-4">User Booking History</h1>
// // // //       {bookings.length === 0 ? (
// // // //         <div>No bookings found for this user.</div>
// // // //       ) : (
// // // //         <div className="overflow-x-auto">
// // // //           <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
// // // //             <thead className="bg-gray-50">
// // // //               <tr>
// // // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue Name</th>
// // // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
// // // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
// // // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fees</th>
// // // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
// // // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Status</th>
// // // //               </tr>
// // // //             </thead>
// // // //             <tbody className="bg-white divide-y divide-gray-200">
// // // //               {bookings.map((booking) => (
// // // //                 <BookingCard key={booking._id} booking={booking} />
// // // //               ))}
// // // //             </tbody>
// // // //           </table>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default BookingHistory;



// // // import React, { useEffect, useState } from 'react';
// // // import { useParams } from 'react-router-dom';
// // // import axiosInstance from '../../utils/axiosInstance';
// // // import showToast from '../../utils/toaster';
// // // import BookingCard from './BookingCard';
// // // import { ADMIN_API } from '../../constants';

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

// // // const BookingHistory: React.FC = () => {
// // //   const { userId } = useParams<{ userId: string }>();
// // //   const [bookings, setBookings] = useState<Booking[]>([]);
// // //   const [loading, setLoading] = useState<boolean>(true);
// // //   const [error, setError] = useState<string | null>(null);
// // //   const [currentPage, setCurrentPage] = useState<number>(1);
// // //   const [totalPages, setTotalPages] = useState<number>(1);
// // //   const itemsPerPage = 5;

// // //   const fetchBookingHistory = async (page: number) => {
// // //     try {
// // //       const response = await axiosInstance.get(`${ADMIN_API}/bookings/user/${userId}`, {
// // //         params: { page, limit: itemsPerPage }
// // //       });
// // //       console.log(response.data.bookings, "admin user b");
      
// // //       setBookings(response.data.bookings);
// // //       setTotalPages(Math.ceil(response.data.total / itemsPerPage));
// // //     } catch (err) {
// // //       showToast('Failed to fetch booking history');
// // //       setError('Failed to fetch booking history');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchBookingHistory(currentPage);
// // //   }, [currentPage, userId]);

// // //   if (loading) {
// // //     return <div className="text-center mt-20">Loading...</div>;
// // //   }

// // //   if (error) {
// // //     return <div className="text-center mt-20 text-red-500">{error}</div>;
// // //   }

// // //   const handlePageChange = (newPage: number) => {
// // //     if (newPage >= 1 && newPage <= totalPages) {
// // //       setCurrentPage(newPage);
// // //     }
// // //   };

// // //   return (
// // //     <div className="container mx-auto p-4">
// // //       <h1 className="text-2xl font-bold mb-4">User Booking History</h1>
// // //       {bookings.length === 0 ? (
// // //         <div>No bookings found for this user.</div>
// // //       ) : (
// // //         <>
// // //           <div className="overflow-x-auto mb-4">
// // //             <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
// // //               <thead className="bg-gray-50">
// // //                 <tr>
// // //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue Name</th>
// // //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
// // //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
// // //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fees</th>
// // //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
// // //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Status</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody className="bg-white divide-y divide-gray-200">
// // //                 {bookings.map((booking) => (
// // //                   <BookingCard key={booking._id} booking={booking} />
// // //                 ))}
// // //               </tbody>
// // //             </table>
// // //           </div>
// // //           <div className="flex justify-center space-x-4 mt-4">
// // //             <button 
// // //               className="px-4 py-2 bg-gray-300 text-gray-800 rounded" 
// // //               onClick={() => handlePageChange(currentPage - 1)} 
// // //               disabled={currentPage === 1}
// // //             >
// // //               Previous
// // //             </button>
// // //             <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
// // //             <button 
// // //               className="px-4 py-2 bg-gray-300 text-gray-800 rounded" 
// // //               onClick={() => handlePageChange(currentPage + 1)} 
// // //               disabled={currentPage === totalPages}
// // //             >
// // //               Next
// // //             </button>
// // //           </div>
// // //         </>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default BookingHistory;




// // import React, { useEffect, useState } from 'react';
// // import { useParams } from 'react-router-dom';
// // import axiosInstance from '../../utils/axiosInstance';
// // import showToast from '../../utils/toaster';
// // import BookingCard from './BookingCard';
// // import { ADMIN_API } from '../../constants';

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

// // const BookingHistory: React.FC = () => {
// //   const { userId } = useParams<{ userId: string }>();
// //   const [bookings, setBookings] = useState<Booking[]>([]);
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [currentPage, setCurrentPage] = useState<number>(1);
// //   const [totalPages, setTotalPages] = useState<number>(1);
// //   const itemsPerPage = 5; // Number of items per page

// //   const fetchBookingHistory = async (page: number) => {
// //     try {
// //       const response = await axiosInstance.get(`${ADMIN_API}/bookings/user/${userId}`, {
// //         params: { page, limit: itemsPerPage }
// //       });
      
// //       if (Array.isArray(response.data.bookings)) {
// //         setBookings(response.data.bookings);
// //         setTotalPages(Math.ceil(response.data.total / itemsPerPage));
// //       } else {
// //         console.error('Invalid data format:', response.data);
// //         setError('Invalid data format');
// //       }
// //     } catch (err) {
// //       console.error('Failed to fetch booking history:', err);
// //       showToast('Failed to fetch booking history');
// //       setError('Failed to fetch booking history');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchBookingHistory(currentPage);
// //   }, [currentPage, userId]);

// //   const handlePageChange = (page: number) => {
// //     if (page > 0 && page <= totalPages) {
// //       setCurrentPage(page);
// //     }
// //   };

// //   if (loading) {
// //     return <div className="text-center mt-20">Loading...</div>;
// //   }

// //   if (error) {
// //     return <div className="text-center mt-20 text-red-500">{error}</div>;
// //   }

// //   return (
// //     <div className="container mx-auto p-4">
// //       <h1 className="text-2xl font-bold mb-4">User Booking History</h1>
// //       {bookings.length === 0 ? (
// //         <div>No bookings found for this user.</div>
// //       ) : (
// //         <>
// //           <div className="overflow-x-auto mb-4">
// //             <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
// //               <thead className="bg-gray-50">
// //                 <tr>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue Name</th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fees</th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Status</th>
// //                 </tr>
// //               </thead>
// //               <tbody className="bg-white divide-y divide-gray-200">
// //                 {bookings.map((booking) => (
// //                   <BookingCard key={booking._id} booking={booking} />
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //           <div className="flex justify-between items-center">
// //             <button
// //               className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
// //               disabled={currentPage === 1}
// //               onClick={() => handlePageChange(currentPage - 1)}
// //             >
// //               Previous
// //             </button>
// //             <span>Page {currentPage} of {totalPages}</span>
// //             <button
// //               className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
// //               disabled={currentPage === totalPages}
// //               onClick={() => handlePageChange(currentPage + 1)}
// //             >
// //               Next
// //             </button>
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default BookingHistory;




// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axiosInstance from '../../utils/axiosInstance';
// import showToast from '../../utils/toaster';
// import BookingCard from './BookingCard';
// import { ADMIN_API } from '../../constants';

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

// interface BookingResponse {
//   success: boolean;
//   bookings: Booking[]; // Assuming bookings is an array
//   total: number; // Total number of bookings available
// }

// const BookingHistory: React.FC = () => {
//   const { userId } = useParams<{ userId: string }>();
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [totalPages, setTotalPages] = useState<number>(1);
//   const itemsPerPage = 5; // Number of items per page

//   const fetchBookingHistory = async (page: number) => {
//     try {
//       const response = await axiosInstance.get<BookingResponse>(`${ADMIN_API}/bookings/user/${userId}`, {
//         params: { page, limit: itemsPerPage }
//       });

//       // Check if response.data.bookings is an array or an object with bookings array inside
//       if (Array.isArray(response.data.bookings)) {
//         setBookings(response.data.bookings);
//         setTotalPages(Math.ceil(response.data.total / itemsPerPage));
//       } else if (response.data.bookings && response.data.bookings.length) {
//         // Handle case where bookings is an object with a bookings array property
//         setBookings(response.data.bookings.bookings || []);
//         setTotalPages(Math.ceil(response.data.total / itemsPerPage));
//       } else {
//         console.error('Invalid data format:', response.data);
//         setError('Invalid data format');
//       }
//     } catch (err) {
//       console.error('Failed to fetch booking history:', err);
//       showToast('Failed to fetch booking history');
//       setError('Failed to fetch booking history');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookingHistory(currentPage);
//   }, [currentPage, userId]);

//   const handlePageChange = (page: number) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   if (loading) {
//     return <div className="text-center mt-20">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center mt-20 text-red-500">{error}</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">User Booking History</h1>
//       {bookings.length === 0 ? (
//         <div>No bookings found for this user.</div>
//       ) : (
//         <>
//           <div className="overflow-x-auto mb-4">
//             <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue Name</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fees</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Status</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {bookings.map((booking) => (
//                   <BookingCard key={booking._id} booking={booking} />
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="flex justify-between items-center">
//             <button
//               className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
//               disabled={currentPage === 1}
//               onClick={() => handlePageChange(currentPage - 1)}
//             >
//               Previous
//             </button>
//             <span>Page {currentPage} of {totalPages}</span>
//             <button
//               className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
//               disabled={currentPage === totalPages}
//               onClick={() => handlePageChange(currentPage + 1)}
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default BookingHistory;



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axiosInstance from '../../utils/axiosInstance';
// import showToast from '../../utils/toaster';
// import BookingCard from './BookingCard';
// import { ADMIN_API } from '../../constants';

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

// // interface BookingResponse {
// //   success: boolean;
// //   bookings: Booking[] | { bookings: Booking[] }; // Adjusted to handle both formats
// //   total: number;
// // }

// interface Booking {
//   _id: string;
//   id: string;
//   venueId: {
//     name: string;
//     sportsitem: string;
//     _id: string;
//   };
//   date: string;
//   startTime: string;
//   endTime: string;
//   bookingStatus: string;
//   paymentStatus: string;
//   fees: number;
//   createdAt: string;
//   slotId: string;
//   userId: string;
// }

// const BookingHistory: React.FC = () => {
//   const { userId } = useParams<{ userId: string }>();
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [totalPages, setTotalPages] = useState<number>(1);
//   const itemsPerPage = 5; // Number of items per page

//   const fetchBookingHistory = async () => {
//     try {
//       const response = await axiosInstance.get(`${ADMIN_API}/bookings/user/${userId}`, {
//         params: {
//           page: currentPage,
//           limit: 5
//         }
//       });

//       if (response.data && response.data.bookings) {
//         // const sortedBookings = response.data.bookings.sort((a: Booking, b: Booking) =>
//         //   new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//         // );
//         setBookings(response.data.bookings);
//         console.log(response.data.bookings,"///////");
        
//         setTotalPages(response.data.totalPages);
//       } else {
//         console.log('No bookings found in response');
//       }
//     } catch (error) {
//       console.error('Failed to fetch bookings', error);
//     }
//   };

//   useEffect(() => {
//     fetchBookingHistory();
//   }, [currentPage, userId]);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const formatTime = (time: string) => {
//     const [hours, minutes] = time.split(':');
//     const intHours = parseInt(hours, 10);
//     const suffix = intHours >= 12 ? 'PM' : 'AM';
//     const formattedHours = intHours % 12 || 12;
//     return `${formattedHours}:${minutes} ${suffix}`;
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   // if (loading) {
//   //   return <div className="text-center mt-20">Loading...</div>;
//   // }

//   if (error) {
//     return <div className="text-center mt-20 text-red-500">{error}</div>;
//   }

//   return (
//     // <div className="container mx-auto p-4">
//     //   <h1 className="text-2xl font-bold mb-4">User Booking History</h1>
//     //   {bookings.length === 0 ? (
//     //     <div>No bookings found for this user.</div>
//     //   ) : (
//     //     <>
//     //       <div className="overflow-x-auto mb-4">
//     //         <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//     //           <thead className="bg-gray-50">
//     //             <tr>
//     //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue Name</th>
//     //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//     //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
//     //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fees</th>
//     //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
//     //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Status</th>
//     //             </tr>
//     //           </thead>
//     //           <tbody className="bg-white divide-y divide-gray-200">
//     //             {bookings.map((booking) => (
//     //               <BookingCard key={booking._id} booking={booking} />
//     //             ))}
//     //           </tbody>
//     //         </table>
//     //       </div>
//     //       <div className="flex justify-between items-center">
//     //         <button
//     //           className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
//     //           disabled={currentPage === 1}
//     //           onClick={() => handlePageChange(currentPage - 1)}
//     //         >
//     //           Previous
//     //         </button>
//     //         <span>Page {currentPage} of {totalPages}</span>
//     //         <button
//     //           className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
//     //           disabled={currentPage === totalPages}
//     //           onClick={() => handlePageChange(currentPage + 1)}
//     //         >
//     //           Next
//     //         </button>
//     //       </div>
//     //     </>
//     //   )}
//     // </div>
//     <div className="bg-white rounded-lg shadow-md p-6">
//     <h2 className="text-xl font-semibold mb-4">Booking History</h2>
//     {bookings.length > 0 ? (
//       <table className="w-full text-left">
//         <thead>
//           <tr>
//             <th className="w-1/6  py-4 text-left text-sm font-medium">Venue Name</th>
//             <th className="w-1/6  py-4 text-left text-sm font-medium">Sports Item</th>
//             <th className="w-1/6  py-4 text-left text-sm font-medium">Date</th>
//             <th className="w-1/6  py-4 text-left text-sm font-medium">Time</th>
//             <th className="w-1/6  py-4 text-left text-sm font-medium">Booking Status</th>
//             <th className="w-1/6 px-6 py-4 text-left text-sm font-medium">Payment Status</th>
//             <th className="w-1/6  py-4 text-left text-sm font-medium">Price</th>
//             <th className="w-1/6 px-6  py-4 text-left text-sm font-medium">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bookings.map((booking) => (
//             <tr key={booking._id}>
//               <td className="border-t  py-4 text-sm text-gray-700">{booking.venueId.name}</td>
//               <td className="border-t  py-4 text-sm text-gray-700">{booking.venueId.sportsitem}</td>
//               <td className="border-t  py-4 text-sm text-gray-700">{new Date(booking.date).toLocaleDateString()}</td>
//               <td className="border-t  py-4 text-sm text-gray-700">{`${formatTime(booking.startTime)} - ${formatTime(booking.endTime)}`}</td>
//               <td className="border-t px-6 py-4 text-sm text-gray-700">{booking.bookingStatus}</td>
//               <td className="border-t  py-4 text-sm text-gray-700">{booking.paymentStatus}</td>
//               <td className="border-t  py-4 text-sm text-gray-700">{booking.fees}</td>
//               <td className="border-t px-6  py-4 text-sm text-gray-700">

//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     ) : (
//       <p>No bookings found</p>
//     )}
//     <div className="flex justify-between mt-4">
//       <button
//         className="px-4 py-2 bg-gray-300 rounded-md"
//         onClick={handlePreviousPage}
//         disabled={currentPage === 1}
//       >
//         Previous
//       </button>
//       <span className="px-4 py-2">
//         Page {currentPage} of {totalPages}
//       </span>
//       <button
//         className="px-4 py-2 bg-gray-300 rounded-md"
//         onClick={handleNextPage}
//         disabled={currentPage === totalPages}
//       >
//         Next
//       </button>
//     </div>
//   </div>
//   );
// };

// export default BookingHistory;

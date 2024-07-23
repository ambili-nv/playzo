// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useFormik } from 'formik';
// import { USER_API } from '../../constants';
// import { UserInterface } from '../../types/UserInterface';
// import showToast from '../../utils/toaster';
// import uploadImagesToCloudinary from '../../API/uploadImages';
// import WalletPage from './wallet';
// import axiosInstance from '../../utils/axiosInstance';

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

// const ProfilePage: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<'editProfile' | 'bookingHistory' | 'wallet'>('editProfile');
//   const [profile, setProfile] = useState<UserInterface | null>(null);
//   const [profilePic, setProfilePic] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string>('');
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [walletBalance, setWalletBalance] = useState<number>(0); // Add state for wallet balance

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem('access_token');
//         if (!token) {
//           console.log('No auth token found');
//           throw new Error('No auth token found');
//         }

//         const response = await axios.get(`${USER_API}/profile`, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         setProfile(response.data.user);
//       } catch (error) {
//         console.error('Failed to fetch profile', error);
//       }
//     };

//     fetchProfile();
//   }, []);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const token = localStorage.getItem('access_token');
//         if (!token) {
//           console.log('No auth token found');
//           throw new Error('No auth token found');
//         }

//         const response = await axios.get(`${USER_API}/booking-history`, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         if (response.data && response.data.bookings) {
//           const sortedBookings = response.data.bookings.sort((a: Booking, b: Booking) =>
//             new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//           );
//           setBookings(sortedBookings);
//         } else {
//           console.log('No bookings found in response');
//         }
//       } catch (error) {
//         console.error('Failed to fetch bookings', error);
//       }
//     };

//     fetchBookings();
//   }, []);


//   const handleCancelBooking = async (bookingId: string, fees: number) => {
//     try {

  
//       const response = await axiosInstance.patch(
//         `${USER_API}/cancel-booking/${bookingId}`,
//         {
//           fees, // Send the fees to the backend
//           bookingStatus: 'cancelled'
//         },
//       );
  
//       if (response.data.success) {
//         setBookings(bookings.map(booking =>
//           booking._id === bookingId ? { ...booking, bookingStatus: 'cancelled' } : booking
//         ));
  
//         showToast('Booking cancelled successfully', 'success');
//       } else {
//         showToast('Failed to cancel booking', 'error');
//       }
//     } catch (error) {
//       console.error('Failed to cancel booking', error);
//       // @ts-ignore
//       const errorMessage = error.response?.data?.message || 'Failed to cancel booking';
//       showToast(errorMessage, 'error');
//     }
//   };
  

//   const formik = useFormik({
//     initialValues: {
//       name: profile?.name || '',
//       email: profile?.email || ''
//     },
//     enableReinitialize: true,
//     onSubmit: async (values) => {
//       const token = localStorage.getItem('access_token');
//       if (!token) return;

//       try {
//         //@ts-ignore
//         const profilePicUrl = await uploadImagesToCloudinary([profilePic]);

//         const updatedProfileResponse = await axios.patch(`${USER_API}/edit-profile/`, {
//           ...values,
//           profilePic: profilePicUrl
//         }, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         setProfile(updatedProfileResponse.data.user);

//         showToast('Profile updated successfully', 'success');
//       } catch (error) {
//         console.error('Failed to update profile', error);
//         showToast('Failed to update profile', 'error');
//       }
//     }
//   });

//   const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.currentTarget.files && event.currentTarget.files[0]) {
//       setProfilePic(event.currentTarget.files[0]);
//       const file = event.currentTarget.files[0];
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewUrl(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setPreviewUrl('');
//       setProfilePic(null);
//     }
//   };

//   const formatTime = (time: string) => {
//     const [hours, minutes] = time.split(':');
//     const intHours = parseInt(hours, 10);
//     const suffix = intHours >= 12 ? 'PM' : 'AM';
//     const formattedHours = intHours % 12 || 12;
//     return `${formattedHours}:${minutes} ${suffix}`;
//   };

//   return (
//     <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold mb-6">Profile</h1>
//       <div className="w-full max-w-6xl flex space-x-6">
//         <div className="w-1/3 bg-white rounded-lg shadow-md p-6">
//           <div className="flex flex-col items-center pb-6">
//             <h2 className="text-xl font-semibold">{profile?.name}</h2>
//             <button
//               className={`mt-4 px-4 py-2 rounded-lg ${activeTab === 'editProfile' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
//               onClick={() => setActiveTab('editProfile')}>
//               Edit Profile
//             </button>
//           </div>
//           <div className="mt-4">
//             <button
//               className={`w-full flex items-center px-4 py-2 rounded-lg ${activeTab === 'bookingHistory' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
//               onClick={() => setActiveTab('bookingHistory')}>
//               <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M13 12h7v8h-7v-8zm-2 0h-7v8h7v-8zm1-8c-1.1 0-2.9-2 2h-2c0-2.21 1.79-4 4-4s4 1.79 4 4h-2c0-1.1-.9-2-2-2zm-1 8h2v-3h3v3h-2v2h-2v-2zm-6 3v-2h2v2h2v-2h2v2h2v-2h-2v2h-2v-2h-2zm3-10v3h-3v-3h3zm5-5c-3.31 0-6 2.69-6 6v3h12v-3c0-3.31-2.69-6-6-6z" />
//               </svg>
//               Booking History
//             </button>
//           </div>
//           <div className="mt-4">
//             <button
//               className={`w-full flex items-center px-4 py-2 rounded-lg ${activeTab === 'wallet' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
//               onClick={() => setActiveTab('wallet')}>
//               <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-9h6v2h-6v6h-2v-6H5v-2h6V5h2v6z"/>
//               </svg>
//               Wallet
//             </button>
//           </div>
//         </div>

//         <div className="w-2/3 bg-white rounded-lg shadow-md p-6">
//           {activeTab === 'editProfile' && (
//             <form onSubmit={formik.handleSubmit} className="mt-6">
//               <div className="mb-4 flex items-center justify-center">
//                 <div className="relative">
//                   <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
//                     <img
//                       src={previewUrl || profile?.profilePic || 'default-profile-picture.png'}
//                       alt="Selected"
//                       className="w-32 h-32 object-cover"
//                     />
//                   </div>
//                   <label
//                     htmlFor="profilePic"
//                     className="absolute bottom-0 right-0 bg-gray-800 text-white p-2 rounded-full cursor-pointer">
//                     <svg
//                       className="w-6 h-6"
//                       fill="currentColor"
//                       viewBox="0 0 24 24">
//                       <path d="M12 4c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-7 4c0-1.66 1.34-3 3-3 1.66 0 3 1.34 3 3s-1.34 3-3 3c-1.66 0-3-1.34-3-3zm16 3h-2v-1c0-2.21-1.79-4-4-4s-4 1.79-4 4v1h-2c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2zm-6-4c1.66 0 3 1.34 3 3v1h-6v-1c0-1.66 1.34-3 3-3z" />
//                     </svg>
//                   </label>
//                   <input
//                     id="profilePic"
//                     name="profilePic"
//                     type="file"
//                     accept="image/*"
//                     onChange={handleProfilePicChange}
//                     className="hidden"
//                   />
//                 </div>
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">Name</label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formik.values.name}
//                   onChange={formik.handleChange}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formik.values.email}
//                   disabled
//                   onChange={formik.handleChange}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-100"
//                 />
//               </div>
//               <div className="flex items-center justify-center">
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-green-500 text-white rounded-lg">
//                   Save
//                 </button>
//               </div>
//             </form>
//           )}

//           {activeTab === 'bookingHistory' && (
//             <div className="mt-6">
//               <h2 className="text-2xl font-semibold mb-4">Booking History</h2>
//               {bookings.length > 0 ? (
//                 <ul className="space-y-4">
//                   {bookings.map((booking) => (
//                     <li key={booking._id} className="p-4 bg-gray-100 rounded-lg shadow">
//                       <div className="mb-2">
//                         <strong>Venue:</strong> {booking.venueId.name} ({booking.venueId.sportsitem})
//                       </div>
//                       <div className="mb-2">
//                         <strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}
//                       </div>
//                       <div className="mb-2">
//                         <strong>Time:</strong> {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
//                       </div>
//                       <div className="mb-2">
//                         <strong>Booking Status:</strong> {booking.bookingStatus}
//                       </div>
//                       <div className="mb-2">
//                         <strong>Payment Status:</strong> {booking.paymentStatus}
//                       </div>
//                       {booking.bookingStatus === 'confirmed' && (
//                         <button
//                           onClick={() => handleCancelBooking(booking._id, booking.fees)}
//                           className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                         >
//                           Cancel Booking
//                         </button>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p>No booking history found.</p>
//               )}
//             </div>
//           )}

//           {activeTab === 'wallet' && <WalletPage />}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { USER_API } from '../../constants';
import { UserInterface } from '../../types/UserInterface';
import showToast from '../../utils/toaster';
import uploadImagesToCloudinary from '../../API/uploadImages';
import WalletPage from './wallet';
import axiosInstance from '../../utils/axiosInstance';

interface Booking {
  _id: string;
  id: string;
  venueId: {
    name: string;
    sportsitem: string;
    _id: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  bookingStatus: string;
  paymentStatus: string;
  fees: number;
  createdAt: string;
  slotId: string;
  userId: string;
}

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'editProfile' | 'bookingHistory' | 'wallet'>('editProfile');
  const [profile, setProfile] = useState<UserInterface | null>(null);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          console.log('No auth token found');
          throw new Error('No auth token found');
        }

        const response = await axios.get(`${USER_API}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setProfile(response.data.user);
      } catch (error) {
        console.error('Failed to fetch profile', error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          console.log('No auth token found');
          throw new Error('No auth token found');
        }

        const response = await axios.get(`${USER_API}/booking-history`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            page: currentPage,
            limit: 5
          }
        });

        if (response.data && response.data.bookings) {
          const sortedBookings = response.data.bookings.sort((a: Booking, b: Booking) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setBookings(sortedBookings);
          setTotalPages(response.data.totalPages);
        } else {
          console.log('No bookings found in response');
        }
      } catch (error) {
        console.error('Failed to fetch bookings', error);
      }
    };

    fetchBookings();
  }, [currentPage]);

  const handleCancelBooking = async (bookingId: string, fees: number) => {
    try {
      const response = await axiosInstance.patch(
        `${USER_API}/cancel-booking/${bookingId}`,
        {
          fees,
          bookingStatus: 'cancelled'
        }
      );

      if (response.data.success) {
        setBookings(bookings.map(booking =>
          booking._id === bookingId ? { ...booking, bookingStatus: 'cancelled' } : booking
        ));

        showToast('Booking cancelled successfully', 'success');
      } else {
        showToast('Failed to cancel booking', 'error');
      }
    } catch (error) {
      console.error('Failed to cancel booking', error);
      //@ts-ignore
      const errorMessage = error.response?.data?.message || 'Failed to cancel booking';
      showToast(errorMessage, 'error');
    }
  };

  const formik = useFormik({
    initialValues: {
      name: profile?.name || '',
      email: profile?.email || ''
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      try {
        //@ts-ignore
        const profilePicUrl = await uploadImagesToCloudinary([profilePic]);

        const updatedProfileResponse = await axios.patch(`${USER_API}/edit-profile/`, {
          ...values,
          profilePic: profilePicUrl
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setProfile(updatedProfileResponse.data.user);

        showToast('Profile updated successfully', 'success');
      } catch (error) {
        console.error('Failed to update profile', error);
        showToast('Failed to update profile', 'error');
      }
    }
  });

  const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      setProfilePic(event.currentTarget.files[0]);
      const file = event.currentTarget.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl('');
      setProfilePic(null);
    }
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const intHours = parseInt(hours, 10);
    const suffix = intHours >= 12 ? 'PM' : 'AM';
    const formattedHours = intHours % 12 || 12;
    return `${formattedHours}:${minutes} ${suffix}`;
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6 mt-12">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="w-full max-w-6xl flex space-x-6">
        <div className="w-1/3 bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col items-center pb-6">
            <h2 className="text-xl font-semibold">{profile?.name}</h2>
            {/* <button
              className={`mt-4 px-4 py-2 rounded-lg ${activeTab === 'editProfile' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setActiveTab('editProfile')}>
              Edit Profile
            </button> */}
            <button
              className={`mt-2 px-4 py-2 rounded-lg ${activeTab === 'bookingHistory' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setActiveTab('bookingHistory')}>
              Booking History
            </button>
            <button
              className={`mt-2 px-4 py-2 rounded-lg ${activeTab === 'wallet' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setActiveTab('wallet')}>
              Wallet
            </button>
          </div>
          <div className="relative flex flex-col items-center">
            <img
              src={previewUrl || profile?.profilePic}
              alt="Profile"
              className="w-32 h-32 rounded-full mb-4"
            />
            <label
              htmlFor="profile-pic"
              className="absolute bottom-0 right-4 bg-gray-800 text-white p-2 rounded-full cursor-pointer"
            >
              <input
                id="profile-pic"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePicChange}
              />
              Change
            </label>
          </div>
          <form className="mt-4" onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                disabled
              />
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
              Update Profile
            </button>
          </form>
        </div>

        <div className="w-2/3">
          {activeTab === 'bookingHistory' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Booking History</h2>
              {bookings.length > 0 ? (
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th className="w-1/6  py-4 text-left text-sm font-medium">Venue Name</th>
                      <th className="w-1/6  py-4 text-left text-sm font-medium">Sports Item</th>
                      <th className="w-1/6  py-4 text-left text-sm font-medium">Date</th>
                      <th className="w-1/6  py-4 text-left text-sm font-medium">Time</th>
                      <th className="w-1/6  py-4 text-left text-sm font-medium">Booking Status</th>
                      <th className="w-1/6 px-6 py-4 text-left text-sm font-medium">Payment Status</th>
                      <th className="w-1/6  py-4 text-left text-sm font-medium">Price</th>
                      <th className="w-1/6 px-6  py-4 text-left text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking._id}>
                        <td className="border-t  py-4 text-sm text-gray-700">{booking.venueId.name}</td>
                        <td className="border-t  py-4 text-sm text-gray-700">{booking.venueId.sportsitem}</td>
                        <td className="border-t  py-4 text-sm text-gray-700">{new Date(booking.date).toLocaleDateString()}</td>
                        <td className="border-t  py-4 text-sm text-gray-700">{`${formatTime(booking.startTime)} - ${formatTime(booking.endTime)}`}</td>
                        <td className="border-t px-6 py-4 text-sm text-gray-700">{booking.bookingStatus}</td>
                        <td className="border-t  py-4 text-sm text-gray-700">{booking.paymentStatus}</td>
                        <td className="border-t  py-4 text-sm text-gray-700">{booking.fees}</td>
                        <td className="border-t px-6  py-4 text-sm text-gray-700">
                          {booking.bookingStatus !== 'cancelled' && (
                            <button
                              className="bg-red-500 text-white px-2 py-1 rounded-md"
                              onClick={() => handleCancelBooking(booking._id, booking.fees)}
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No bookings found</p>
              )}
              <div className="flex justify-between mt-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded-md"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="px-4 py-2 bg-gray-300 rounded-md"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {activeTab === 'wallet' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Wallet</h2>
              <WalletPage />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

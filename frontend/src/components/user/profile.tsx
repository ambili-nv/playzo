// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import { USER_API } from '../../constants';
// import { UserInterface } from '../../types/UserInterface';
// import showToast from '../../utils/toaster';
// import uploadImagesToCloudinary from '../../API/uploadImages'; // Adjust the path as needed

// interface Booking {
//     id: string;
//     venueId: {
//         name: string;
//         _id: string;
//     };
//     date: string;
//     startTime: string;
//     endTime: string;
//     bookingStatus: string;
//     paymentStatus: string;
//     fees: number;
//     createdAt: string;
//     slotId: string;
//     userId: string;
// }

// const ProfilePage: React.FC = () => {
//     const [activeTab, setActiveTab] = useState<'editProfile' | 'bookingHistory'>('editProfile');
//     const [profile, setProfile] = useState<UserInterface | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [profilePic, setProfilePic] = useState<File | null>(null);
//     const [previewUrl, setPreviewUrl] = useState<string>(''); // State for storing the preview URL
//     const [bookings, setBookings] = useState<Booking[]>([]); // State for storing booking data
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const token = localStorage.getItem('access_token');
//                 if (!token) {
//                     console.log('No auth token found');
//                     throw new Error('No auth token found');
//                 }

//                 const response = await axios.get(`${USER_API}/profile`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 });

//                 setProfile(response.data.user);
//             } catch (error) {
//                 console.error('Failed to fetch profile', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProfile();
//     }, []);

//     useEffect(() => {
//         const fetchBookings = async () => {
//             try {
//                 const token = localStorage.getItem('access_token');
//                 if (!token) {
//                     console.log('No auth token found');
//                     throw new Error('No auth token found');
//                 }

//                 const response = await axios.get(`${USER_API}/booking-history`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 });

//                 // Check if the response contains 'bookings' array
//                 if (response.data && response.data.bookings) {
//                     console.log(response.data.bookings, "booking res");
//                     setBookings(response.data.bookings); // Set bookings state
//                 } else {
//                     console.log('No bookings found in response');
//                 }
//             } catch (error) {
//                 console.error('Failed to fetch bookings', error);
//             }
//         };

//         fetchBookings();
//     }, []);

//     const formik = useFormik({
//         initialValues: {
//             name: profile?.name || '',
//             email: profile?.email || ''
//         },
//         enableReinitialize: true,
//         onSubmit: async (values) => {
//             const token = localStorage.getItem('access_token');
//             if (!token) return;

//             try {
//                 //@ts-ignore
//                 const profilePicUrl = await uploadImagesToCloudinary([profilePic]);

//                 // Update profile with the new profile picture URL
//                 const updatedProfileResponse = await axios.patch(`${USER_API}/edit-profile/`, {
//                     ...values,
//                     profilePic: profilePicUrl
//                 }, {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 });

//                 setProfile(updatedProfileResponse.data.user);

//                 showToast('Profile updated successfully', 'success');
//             } catch (error) {
//                 console.error('Failed to update profile', error);
//                 showToast('Failed to update profile', 'error');
//             }
//         }
//     });

//     const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.currentTarget.files && event.currentTarget.files[0]) {
//             setProfilePic(event.currentTarget.files[0]);
//             const file = event.currentTarget.files[0];
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setPreviewUrl(reader.result as string);
//             };
//             reader.readAsDataURL(file);
//         } else {
//             setPreviewUrl('');
//             setProfilePic(null);
//         }
//     };

//     return (
//         <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6">
//             <h1 className="text-3xl font-bold mb-6">Profile</h1>
//             <div className="w-full max-w-6xl flex space-x-6">
//                 {/* Profile Card */}
//                 <div className="w-1/3 bg-white rounded-lg shadow-md p-6">
//                     <div className="flex flex-col items-center pb-6">
//                         <h2 className="text-xl font-semibold">{profile?.name}</h2>
//                         <button
//                             className={`mt-4 px-4 py-2 rounded-lg ${activeTab === 'editProfile' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
//                             onClick={() => setActiveTab('editProfile')}>
//                             Edit Profile
//                         </button>
//                     </div>
//                     <div className="mt-4">
//                         <button
//                             className={`w-full flex items-center px-4 py-2 rounded-lg ${activeTab === 'bookingHistory' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
//                             onClick={() => setActiveTab('bookingHistory')}>
//                             <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
//                                 <path d="M13 12h7v8h-7v-8zm-2 0h-7v8h7v-8zm1-8c-1.1 0-2.9-2 2h-2c0-2.21 1.79-4 4-4s4 1.79 4 4h-2c0-1.1-.9-2-2-2zm-1 8h2v-3h3v3h-2v2h-2v-2zm-6 3v-2h2v2h2v-2h2v2h2v-2h-2v2h-2v-2h-2zm3-10v3h-3v-3h3zm5-5c-3.31 0-6 2.69-6 6v3h12v-3c0-3.31-2.69-6-6-6z" />
//                             </svg>
//                             Booking History
//                         </button>
//                     </div>
//                 </div>

//                 {/* Right Card */}
//                 <div className="w-2/3 bg-white rounded-lg shadow-md p-6">
//                     {activeTab === 'editProfile' && (
//                         <form onSubmit={formik.handleSubmit} className="mt-6">
//                             <div className="mb-4 flex items-center justify-center">
//                                 <div className="relative">
//                                     <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
//                                         <img
//                                             src={previewUrl || profile?.profilePic || 'default-profile-picture.png'}
//                                             alt="Selected"
//                                             className="w-32 h-32 object-cover"
//                                         />
//                                     </div>
//                                     <label
//                                         htmlFor="profilePic"
//                                         className="absolute bottom-0 right-0 bg-green-500 text-white rounded-full p-2 cursor-pointer"
//                                     >
//                                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
//                                         </svg>
//                                     </label>
//                                     <input
//                                         type="file"
//                                         id="profilePic"
//                                         accept="image/*"
//                                         className="hidden"
//                                         onChange={handleProfilePicChange}
//                                     />
//                                 </div>
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
//                                 <input
//                                     id="name"
//                                     name="name"
//                                     type="text"
//                                     onChange={formik.handleChange}
//                                     value={formik.values.name}
//                                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 />
//                             </div>

//                             <div className="mb-6">
//                                 <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
//                                 <input
//                                     id="email"
//                                     name="email"
//                                     type="email"
//                                     value={formik.values.email}
//                                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                     disabled
//                                 />
//                             </div>

//                             <div className="flex items-center justify-between">
//                                 <button
//                                     type="submit"
//                                     className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                                 >
//                                     Update Profile
//                                 </button>
//                             </div>
//                         </form>
//                     )}

//                     {activeTab === 'bookingHistory' && (
//                         <div className="mt-6">
//                             <h2 className="text-2xl font-bold mb-4">Booking History</h2>
//                             <div className="space-y-4">
//                                 {bookings.map((booking) => (
//                                     <div key={booking.id} className="border rounded-lg p-4 bg-slate  -100 shadow-md">
//                                         <h3 className="text-2xl font-semibold text-green-800 mb-2">{booking.venueId.name}</h3>
//                                         <p className="text-black"><span className="font-semibold">Date:</span> {booking.date}</p>
//                                         <p className="text-black"><span className="font-semibold">Slot:</span> {`${booking.startTime} to ${booking.endTime}`}</p>
//                                         <p className="text-black"><span className="font-semibold">Status:</span> {booking.bookingStatus}</p>
//                                         <p className="text-black"><span className="font-semibold">Payment Status:</span> {booking.paymentStatus}</p>
//                                         <p className="text-black"><span className="font-semibold">Fees:</span> {booking.fees}/-</p>
//                                         <button
//                                             className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
//                                             onClick={() => handleCancelBooking(booking.id)}
//                                         >
//                                             Cancel Booking
//                                         </button>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProfilePage;









import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { USER_API } from '../../constants';
import { UserInterface } from '../../types/UserInterface';
import showToast from '../../utils/toaster';
import uploadImagesToCloudinary from '../../API/uploadImages'; // Adjust the path as needed

interface Booking {
    _id: string;
    id: string;
    venueId: {
        name: string;
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
    const [activeTab, setActiveTab] = useState<'editProfile' | 'bookingHistory'>('editProfile');
    const [profile, setProfile] = useState<UserInterface | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>(''); // State for storing the preview URL
    const [bookings, setBookings] = useState<Booking[]>([]); // State for storing booking data
    const navigate = useNavigate();

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
            } finally {
                setLoading(false);
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
                    }
                });

                // Check if the response contains 'bookings' array
                if (response.data && response.data.bookings) {
                    console.log(response.data.bookings, "booking res");
                    setBookings(response.data.bookings); // Set bookings state
                } else {
                    console.log('No bookings found in response');
                }
            } catch (error) {
                console.error('Failed to fetch bookings', error);
            }
        };

        fetchBookings();
    }, []);

    const handleCancelBooking = async (bookingId: string) => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                console.log('No auth token found');
                throw new Error('No auth token found');
            }
            console.log(bookingId,"booking is - cancel booking");
            
            const response = await axios.patch(`${USER_API}/cancel-booking/${bookingId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.success) {
                setBookings(bookings.filter(booking => booking.id !== bookingId));
                showToast('Booking cancelled successfully', 'success');
            } else {
                showToast('Failed to cancel booking', 'error');
            }
        } catch (error) {
            console.error('Failed to cancel booking', error);
            showToast('Failed to cancel booking', 'error');
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

                // Update profile with the new profile picture URL
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

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">Profile</h1>
            <div className="w-full max-w-6xl flex space-x-6">
                {/* Profile Card */}
                <div className="w-1/3 bg-white rounded-lg shadow-md p-6">
                    <div className="flex flex-col items-center pb-6">
                        <h2 className="text-xl font-semibold">{profile?.name}</h2>
                        <button
                            className={`mt-4 px-4 py-2 rounded-lg ${activeTab === 'editProfile' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => setActiveTab('editProfile')}>
                            Edit Profile
                        </button>
                    </div>
                    <div className="mt-4">
                        <button
                            className={`w-full flex items-center px-4 py-2 rounded-lg ${activeTab === 'bookingHistory' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => setActiveTab('bookingHistory')}>
                            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M13 12h7v8h-7v-8zm-2 0h-7v8h7v-8zm1-8c-1.1 0-2.9-2 2h-2c0-2.21 1.79-4 4-4s4 1.79 4 4h-2c0-1.1-.9-2-2-2zm-1 8h2v-3h3v3h-2v2h-2v-2zm-6 3v-2h2v2h2v-2h2v2h2v-2h-2v2h-2v-2h-2zm3-10v3h-3v-3h3zm5-5c-3.31 0-6 2.69-6 6v3h12v-3c0-3.31-2.69-6-6-6z" />
                            </svg>
                            Booking History
                        </button>
                    </div>
                </div>

                {/* Right Card */}
                <div className="w-2/3 bg-white rounded-lg shadow-md p-6">
                    {activeTab === 'editProfile' && (
                        <form onSubmit={formik.handleSubmit} className="mt-6">
                            <div className="mb-4 flex items-center justify-center">
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                                        <img
                                            src={previewUrl || profile?.profilePic || 'default-profile-picture.png'}
                                            alt="Selected"
                                            className="w-32 h-32 object-cover"
                                        />
                                    </div>
                                    <label
                                        htmlFor="profilePic"
                                        className="absolute bottom-0 right-0 bg-green-500 text-white rounded-full p-2 cursor-pointer"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                        </svg>
                                    </label>
                                    <input
                                        type="file"
                                        id="profilePic"
                                        accept="image/*"
                                        onChange={handleProfilePicChange}
                                        className="hidden"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    disabled // Keep email field disabled
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
                            >
                                Save
                            </button>
                        </form>
                    )}
                    {activeTab === 'bookingHistory' && (
    <div>
        <h2 className="text-xl font-semibold mb-4">Booking History</h2>
        {bookings.length > 0 ? (
            <ul>
                {bookings.map((booking) => (
                    <li key={booking._id} className="mb-4 p-4 border rounded-lg shadow-sm flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-semibold">{booking.venueId.name}</h3>
                            <p>{new Date(booking.date).toLocaleDateString()}</p>
                            <p>{booking.startTime} - {booking.endTime}</p>
                            <p>Status: {booking.bookingStatus}</p>
                            <p>Payment: {booking.paymentStatus}</p>
                            <p>Id: {booking._id}</p>
                        </div>
                        <button
                            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
                            onClick={() => handleCancelBooking(booking._id)}
                            disabled={booking.bookingStatus === 'cancelled'}
                        >
                            {booking.bookingStatus === 'cancelled' ? 'Cancelled' : 'Cancel Booking'}
                        </button>
                    </li>
                ))}
            </ul>
        ) : (
            <p>No booking history found.</p>
        )}
    </div>
)}

                        {/* </div>
                    )} */}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

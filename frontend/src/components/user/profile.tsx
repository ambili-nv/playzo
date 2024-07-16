// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import { USER_API } from '../../constants';
// import { UserInterface } from '../../types/UserInterface';
// import showToast from '../../utils/toaster'; 
// import uploadImagesToCloudinary from '../../API/uploadImages'; 

// interface Booking {
//     _id: string;
//     id: string;
//     venueId: {
//         name: string;
//         sportsitem: string;
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

//     const handleCancelBooking = async (bookingId: string) => {
//         try {
//             const token = localStorage.getItem('access_token');
//             if (!token) {
//                 console.log('No auth token found');
//                 throw new Error('No auth token found');
//             }

//             const response = await axios.patch(`${USER_API}/cancel-booking/${bookingId}`, {
//                 bookingStatus: 'cancelled'
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });

//             if (response.data.success) {
//                 setBookings(bookings.map(booking =>
//                     booking._id === bookingId ? { ...booking, bookingStatus: 'cancelled' } : booking
//                 ));
//                 showToast('Booking cancelled successfully', 'success');
//             } else {
//                 showToast('Failed to cancel booking', 'error');
//             }
//         } catch (error) {
//             console.error('Failed to cancel booking', error);
//             //@ts-ignore
//             const errorMessage = error.response?.data?.message || 'Failed to cancel booking';
//             showToast(errorMessage, 'error');
//         }
//     };

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
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v16c0 1.104.896 2 2 2h12c1.104 0 2-.896 2-2V4c0-1.104-.896-2-2-2H6c-1.104 0-2 .896-2 2z" />
//                                         </svg>
//                                     </label>
//                                     <input
//                                         id="profilePic"
//                                         name="profilePic"
//                                         type="file"
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
//                                     onBlur={formik.handleBlur}
//                                     value={formik.values.name}
//                                     className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
//                                 <input
//                                     id="email"
//                                     name="email"
//                                     type="email"
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     value={formik.values.email}
//                                     className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                     disabled // Email field is disabled for editing
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <button
//                                     type="submit"
//                                     className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                                 >
//                                     Save
//                                 </button>
//                             </div>
//                         </form>
//                     )}
//                     {activeTab === 'bookingHistory' && (
//                         <div className="mt-6">
//                             <h2 className="text-xl font-semibold mb-4">Booking History</h2>
//                             <div className="space-y-4">
//                                 {bookings.map(booking => (
//                                     <div key={booking._id} className="border p-4 rounded-lg shadow-md">
//                                         <div className="flex items-center justify-between">
//                                             <div>
//                                                 <h3 className="text-lg font-semibold">{booking.venueId.name}</h3>
//                                                 <p className="text-sm text-gray-600">{booking.venueId.sportsitem}</p>
//                                             </div>
//                                             <div>
//                                                 <p className="text-sm text-gray-600">Date: {booking.date}</p>
//                                                 <p className="text-sm text-gray-600">Time: {booking.startTime} - {booking.endTime}</p>
//                                                 <p className="text-sm text-gray-600">Booking Status: {booking.bookingStatus}</p>
//                                                 <p className="text-sm text-gray-600">Payment Status: {booking.paymentStatus}</p>
//                                                 <p className="text-sm text-gray-600">Booking ID: {booking.id}</p>
//                                                 <p className="text-sm text-gray-600">Created At: {new Date(booking.createdAt).toLocaleString()}</p>
//                                                 <p className="text-sm text-gray-600">Fees: ${booking.fees}</p>
//                                             </div>
//                                             {booking.bookingStatus === 'confirmed' && (
//                                                 <button
//                                                     onClick={() => handleCancelBooking(booking._id)}
//                                                     className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                                                 >
//                                                     Cancel Booking
//                                                 </button>
//                                             )}
//                                         </div>
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
import uploadImagesToCloudinary from '../../API/uploadImages';

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

            const response = await axios.patch(`${USER_API}/cancel-booking/${bookingId}`, {
                bookingStatus: 'cancelled'
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

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

    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(':');
        const intHours = parseInt(hours, 10);
        const suffix = intHours >= 12 ? 'PM' : 'AM';
        const formattedHours = intHours % 12 || 12; // Convert to 12-hour format, replace 0 with 12
        return `${formattedHours}:${minutes} ${suffix}`;
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
                                        className="absolute bottom-0 right-0 bg-gray-800 text-white p-2 rounded-full cursor-pointer">
                                        <svg
                                            className="w-6 h-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24">
                                            <path d="M12 4c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-7 4c0-1.66 1.34-3 3-3 1.66 0 3 1.34 3 3s-1.34 3-3 3c-1.66 0-3-1.34-3-3zm16 3h-2v-1c0-2.21-1.79-4-4-4s-4 1.79-4 4v1h-2c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2zm-6-4c1.66 0 3 1.34 3 3v1h-6v-1c0-1.66 1.34-3 3-3z" />
                                        </svg>
                                    </label>
                                    <input
                                        id="profilePic"
                                        name="profilePic"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleProfilePicChange}
                                        className="hidden"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formik.values.email}
                                    disabled
                                    onChange={formik.handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-100"
                                />
                            </div>
                            <div className="flex items-center justify-center">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg">
                                    Save
                                </button>
                            </div>
                        </form>
                    )}

                    {activeTab === 'bookingHistory' && (
                        <div className="mt-6">
                            <h2 className="text-2xl font-semibold mb-4">Booking History</h2>
                            {bookings.length > 0 ? (
                                <ul className="space-y-4">
                                    {bookings.map((booking) => (
                                        <li key={booking._id} className="p-4 bg-gray-100 rounded-lg shadow">
                                            <div className="mb-2">
                                                <strong>Venue:</strong> {booking.venueId.name} ({booking.venueId.sportsitem})
                                            </div>
                                            <div className="mb-2">
                                                <strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}
                                            </div>
                                            <div className="mb-2">
                                                <strong>Time:</strong> {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                                            </div>
                                            <div className="mb-2">
                                                <strong>Booking Status:</strong> {booking.bookingStatus}
                                            </div>
                                            <div className="mb-2">
                                                <strong>Payment Status:</strong> {booking.paymentStatus}
                                            </div>
                                            {booking.bookingStatus === 'confirmed' && (<button
                                                onClick={() => handleCancelBooking(booking._id)}
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                Cancel Booking
                                            </button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No booking history found.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

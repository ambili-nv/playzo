// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// // import { useFormik } from 'formik';
// // import { USER_API } from '../../constants';
// // import { UserInterface } from '../../types/UserInterface';
// // import showToast from '../../utils/toaster';

// // const ProfilePage: React.FC = () => {
// //     const [activeTab, setActiveTab] = useState<'editProfile' | 'bookingHistory'>('editProfile');
// //     const [profile, setProfile] = useState<UserInterface | null>(null);
// //     const [loading, setLoading] = useState<boolean>(true);
// //     const [profilePic, setProfilePic] = useState<File | null>(null);
// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         const fetchProfile = async () => {
// //             try {
// //                 const token = localStorage.getItem('access_token');
// //                 if (!token) {
// //                     console.log('No auth token found');
// //                     throw new Error('No auth token found');    
// //                 }          

// //                 const response = await axios.get(`${USER_API}/profile`, {
// //                     headers: {
// //                         Authorization: `Bearer ${token}`
// //                     }
// //                 });

// //                 setProfile(response.data.user);
// //             } catch (error) {
// //                 console.error('Failed to fetch profile', error);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         fetchProfile();
// //     }, []);

// //     const formik = useFormik({
// //         initialValues: {
// //             name: profile?.name || '',
// //             email: profile?.email || ''
// //         },
// //         enableReinitialize: true,
// //         onSubmit: async (values) => {
// //             const token = localStorage.getItem('access_token');
// //             if (!token) return;

// //             try {
// //                 // Update profile info
// //                 const profileResponse = await axios.put(`${USER_API}/profile`, values, {
// //                     headers: {
// //                         Authorization: `Bearer ${token}`
// //                     }
// //                 });

// //                 // If a new profile picture is selected, upload it
// //                 if (profilePic) {
// //                     const formData = new FormData();
// //                     formData.append('profilePic', profilePic);

// //                     const picResponse = await axios.post(`${USER_API}/profile/pic`, formData, {
// //                         headers: {
// //                             Authorization: `Bearer ${token}`,
// //                             'Content-Type': 'multipart/form-data'
// //                         }
// //                     });

// //                     setProfile({ ...profileResponse.data.user, profilePic: picResponse.data.profilePic });
// //                 } else {
// //                     setProfile(profileResponse.data.user);
// //                 }

// //                 showToast('Profile updated successfully', 'success');
// //             } catch (error) {
// //                 console.error('Failed to update profile', error);
// //                 showToast('Failed to update profile', 'error');
// //             }
// //         }
// //     });

// //     const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// //         if (event.currentTarget.files && event.currentTarget.files[0]) {
// //             setProfilePic(event.currentTarget.files[0]);
// //         }
// //     };


// //     return (
// //         <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6">
// //             <h1 className="text-3xl font-bold mb-6">Profile</h1>
// //             <div className="w-full max-w-6xl flex space-x-6">
// //                 {/* Profile Card */}
// //                 <div className="w-1/3 bg-white rounded-lg shadow-md p-6">
// //                     <div className="flex flex-col items-center pb-6">
// //                         <div className="w-24 h-24 rounded-full bg-green-200 flex items-center justify-center mb-4">
// //                             <svg className="w-12 h-12 text-green-500" fill="currentColor" viewBox="0 0 24 24">
// //                                 <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
// //                             </svg>
// //                         </div>
// //                         <h2 className="text-xl font-semibold">{profile.name}</h2>
// //                         <button 
// //                             className={`mt-4 px-4 py-2 rounded-lg ${activeTab === 'editProfile' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`} 
// //                             onClick={() => setActiveTab('editProfile')}>
// //                             Edit Profile
// //                         </button>
// //                     </div>
// //                     <div className="mt-4">
// //                         <button 
// //                             className={`w-full flex items-center px-4 py-2 rounded-lg ${activeTab === 'bookingHistory' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
// //                             onClick={() => setActiveTab('bookingHistory')}>
// //                             <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
// //                                 <path d="M13 12h7v8h-7v-8zm-2 0h-7v8h7v-8zm1-8c-1.1 0-2 .9-2 2h-2c0-2.21 1.79-4 4-4s4 1.79 4 4h-2c0-1.1-.9-2-2-2zm-1 8h2v-3h3v3h-2v2h-2v-2zm-6 3v-2h2v2h2v-2h2v2h2v-2h2v2h-2v2h-2v-2h-2v2h-2v-2h-2zm3-10v3h-3v-3h3zm5-5c-3.31 0-6 2.69-6 6v3h12v-3c0-3.31-2.69-6-6-6z"/>
// //                             </svg>
// //                             Booking History
// //                         </button>
// //                     </div>
// //                 </div>
                
// //                 {/* Right Card */}
// //                 <div className="w-2/3 bg-white rounded-lg shadow-md p-6">
// //                     {activeTab === 'editProfile' && (
// //                         <div>
// //                             <div className="flex flex-col items-center pb-6">
// //                                 <div className="w-24 h-24 rounded-full bg-green-200 flex items-center justify-center mb-4 relative">
// //                                     {profile.profilePic ? (
// //                                         <img src={profile.profilePic} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
// //                                     ) : (
// //                                         <svg className="w-12 h-12 text-green-500" fill="currentColor" viewBox="0 0 24 24">
// //                                             <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
// //                                         </svg>
// //                                     )}
// //                                     <label 
// //                                         htmlFor="profilePic" 
// //                                         className="absolute bottom-0 right-0 bg-green-500 text-white rounded-full p-1 cursor-pointer hover:bg-green-600"
// //                                     >
// //                                         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
// //                                             <path d="M17.414 2.586a2 2 0 0 0-2.828 0L9 8.172l-1.586-1.586a1 1 0 1 0-1.414 1.414L7.586 9.586l-6 6a2 2 0 0 0 0 2.828l.172.172a2 2 0 0 0 2.828 0l6-6 1.586 1.586a1 1 0 1 0 1.414-1.414L12.828 9l6-6a2 2 0 0 0 0-2.828zM5 19a1 1 0 0 1-1-1v-.172a1 1 0 0 1 .293-.707l6-6 1.414 1.414-6 6A1 1 0 0 1 5 19zm14-14a1 1 0 0 1 0 1.414l-6 6-1.414-1.414 6-6A1 1 0 0 1 19 5z"/>
// //                                         </svg>
// //                                     </label>
// //                                     <input 
// //                                         type="file" 
// //                                         id="profilePic" 
// //                                         accept="image/*" 
// //                                         className="hidden"
// //                                         onChange={handleProfilePicChange}
// //                                     />
// //                                 </div>
// //                             </div>
// //                             <form onSubmit={formik.handleSubmit} className="mt-6">
// //                                 <div className="mb-4">
// //                                     <label className="block text-gray-700">Name</label>
// //                                     <input 
// //                                         type="text" 
// //                                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" 
// //                                         {...formik.getFieldProps('name')}
// //                                     />
// //                                 </div>

// //                                 <div className="mb-4">
// //                                     <label className="block text-gray-700">Email</label>
// //                                     <input 
// //                                         type="email" 
// //                                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" 
// //                                         {...formik.getFieldProps('email')}
// //                                         disabled
// //                                     />
// //                                 </div>
// //                                 <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">
// //                                     Update Profile
// //                                 </button>
// //                             </form>
// //                         </div>
// //                     )}
                    
// //                     {activeTab === 'bookingHistory' && (
// //                         <div>
// //                             {/* Render Booking History */}
// //                         </div>
// //                     )}
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default ProfilePage;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import { USER_API } from '../../constants';
// import { UserInterface } from '../../types/UserInterface';
// import showToast from '../../utils/toaster';
// import uploadImagesToCloudinary from '../../API/uploadImages'; // Adjust the path as needed

// const ProfilePage: React.FC = () => {
//     const [activeTab, setActiveTab] = useState<'editProfile' | 'bookingHistory'>('editProfile');
//     const [profile, setProfile] = useState<UserInterface | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [profilePic, setProfilePic] = useState<File | null>(null);
//     const [previewUrl, setPreviewUrl] = useState<string>(''); // State for storing the preview URL
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
//                 // Update profile info
//                 const profileResponse = await axios.patch(`${USER_API}/edit-profile/`, values, {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 });

//                 // If a new profile picture is selected, upload it
//                 if (profilePic) {
//                     const profilePicUrl = await uploadImagesToCloudinary([profilePic]);

//                     setProfile({...profileResponse.data.user, profilePic: profilePicUrl });
//                 } else {
//                     setProfile(profileResponse.data.user);
//                 }

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
//                             className={`mt-4 px-4 py-2 rounded-lg ${activeTab === 'editProfile'? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`} 
//                             onClick={() => setActiveTab('editProfile')}>
//                             Edit Profile
//                         </button>
//                     </div>
//                     <div className="mt-4">
//                         <button 
//                             className={`w-full flex items-center px-4 py-2 rounded-lg ${activeTab === 'bookingHistory'? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
//                             onClick={() => setActiveTab('bookingHistory')}>
//                             <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
//                                 <path d="M13 12h7v8h-7v-8zm-2 0h-7v8h7v-8zm1-8c-1.1 0-2.9-2 2h-2c0-2.21 1.79-4 4-4s4 1.79 4 4h-2c0-1.1-.9-2-2-2zm-1 8h2v-3h3v3h-2v2h-2v-2zm-6 3v-2h2v2h2v-2h2v2h2v-2h-2v2h-2v-2h-2zm3-10v3h-3v-3h3zm5-5c-3.31 0-6 2.69-6 6v3h12v-3c0-3.31-2.69-6-6-6z"/>
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
//                                 <label className="block text-gray-700">Name</label>
//                                 <input 
//                                     type="text" 
//                                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" 
//                                     {...formik.getFieldProps('name')}
//                                 />
//                             </div>

//                             <div className="mb-4">
//                                 <label className="block text-gray-700">Email</label>
//                                 <input 
//                                     type="email" 
//                                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" 
//                                     {...formik.getFieldProps('email')}
//                                     disabled
//                                 />
//                             </div>
                            
//                             <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">
//                                 Update Profile
//                             </button>
//                         </form>
//                     )}
                    
//                     {activeTab === 'bookingHistory' && (
//                         <div>
//                             {/* Render Booking History */}
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

const ProfilePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'editProfile' | 'bookingHistory'>('editProfile');
    const [profile, setProfile] = useState<UserInterface | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [profilePic, setProfilePic] = useState<File | null>(null);

    const [previewUrl, setPreviewUrl] = useState<string>(''); // State for storing the preview URL
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

                    const profilePicUrl = await uploadImagesToCloudinary([profilePic]);
                    console.log(profilePicUrl,"url");
                    

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
                                <path d="M13 12h7v8h-7v-8zm-2 0h-7v8h7v-8zm1-8c-1.1 0-2.9-2 2h-2c0-2.21 1.79-4 4-4s4 1.79 4 4h-2c0-1.1-.9-2-2-2zm-1 8h2v-3h3v3h-2v2h-2v-2zm-6 3v-2h2v2h2v-2h2v2h2v-2h-2v2h-2v-2h-2zm3-10v3h-3v-3h3zm5-5c-3.31 0-6 2.69-6 6v3h12v-3c0-3.31-2.69-6-6-6z"/>
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
                                        className="hidden"
                                        onChange={handleProfilePicChange}
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    {...formik.getFieldProps('name')}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    {...formik.getFieldProps('email')}
                                    disabled
                                />
                            </div>

                            <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">
                                Update Profile
                            </button>
                        </form>
                    )}

                    {activeTab === 'bookingHistory' && (
                        <div>
                            {/* Render Booking History */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

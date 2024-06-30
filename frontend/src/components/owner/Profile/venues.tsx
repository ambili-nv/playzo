// // import React from 'react';

// // const VenueDetailsPage: React.FC = () => {
// //     return (
// //         <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6 mt-12">
// //             <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
// //                 <h1 className="text-3xl font-bold mb-6">Venue Details</h1>
// //                 <div className="mb-4">
// //                     <label className="block text-gray-700 mb-2">Venue Name</label>
// //                     <input
// //                         type="text"
// //                         className="w-full px-4 py-2 border rounded-lg"
// //                         placeholder="Enter venue name"
// //                     />
// //                 </div>
// //                 <div className="mb-4">
// //                     <label className="block text-gray-700 mb-2">Sports Item</label>
// //                     <input
// //                         type="text"
// //                         className="w-full px-4 py-2 border rounded-lg"
// //                         placeholder="Enter sports item"
// //                     />
// //                 </div>
// //                 <div className="mb-4">
// //                     <label className="block text-gray-700 mb-2">Location</label>
// //                     <input
// //                         type="text"
// //                         className="w-full px-4 py-2 border rounded-lg"
// //                         placeholder="Enter location"
// //                     />
// //                 </div>
// //                 <div className="mb-4">
// //                     <label className="block text-gray-700 mb-2">Price</label>
// //                     <input
// //                         type="text"
// //                         className="w-full px-4 py-2 border rounded-lg"
// //                         placeholder="Enter price"
// //                     />
// //                 </div>
// //                 <div className="mb-4">
// //                     <label className="block text-gray-700 mb-2">Primary Image</label>
// //                     <div className="w-full h-64 bg-gray-200 rounded-lg"></div>
// //                 </div>
// //                 <div className="mb-4">
// //                     <label className="block text-gray-700 mb-2">Secondary Images</label>
// //                     <div className="grid grid-cols-2 gap-4">
// //                         <div className="w-full h-40 bg-gray-200 rounded-lg"></div>
// //                         <div className="w-full h-40 bg-gray-200 rounded-lg"></div>
// //                         <div className="w-full h-40 bg-gray-200 rounded-lg"></div>
// //                         <div className="w-full h-40 bg-gray-200 rounded-lg"></div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default VenueDetailsPage;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { OWNER_API } from '../../../constants';
const VenueDetailsPage: React.FC = () => {
    const [venueDetails, setVenueDetails] = useState({
        name: '',
        sportsItem: '',
        location: '',
        price: '',
        primaryImage: '',
        secondaryImages: []
    });

    useEffect(() => {
        const fetchVenueDetails = async () => {
            try {
                const token = localStorage.getItem('accessToken'); // Get the access token from local storage or any other place you store it

                const response = await axios.get(OWNER_API+'/venue-details', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setVenueDetails(response.data);
            } catch (error) {
                console.error('Error fetching venue details:', error);
            }
        };

        fetchVenueDetails();
    }, []);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6 mt-12">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold mb-6">Venue Details</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Venue Name</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg"
                        value={venueDetails.name}
                        readOnly
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Sports Item</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg"
                        value={venueDetails.sportsItem}
                        readOnly
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Location</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg"
                        value={venueDetails.location}
                        readOnly
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Price</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg"
                        value={venueDetails.price}
                        readOnly
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Primary Image</label>
                    <div
                        className="w-full h-64 bg-gray-200 rounded-lg"
                        style={{
                            backgroundImage: `url(${venueDetails.primaryImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    ></div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Secondary Images</label>
                    <div className="grid grid-cols-2 gap-4">
                        {venueDetails.secondaryImages?.length > 0 ? (
                            venueDetails.secondaryImages.map((image, index) => (
                                <div
                                    key={index}
                                    className="w-full h-40 bg-gray-200 rounded-lg"
                                    style={{
                                        backgroundImage: `url(${image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                ></div>
                            ))
                        ) : (
                            <p>No secondary images available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VenueDetailsPage;

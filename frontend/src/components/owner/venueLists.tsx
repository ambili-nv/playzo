// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// interface Venue {
//     _id: string;
//     name: string;
//     sportsitem: string;
//     place: string;
//     price: number;
//     description: string;
//     primaryImage: string;
//     secondaryImages: string[];
//     isApproved: boolean;
// }

// const MyVenuesList: React.FC = () => {
//     const { ownerId } = useParams<{ ownerId: string }>();
//     const [venues, setVenues] = useState<Venue[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     // Mock data for demonstration purposes
//     useEffect(() => {
//         const mockVenues: Venue[] = [
//             {
//                 _id: '1',
//                 name: 'Venue 1',
//                 sportsitem: 'Football',
//                 place: 'City A',
//                 price: 100,
//                 description: 'A great venue for football.',
//                 primaryImage: 'https://via.placeholder.com/150',
//                 secondaryImages: [],
//                 isApproved: true,
//             },
//             // Add more mock venues here
//         ];
//         setVenues(mockVenues);
//         setIsLoading(false);
//     }, [ownerId]);

//     return (
//         <div className="p-6 bg-gray-100 min-h-screen">
//             <h1 className="text-2xl font-bold text-green-700 mb-4 mt-12 ml-12">Venue List</h1>
//             {isLoading ? (
//                 <p>Loading...</p>
//             ) : error ? (
//                 <p>{error}</p>
//             ) : venues.length === 0 ? (
//                 <p>No venues available for this owner.</p>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {venues.map((venue) => (
//                         <div key={venue._id} className="bg-white rounded-lg shadow-md overflow-hidden">
//                             <div className="h-48 overflow-hidden">
//                                 {venue.primaryImage ? (
//                                     <img src={venue.primaryImage} alt={venue.name} className="w-full h-full object-cover" />
//                                 ) : (
//                                     <div className="w-full h-full flex items-center justify-center bg-gray-200">
//                                         <span>No Primary Image Available</span>
//                                     </div>
//                                 )}
//                             </div>
//                             <div className="p-4">
//                                 <h2 className="text-xl font-semibold text-green-700 text-center">{venue.name}</h2>
//                                 <p className="text-gray-600 mb-2 mt-5"><strong>SportsItem:</strong> {venue.sportsitem}</p>
//                                 <p className="text-gray-600 mb-2"><strong>Location:</strong> {venue.place}</p>
//                                 <p className="text-gray-600 mb-2"><strong>Price:</strong> ${venue.price}</p>
//                                 <p className="text-gray-600 mb-2"><strong>Description:</strong> {venue.description}</p>
//                                 <p className="text-gray-600 mb-2"><strong>Status:</strong> <span className={venue.isApproved ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{venue.isApproved ? 'Accepted' : 'Rejected'}</span></p>
//                                 <div className="mt-4 flex justify-around">
//                                     <button
//                                         // onClick={() => history.push(`/edit-venue/${venue._id}`)}
//                                         className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     >
//                                         Edit
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MyVenuesList;



import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { OWNER_API } from '../../constants'; // Assuming OWNER_API is defined for owner's API endpoints
import showToast from '../../utils/toaster'; // Assuming showToast is a utility for displaying toast notifications
import axiosInstance from '../../utils/axiosInstance'; // Assuming axiosInstance is configured with base URL and interceptors
import { useNavigate } from 'react-router-dom';

interface Venue {
    _id: string;
    name: string;
    sportsitem: string;
    place: string;
    price: number;
    description: string;
    primaryImage: string;
    secondaryImages: string[];
    isApproved: boolean;
}

const MyVenuesList: React.FC = () => {
    const { ownerId } = useParams<{ ownerId: string }>();
    const [venues, setVenues] = useState<Venue[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const token = localStorage.getItem('accessToken'); // Assuming you store the token in localStorage

                const response = await axiosInstance.get(`${OWNER_API}/myvenue-list/${ownerId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setVenues(response.data.venues);
            } catch (error) {
                showToast('Failed to fetch venues', 'error');
                setError('Failed to fetch venues');
            } finally {
                setIsLoading(false);
            }
        };

        fetchVenues();
    }, [ownerId]);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-green-700 mb-4 mt-12 ml-12">Venue List</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : venues.length === 0 ? (
                <p>No venues available for this owner.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {venues.map((venue) => (
                        <div key={venue._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="h-48 overflow-hidden">
                                {venue.primaryImage ? (
                                    <img src={venue.primaryImage} alt={venue.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                        <span>No Primary Image Available</span>
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-green-700 text-center">{venue.name}</h2>
                                <p className="text-gray-600 mb-2 mt-5"><strong>SportsItem:</strong> {venue.sportsitem}</p>
                                <p className="text-gray-600 mb-2"><strong>Location:</strong> {venue.place}</p>
                                <p className="text-gray-600 mb-2"><strong>Price:</strong> ${venue.price}</p>
                                <p className="text-gray-600 mb-2"><strong>Description:</strong> {venue.description}</p>
                                <p className="text-gray-600 mb-2"><strong>Status:</strong> <span className={venue.isApproved ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{venue.isApproved ? 'Accepted' : 'Rejected'}</span></p>
                                <div className="mt-4 flex justify-around">
                                    <button
                                        // onClick={() => history.push(`/edit-venue/${venue._id}`)}
                                        onClick={() => navigate(`/owner/edit-venue/${venue._id}`)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyVenuesList;

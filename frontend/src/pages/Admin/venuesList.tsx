import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ADMIN_API } from '../../constants';
import showToast from '../../utils/toaster';
import axiosInstance from '../../utils/axiosInstance';

interface Venue {
    _id: string;
    name: string;
    sportsitem: string;
    place: string;
    // price: number;
    description: string;
    primaryImage: string;
    secondaryImages: string[];
    isApproved:boolean;
}

const VenuesList: React.FC = () => {
    const { ownerId } = useParams<{ ownerId: string }>();
    console.log(ownerId, "ownerId-venue front end");

    const [venues, setVenues] = useState<Venue[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const response = await axiosInstance.get(`${ADMIN_API}/venues/${ownerId}`);
                setVenues(response.data.venues);
            } catch (error) {
                showToast('Failed to fetch venues');
                setError('Failed to fetch venues');
            } finally {
                setIsLoading(false);
            }
        };
        fetchVenues();
    }, [ownerId]);

    const handleAccept = async (venueId: string) => {
        try {
            const response = await axiosInstance.post(`${ADMIN_API}/accept-venues/${venueId}`);
            showToast(response.data.message, 'success');
            // Optionally update the state or handle re-fetching venues
        } catch (error) {
            showToast('Failed to accept venue', 'error');
        }
    };

    const handleReject = async (venueId: string) => {
        try {
            const response = await axiosInstance.post(`${ADMIN_API}/reject-venues/${venueId}`);
            showToast(response.data.message, 'success');
            // Optionally update the state or handle re-fetching venues
        } catch (error) {
            showToast('Failed to reject venue', 'error');
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-green-700 mb-4">Venue List</h1>
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
                                <h2 className="text-xl font-semibold text-green-700 text-center ">{venue.name}</h2>
                                <p className="text-gray-600 mb-2 mt-5"><strong>SportsItem:</strong> {venue.sportsitem}</p>
                                <p className="text-gray-600 mb-2"><strong>Location:</strong> {venue.place}</p>
                                {/* <p className="text-gray-600 mb-2"><strong>Price:</strong> ${venue.price}</p> */}
                                <p className="text-gray-600 mb-2"><strong>Description:</strong> {venue.description}</p>
                                <p className="text-gray-600 mb-2"><strong>Status:</strong> <span className={venue.isApproved ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{venue.isApproved ? 'Accepted' : 'Rejected'}</span></p>
                                <div className="mt-4 flex justify-around">
                                    <button
                                        onClick={() => handleAccept(venue._id)}
                                        className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        Accept
                                    </button>
                                   
                                    <button
                                        onClick={() => handleReject(venue._id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        Reject
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



export default VenuesList;





import React from 'react';

const VenueDetailsPage: React.FC = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6 mt-12">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold mb-6">Venue Details</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Venue Name</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="Enter venue name"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Sports Item</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="Enter sports item"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Location</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="Enter location"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Price</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="Enter price"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Primary Image</label>
                    <div className="w-full h-64 bg-gray-200 rounded-lg"></div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Secondary Images</label>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="w-full h-40 bg-gray-200 rounded-lg"></div>
                        <div className="w-full h-40 bg-gray-200 rounded-lg"></div>
                        <div className="w-full h-40 bg-gray-200 rounded-lg"></div>
                        <div className="w-full h-40 bg-gray-200 rounded-lg"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VenueDetailsPage;

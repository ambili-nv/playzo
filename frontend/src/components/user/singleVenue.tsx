// // VenuePage.tsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { USER_API } from '../../constants';
// import BookingModal from './bookingModal';

// interface Venue {
//   _id: string;
//   name: string;
//   sportsitem: string;
//   place: string;
//   price: number;
//   description: string;
//   primaryImage: string;
//   secondaryImages: string[];
//   isApproved: boolean;
// }

// const VenuePage: React.FC = () => {
//   const { venueId } = useParams<{ venueId: string }>();
//   const [venue, setVenue] = useState<Venue | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchVenueDetails = async () => {
//       try {
//         const response = await axios.get(`${USER_API}/single-venue/${venueId}`);
//         if (response.data && response.data.success) {
//           setVenue(response.data.venueDetails);
//         } else {
//           setError('Error loading venue details');
//         }
//       } catch (err) {
//         setError('Error loading venue details');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVenueDetails();
//   }, [venueId]);

//   const handlePrevImage = () => {
//     if (venue && venue.secondaryImages.length > 0) {
//       setCurrentImageIndex((prevIndex) =>
//         prevIndex === 0 ? venue.secondaryImages.length - 1 : prevIndex - 1
//       );
//     }
//   };

//   const handleNextImage = () => {
//     if (venue && venue.secondaryImages.length > 0) {
//       setCurrentImageIndex((prevIndex) =>
//         prevIndex === venue.secondaryImages.length - 1 ? 0 : prevIndex + 1
//       );
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="container mx-auto px-4 py-8 mt-12 bg-gray-100">
//       {venue ? (
//         <>
//           <h1 className="text-4xl font-bold mb-8 text-center text-green-700">Venue Details</h1>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
//               <div>
//                 <h2 className="text-3xl font-bold text-gray-800">{venue.name}</h2>
//               </div>
//               <div className="border rounded p-4">
//                 <p className="text-lg font-semibold">Sport</p>
//                 <p className="text-base mt-2 text-slate-600">{venue.sportsitem}</p>
//               </div>
//               <div className="border rounded p-4">
//                 <p className="text-xl font-semibold">Location</p>
//                 <p className="text-base mt-2 text-slate-600">{venue.place}</p>
//               </div>
//               <div className="border rounded p-4">
//                 <p className="text-xl font-semibold">Price</p>
//                 <p className="text-base mt-2 text-slate-600">{venue.price}</p>
//               </div>
//               <div className="border rounded p-4">
//                 <p className="text-xl font-semibold">Description</p>
//                 <p className="text-base mt-2 text-slate-600">{venue.description}</p>
//               </div>
//             </div>

//             <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center relative">
//               {venue.secondaryImages && venue.secondaryImages.length > 0 && (
//                 <div className="relative w-full h-96 flex items-center justify-center">
//                   <img
//                     src={venue.secondaryImages[currentImageIndex]}
//                     alt={venue.name}
//                     className="w-full h-full object-cover rounded-lg"
//                   />
//                   {venue.secondaryImages.length > 1 && (
//                     <>
//                       <button
//                         onClick={handlePrevImage}
//                         className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-full"
//                       >
//                         &lt;
//                       </button>
//                       <button
//                         onClick={handleNextImage}
//                         className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-full"
//                       >
//                         &gt;
//                       </button>
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//           <div className="container mx-auto px-4 py-8 mt-12 bg-gray-100">
//     {venue ? (
//       <>
//         // Existing code...
//         <div className="flex justify-end mt-4 h-200">
//           <button
//             onClick={() => setIsBookingModalOpen(true)}
//             className="px-4 py-2 rounded-full text-white font-semibold shadow-md transition-all duration-300 ease-in-out bg-green-500 hover:bg-green-600"
//           >
//             Book Now
//           </button>
//         </div>
//         <BookingModal
//           isOpen={isBookingModalOpen}
//           onClose={() => setIsBookingModalOpen(false)}
//           venueId={venue._id}
//         />
//       </>
//     ) : (
//       <div>No venue details available.</div>
//     )}
//   </div>

//   );
// };

// export default VenuePage;





// VenuePage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { USER_API } from '../../constants';
import BookingModal from './bookingModal';

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

const VenuePage: React.FC = () => {
  const { venueId } = useParams<{ venueId: string }>();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const response = await axios.get(`${USER_API}/single-venue/${venueId}`);
        if (response.data && response.data.success) {
          setVenue(response.data.venueDetails);
        } else {
          setError('Error loading venue details');
        }
      } catch (err) {
        setError('Error loading venue details');
      } finally {
        setLoading(false);
      }
    };

    fetchVenueDetails();
  }, [venueId]);

  const handlePrevImage = () => {
    if (venue && venue.secondaryImages.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? venue.secondaryImages.length - 1 : prevIndex - 1
      );
    }
  };

  const handleNextImage = () => {
    if (venue && venue.secondaryImages.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === venue.secondaryImages.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8 mt-12 bg-gray-100">
      {venue ? (
        <>
          <h1 className="text-4xl font-bold mb-8 text-center text-green-700">Venue Details</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{venue.name}</h2>
              </div>
              <div className="border rounded p-4">
                <p className="text-lg font-semibold">Sport</p>
                <p className="text-base mt-2 text-slate-600">{venue.sportsitem}</p>
              </div>
              <div className="border rounded p-4">
                <p className="text-xl font-semibold">Location</p>
                <p className="text-base mt-2 text-slate-600">{venue.place}</p>
              </div>
              <div className="border rounded p-4">
                <p className="text-xl font-semibold">Price</p>
                <p className="text-base mt-2 text-slate-600">{venue.price}</p>
              </div>
              <div className="border rounded p-4">
                <p className="text-xl font-semibold">Description</p>
                <p className="text-base mt-2 text-slate-600">{venue.description}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center relative">
              {venue.secondaryImages && venue.secondaryImages.length > 0 && (
                <div className="relative w-full h-96 flex items-center justify-center">
                  <img
                    src={venue.secondaryImages[currentImageIndex]}
                    alt={venue.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {venue.secondaryImages.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-full"
                      >
                        &lt;
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-full"
                      >
                        &gt;
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end mt-4 h-200">
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="px-4 py-2 rounded-full text-white font-semibold shadow-md transition-all duration-300 ease-in-out bg-green-500 hover:bg-green-600"
            >
              Book Now
            </button>
          </div>
          <BookingModal
            isOpen={isBookingModalOpen}
            onClose={() => setIsBookingModalOpen(false)}
            venueId={venue._id}
          />
        </>
      ) : (
        <div>No venue details available.</div>
      )}
    </div>
  );
};

export default VenuePage;

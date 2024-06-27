// import React from 'react';

// const Card :React.FC=() => {
//   // Dummy content
//   const dummyImage = "/src/assets/images/banner2.jpg";
//   const dummyTitle = "Dummy Title";
//   const dummyLocation = "Dummy Location";
//   const dummyRating = "4.5";
 
 
//   return (
//     <>
//     <div className="flex flex-wrap justify-around  items-center  p-5">
//     <div className="bg-white rounded-lg shadow-md overflow-hidden duration-300  hover:-translate-y-1 w-[350px] mt-5">
//       <img src={dummyImage} alt={dummyTitle} className="w-full h-52 object-cover" />
//       <div className="p-4">
//         <h3 className="text-xl font-semibold">{dummyTitle}</h3>
//         <p className="text-gray-500">{ dummyLocation} </p>
//         <div className="flex items-center justify-between mt-2">
//           <div className="flex items-center">
//             <span className="text-yellow-500">★</span>
//             <span className="ml-1">{dummyRating} </span>
//           </div>
//         </div>
//       </div>
//     </div>


//     <div className="bg-white rounded-lg shadow-md overflow-hidden duration-300  hover:-translate-y-1 w-[350px] mt-5">
//       <img src={dummyImage} alt={dummyTitle} className="w-full h-52 object-cover" />
//       <div className="p-4">
//         <h3 className="text-xl font-semibold">{dummyTitle}</h3>
//         <p className="text-gray-500">{ dummyLocation} </p>
//         <div className="flex items-center justify-between mt-2">
//           <div className="flex items-center">
//             <span className="text-yellow-500">★</span>
//             <span className="ml-1">{dummyRating}</span>
//           </div>
//         </div>
//       </div>
//     </div>


//     <div className="bg-white rounded-lg shadow-md overflow-hidden duration-300  hover:-translate-y-1 w-[350px] mt-5">
//       <img src={dummyImage} alt={dummyTitle} className="w-full h-52 object-cover" />
//       <div className="p-4">
//         <h3 className="text-xl font-semibold">{dummyTitle}</h3>
//         <p className="text-gray-500">{ dummyLocation} </p>
//         <div className="flex items-center justify-between mt-2">
//           <div className="flex items-center">
//             <span className="text-yellow-500">★</span>
//             <span className="ml-1">{dummyRating}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="bg-white rounded-lg shadow-md overflow-hidden duration-300  hover:-translate-y-1 w-[350px] mt-5">
//       <img src={dummyImage} alt={dummyTitle} className="w-full h-52 object-cover" />
//       <div className="p-4">
//         <h3 className="text-xl font-semibold">{dummyTitle}</h3>
//         <p className="text-gray-500">{ dummyLocation}</p>
//         <div className="flex items-center justify-between mt-2">
//           <div className="flex items-center">
//             <span className="text-yellow-500">★</span>
//             <span className="ml-1">{dummyRating}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="bg-white rounded-lg shadow-md overflow-hidden duration-300  hover:-translate-y-1 w-[350px] mt-5">
//       <img src={dummyImage} alt={dummyTitle} className="w-full h-52 object-cover" />
//       <div className="p-4">
//         <h3 className="text-xl font-semibold">{dummyTitle}</h3>
//         <p className="text-gray-500">{ dummyLocation} </p>
//         <div className="flex items-center justify-between mt-2">
//           <div className="flex items-center">
//             <span className="text-yellow-500">★</span>
//             <span className="ml-1">{dummyRating}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="bg-white rounded-lg shadow-md overflow-hidden duration-300  hover:-translate-y-1 w-[350px] mt-5">
//       <img src={dummyImage} alt={dummyTitle} className="w-full h-52 object-cover" />
//       <div className="p-4">
//         <h3 className="text-xl font-semibold">{dummyTitle}</h3>
//         <p className="text-gray-500">{ dummyLocation} </p>
//         <div className="flex items-center justify-between mt-2">
//           <div className="flex items-center">
//             <span className="text-yellow-500">★</span>
//             <span className="ml-1">{dummyRating}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="bg-white rounded-lg shadow-md overflow-hidden duration-300  hover:-translate-y-1 w-[350px] mt-5">
//       <img src={dummyImage} alt={dummyTitle} className="w-full h-52 object-cover" />
//       <div className="p-4">
//         <h3 className="text-xl font-semibold">{dummyTitle}</h3>
//         <p className="text-gray-500">{ dummyLocation} </p>
//         <div className="flex items-center justify-between mt-2">
//           <div className="flex items-center">
//             <span className="text-yellow-500">★</span>
//             <span className="ml-1">{dummyRating}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="bg-white rounded-lg shadow-md overflow-hidden duration-300  hover:-translate-y-1 w-[350px] mt-5">
//       <img src={dummyImage} alt={dummyTitle} className="w-full h-52 object-cover" />
//       <div className="p-4">
//         <h3 className="text-xl font-semibold">{dummyTitle}</h3>
//         <p className="text-gray-500">{ dummyLocation} </p>
//         <div className="flex items-center justify-between mt-2">
//           <div className="flex items-center">
//             <span className="text-yellow-500">★</span>
//             <span className="ml-1">{dummyRating}</span>
//           </div>
//         </div>
//       </div>
//     </div>



// </div>

// </>
//   );
// };

// export default Card;




// components/VenueList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import showToast from '../../../utils/toaster';
import { USER_API } from '../../../constants';


interface Venue {
  _id: string;
  name: string;
  primaryImage: string;
  sportsitem: string;
  place: string;
}

const Card: React.FC = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get(USER_API + "/getvenues"); // Adjust the API endpoint as per your backend setup
        setVenues(response.data.venues);
      } catch (error: any) {
        showToast('Failed to fetch venues');
        setError('Failed to fetch venues');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenues();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="flex flex-wrap justify-around items-center p-5">
        {venues.map((venue) => (
          <div key={venue._id} className="bg-white rounded-lg shadow-md overflow-hidden duration-300 hover:-translate-y-1 w-[350px] mt-5">
            <img src={venue.primaryImage} alt={venue.name} className="w-full h-52 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{venue.name}</h3>
              <p className="font-semibold">{venue.sportsitem}</p>
              <p className="text-gray-500">{venue.place}</p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  {/* <span className="text-yellow-500">★</span> */}
                  {/* <span className="ml-1">4.5</span> Replace wi/th actual rating */}
                </div>
                <button className="px-4 py-2 rounded-full text-white font-semibold shadow-md transition-all duration-300 ease-in-out bg-green-500 hover:bg-green-600">
                  View Details {/* Add onClick handler for details view */}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Card;

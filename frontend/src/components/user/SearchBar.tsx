import React from 'react';

const SearchBar:React.FC =()=> {


  return (
    <form className="w-full max-w-lg mx-auto mt-8">
      <div className="relative mt-[100px]">
        <input
          type="text"
          className="w-full h-14 px-6 py-4 pr-16 border border-gray-300 rounded-2xl shadow-lg  outline-none"
          placeholder="Enter the location"
        />
        <button
          type="submit"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;




// import React from 'react';

// const SearchBar: React.FC = () => {
//   return (
//     <form className="w-full max-w-lg mx-auto mt-8">
//       <div className="relative">
//         <h2 className="absolute top-0 left-0 text-2xl font-bold text-gray-800 mt-6">Discover and Book Top Sports Complexes</h2> {/* Heading Text */}
       
//         <div> {/* Adjust this margin to place the search bar below the heading text */}
//           <input
//             type="text"
//             className="w-full h-14 px-6 py-4 pr-16 border border-gray-300 rounded-2xl shadow-lg outline-none mt-[80px]"
//             placeholder="Enter the location"
//           />
//           <button
//             type="submit"
//             className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 mt-[41px]"
//           >
//             Search
//           </button>
//         </div>
       
//       </div>
//     </form>
//   );
// };

// export default SearchBar;









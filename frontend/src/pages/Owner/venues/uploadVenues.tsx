// import React from 'react';

// const VenueUpload = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
//         <h2 className="text-2xl font-semibold mb-6 text-center">Upload Venue</h2>
//         <form>
//           <div className="mb-4">
//             <label className="block text-gray-700">Name</label>
//             <input type="text" placeholder="Enter your Venue Name" className="w-full px-3 py-2 border rounded" />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Sports</label>
//             <input type="text" placeholder="Enter the Sports Item" className="w-full px-3 py-2 border rounded" />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Location Details</label>
//             <input type="text" placeholder="Enter Location Details" className="w-full px-3 py-2 border rounded" />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Price Details</label>
//             <input type="text" placeholder="Enter Price Details" className="w-full px-3 py-2 border rounded" />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Add Description</label>
//             <textarea placeholder="Add an overview about your venue" className="w-full px-3 py-2 border rounded"></textarea>
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Upload Images</label>
//             <input type="file" className="w-full px-3 py-2 border rounded" />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Upload Your liscence</label>
//             <input type="file" className="w-full px-3 py-2 border rounded" />
//           </div>
//           <button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default VenueUpload;



// import React from 'react';

// const VenueUpload = () => {
//   return (
//     <div className="min-h-screen flex flex-col bg-gray-100">
//       {/* Header */}
//       <header className="bg-green-500 text-white p-4 shadow-md">
//         <h1 className="text-3xl font-semibold text-center">PlayZo - Upload Your Venue</h1>
//       </header>
      
//       {/* Main Content */}
//       <main className="flex-1 flex flex-col items-center justify-center p-6">
//         <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-semibold mb-6 text-center">Upload Venue</h2>
//           <form>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
//               <div>
//                 <label className="block text-gray-700">Name</label>
//                 <input type="text" placeholder="Enter your Venue Name" className="w-full px-3 py-2 border rounded" />
//               </div>
//               <div>
//                 <label className="block text-gray-700">Sports</label>
//                 <input type="text" placeholder="Enter the Sports Item" className="w-full px-3 py-2 border rounded" />
//               </div>
//               <div>
//                 <label className="block text-gray-700">Location Details</label>
//                 <input type="text" placeholder="Enter Location Details" className="w-full px-3 py-2 border rounded" />
//               </div>
//               <div>
//                 <label className="block text-gray-700">Price Details</label>
//                 <input type="text" placeholder="Enter Price Details" className="w-full px-3 py-2 border rounded" />
//               </div>
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Add Description</label>
//               <textarea placeholder="Add an overview about your venue" className="w-full px-3 py-2 border rounded"></textarea>
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Upload Images</label>
//               <input type="file" className="w-full px-3 py-2 border rounded" />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Upload Your License</label>
//               <input type="file" className="w-full px-3 py-2 border rounded" />
//             </div>
//             <button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
//               Register
//             </button>
//           </form>
//         </div>
//       </main>
      
//       {/* Footer */}
//       <footer className="bg-white shadow-md p-4 text-center">
//         <p className="text-gray-700">© 2024 PlayZo. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default VenueUpload;


import React from 'react';

const VenueUpload = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-green-500 text-white p-4 shadow-md">
        <h1 className="text-3xl font-semibold text-center">PlayZo - Upload Your Venue</h1>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center">Upload Venue</h2>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-gray-700">Name</label>
                <input type="text" placeholder="Enter your Venue Name" className="w-full px-3 py-2 border rounded" />
              </div>
              <div>
                <label className="block text-gray-700">Sports</label>
                <input type="text" placeholder="Enter the Sports Item" className="w-full px-3 py-2 border rounded" />
              </div>
              <div>
                <label className="block text-gray-700">Location Details</label>
                <input type="text" placeholder="Enter Location Details" className="w-full px-3 py-2 border rounded" />
              </div>
              <div>
                <label className="block text-gray-700">Price Details</label>
                <input type="text" placeholder="Enter Price Details" className="w-full px-3 py-2 border rounded" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Add Description</label>
              <textarea placeholder="Add an overview about your venue" className="w-full px-3 py-2 border rounded"></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Upload Images</label>
              <input type="file" className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Upload Your License</label>
              <input type="file" className="w-full px-3 py-2 border rounded" />
            </div>
            <button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Verify
            </button>
          </form>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white shadow-md p-4 text-center">
        <p className="text-gray-700">© 2024 PlayZo. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default VenueUpload;

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Menu } from 'lucide-react'; 
// // import logo from '../../../assets/images/logo.png'; // Ensure the path to the logo is correct

// const OwnerNavbar = () => {
//   const [isNavOpen, setIsNavOpen] = useState(false);

//   return (
//     <nav className="bg-white dark:bg-white fixed top-0 left-0 right-0 z-50 shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex items-center">
//             <Link to="/">
//               <img src="src/assets/images/logo.png" alt="Logo" className="h-8 w-auto" />
//             </Link>
//           </div>
//           <div className="flex items-center">
//             <div className="hidden md:block">
//               <div className="ml-10 flex items-baseline space-x-4">
//                 <Link to="/" className="text-blcak dark:text-black px-3 py-2 rounded-md text-sm font-medium hover:text-black ">
//                   Home
//                 </Link>
//                 <Link to="/book" className="text-blcak dark:text-black px-3 py-2 rounded-md text-sm font-medium hover:text-black ">
//                 Add Venue
//                 </Link>
//                 <Link to="/contact" className="text-blcak dark:text-black px-3 py-2 rounded-md text-sm font-medium hover:text-black ">
//                 Bookings
//                 </Link>
//                 <Link to="/profile" className="text-blcak dark:text-black px-3 py-2 rounded-md text-sm font-medium hover:text-black ">
//                   Login/Sign Up
//                 </Link>
//               </div>
//             </div>
//             <div className="md:hidden">
//               <button
//                 onClick={() => setIsNavOpen(!isNavOpen)}
//                 className="text-gray-800 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white focus:outline-none"
//               >
//                 <Menu className="h-6 w-6" /> 
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className={`${isNavOpen ? 'block' : 'hidden'} md:hidden`}>
//         <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//           <Link to="/" className="text-blcak dark:text-black px-3 py-2 rounded-md text-sm font-medium hover:text-black ">
//             Home
//           </Link>
//           <Link to="/book" className="text-blcak dark:text-black px-3 py-2 rounded-md text-sm font-medium hover:text-black ">
//             Bookings
//           </Link>
//           <Link to="/contact" className="text-blcak dark:text-black px-3 py-2 rounded-md text-sm font-medium hover:text-black ">
//             Slot
//           </Link>
//           <Link to="/profile" className="text-blcak dark:text-black px-3 py-2 rounded-md text-sm font-medium hover:text-black ">
//             Profile
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default OwnerNavbar;




import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react'; 

const OwnerSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-200 ease-in-out bg-white dark:bg-gray-800 shadow-lg w-64 z-30`}>
        <div className="flex items-center justify-between p-4">
          <Link to="/">
            <img src="src/assets/images/logo.png" alt="Logo" className="h-8 w-auto" />
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-gray-800 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white focus:outline-none"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-4">
          <Link to="/" className="block text-black dark:text-gray-300 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700">
            Home
          </Link>
          <Link to="/book" className="block text-black dark:text-gray-300 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700">
            Add Venue
          </Link>
          <Link to="/userlogin" className="block text-black dark:text-gray-300 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700">
            Bookings
          </Link>
          <Link to="/signup" className="block text-black dark:text-gray-300 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700">
            Profile
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white dark:bg-gray-800 shadow-md p-4 md:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-800 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white focus:outline-none"
          >
            <Menu className="h-6 w-6" />
          </button>
        </header>
        <main className="flex-1 p-8 bg-gray-100 dark:bg-gray-900">
          {/* Your main content goes here */}
        </main>
      </div>
    </div>
  );
};

export default OwnerSidebar;

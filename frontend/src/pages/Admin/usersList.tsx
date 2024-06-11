// import React from 'react';

// const UsersList: React.FC = () => {
//   return (
//     <main >
//       <div className="overflow-x-auto mt-4 ">
//         <table className="min-w-full bg-white">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b">Name</th>
//               <th className="py-2 px-4 border-b">Email</th>
//               <th className="py-2 px-4 border-b">Venue Name</th>
//               <th className="py-2 px-4 border-b">Verified</th>
//               <th className="py-2 px-4 border-b">Details</th>
//               <th className="py-2 px-4 border-b">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Array.from({ length: 5 }).map((_, index) => (
//               <tr key={index}>
//                 <td className="py-2 px-4 border-b">Ambili</td>
//                 <td className="py-2 px-4 border-b">ambili@gmail.com</td>
//                 <td className="py-2 px-4 border-b">Riverside Arena</td>
//                 <td className="py-2 px-4 border-b">True</td>
//                 <td className="py-2 px-4 border-b text-blue-600">View</td>
//                 <td className="py-2 px-4 border-b text-red-600">
//                   {index % 2 === 0 ? 'Blocked' : 'Active'}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </main>
//   );
// };

// export default UsersList;



// import React from 'react';

// const UsersList: React.FC = () => {
//   return (
//     <main>
//       <div className="overflow-x-auto mt-4">
//         <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="py-3 px-4 text-left">Name</th>
//               <th className="py-3 px-4 text-left">Email</th>
//               <th className="py-3 px-4 text-left">Venue Name</th>
//               <th className="py-3 px-4 text-left">Verified</th>
//               <th className="py-3 px-4 text-left">Details</th>
//               <th className="py-3 px-4 text-left">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Array.from({ length: 5 }).map((_, index) => (
//               <React.Fragment key={index}>
//                 <tr className="bg-gray-50">
//                   <td className="py-3 px-4 whitespace-nowrap">Ambili</td>
//                   <td className="py-3 px-4 whitespace-nowrap">ambili@gmail.com</td>
//                   <td className="py-3 px-4 whitespace-nowrap">Riverside Arena</td>
//                   <td className="py-3 px-4 whitespace-nowrap">True</td>
//                   <td className="py-3 px-4 whitespace-nowrap text-blue-600">View</td>
//                   <td className="py-3 px-4 whitespace-nowrap text-red-600">
//                     {index % 2 === 0 ? 'Blocked' : 'Active'}
//                   </td>
//                 </tr>
//                 {index !== 4 && <tr style={{ height: '8px', backgroundColor: 'white' }} />}
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </main>
//   );
// };

// export default UsersList;


import React from 'react';

const UsersList: React.FC = () => {
  return (
    <main>
      <div className="overflow-x-auto mt-4">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-4 text-left border-b">Name</th>
              <th className="py-3 px-4 text-left border-b">Email</th>
              <th className="py-3 px-4 text-left border-b">Phone Number</th>
              <th className="py-3 px-4 text-left border-b">Details</th>
              <th className="py-3 px-4 text-left border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <React.Fragment key={index}>
                <tr className="bg-gray-50">
                  <td className="py-3 px-4 whitespace-nowrap">Ambili</td>
                  <td className="py-3 px-4 whitespace-nowrap">ambili@gmail.com</td>
                  <td className="py-3 px-4 whitespace-nowrap">468798421</td>
                  <td className="py-3 px-4 whitespace-nowrap text-blue-600">View</td>
                  <td className="py-3 px-4 whitespace-nowrap text-red-600">
                    {index % 2 === 0 ? 'Blocked' : 'Active'}
                  </td>
                </tr>
                {index !== 4 && <tr style={{ height: '12px', backgroundColor: 'white' }} />}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default UsersList;


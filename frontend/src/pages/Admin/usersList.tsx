// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { UserInterface } from '../../types/UserInterface';
// import { ADMIN_API } from '../../constants';

// const UsersList: React.FC = () => {
//   const [users, setUsers] = useState<UserInterface[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get(ADMIN_API + "/users", {
//           // headers:{
//           //   'Authorization': `Bearer ${localStorage.getItem('access_token')}` 
//           // }
//         });
//         console.log(response, "response -db");
//         if (!response) {
//           console.log("error");

//         }

//         setUsers(response.data.users);
//         console.log(response.data.users, "usersssss,db");

//       } catch (error: any) {
//         setError('Failed to fetch users');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <main>
//       <div className="overflow-x-auto mt-4">
//         <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//           <thead>
//             <tr className="bg-gray-50">
//               <th className="py-3 px-4 text-left border-b">Serial No</th>
//               <th className="py-3 px-4 text-left border-b">Name</th>
//               <th className="py-3 px-4 text-left border-b">Email</th>
//               <th className="py-3 px-4 text-left border-b">Details</th>
//               <th className="py-3 px-4 text-left border-b">Status</th>
//               <th className="py-3 px-4 text-left border-b">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id} className="bg-gray-50">
//                 <td className="py-3 px-4 whitespace-nowrap">1</td>
//                 <td className="py-3 px-4 whitespace-nowrap">{user.name}</td>
//                 <td className="py-3 px-4 whitespace-nowrap">{user.email}</td>
//                 <td className="py-3 px-4 whitespace-nowrap text-blue-600">View</td>
//                 <td className={`py-3 px-4 whitespace-nowrap ${user.isBlocked ? 'text-red-600' : 'text-green-600'}`}>
//                   {user.isBlocked ? 'Blocked' : 'Active'}
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






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserInterface } from '../../types/UserInterface';
import { ADMIN_API } from '../../constants';
import showToast from '../../utils/toaster';

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(ADMIN_API + "/users", {
          // headers:{
          //   'Authorization': `Bearer ${localStorage.getItem('access_token')}` 
          // }
        });
        setUsers(response.data.users);
      } catch (error: any) {
        showToast('Failed to fetch users');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);


  const toggleBlockStatus = async (userId: string, isBlocked: boolean) => {
    try {
      await axios.patch(`${ADMIN_API}/block-user/${userId}`, { isBlocked: !isBlocked });
      setUsers(users.map(user => user._id === userId ? { ...user, isBlocked: !isBlocked } : user));
      
    } catch (error: any) {
      showToast('Failed to update user status');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-4 text-left border-b">Serial No</th>
              <th className="py-3 px-4 text-left border-b">Name</th>
              <th className="py-3 px-4 text-left border-b">Email</th>
              <th className="py-3 px-4 text-left border-b">Details</th>
              <th className="py-3 px-4 text-left border-b">Status</th>
              <th className="py-3 px-4 text-left border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="bg-gray-50">
                <td className="py-3 px-4 whitespace-nowrap">{index + 1}</td>
                <td className="py-3 px-4 whitespace-nowrap">{user.name}</td>
                <td className="py-3 px-4 whitespace-nowrap">{user.email}</td>
                <td className="py-3 px-4 whitespace-nowrap text-blue-600">View</td>
                <td className={`py-3 px-4 whitespace-nowrap ${user.isBlocked ? 'text-red-600' : 'text-green-600'}`}>
                  {user.isBlocked ? 'Blocked' : 'Active'}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <button
                    className={`px-4 py-2 rounded-full text-white font-semibold transition-all duration-300 ease-in-out ${user.isBlocked ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                    onClick={() => toggleBlockStatus(user._id, user.isBlocked)}
                  >
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default UsersList;

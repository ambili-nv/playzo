import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { OwnerInterface } from '../../types/OwnerInterface';
import { ADMIN_API } from '../../constants';
import showToast from '../../utils/toaster';



const OwnersList: React.FC = () => {
    const [owners,setOwners] = useState<OwnerInterface[]>([]);
    const [isLoading,setIsLoading] = useState(true)
    const [error,setError] = useState<string |null>(null)


    useEffect(()=>{
        const fetchOwners = async () => {
            try {
                const response = await axios.get(ADMIN_API+ "/owners",{

                });
                setOwners(response.data.owners)
            } catch (error) {
                showToast('Failed to fetch users');
            }
        }
        fetchOwners();
    },[])


    const toggleBlockStatus = async (ownerId : string, isBlocked:boolean)=>{
        try {
            await axios.patch(`${ADMIN_API}/block-owner/${ownerId}`,{isBlocked:!isBlocked})
            setOwners(owners.map(owner => owner._id === ownerId ? {...owner,isBlocked:!isBlocked}:owner))
        } catch (error) {
            showToast('Failed to Update owner status')
        }
    }



  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-green-700 mb-4">Owners List</h1>
      <div className="overflow-x-auto mt-4 shadow-lg rounded-lg">
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr className="bg-gradient-to-r from-gray-700 to-gray-900 text-white">
              <th className="py-3 px-4 text-left border-b border-gray-200">Serial No</th>
              <th className="py-3 px-4 text-left border-b border-gray-200">Name</th>
              <th className="py-3 px-4 text-left border-b border-gray-200">Email</th>
              <th className="py-3 px-4 text-left border-b border-gray-200">Details</th>
              <th className="py-3 px-4 text-left border-b border-gray-200">Status</th>
              <th className="py-3 px-4 text-left border-b border-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {owners.map((owner, index) => (
              <tr key={owner._id} className="bg-gray-50 hover:bg-gray-100 transition-all duration-200">
                <td className="py-3 px-4 border-b border-gray-200">{index + 1}</td>
                <td className="py-3 px-4 border-b border-gray-200">{owner.name}</td>
                <td className="py-3 px-4 border-b border-gray-200">{owner.email}</td>
                <td className="py-3 px-4 border-b border-gray-200 text-blue-600 cursor-pointer hover:text-blue-800">View</td>
                <td className={`py-3 px-4 border-b border-gray-200 ${owner.isBlocked ? 'text-red-600' : 'text-green-600'}`}>
                  {owner.isBlocked ? 'Blocked' : 'Active'}
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <button
                    className={`px-4 py-2 rounded-full text-white font-semibold shadow-md transition-all duration-300 ease-in-out ${owner.isBlocked ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                    onClick={() => toggleBlockStatus(owner._id, owner.isBlocked)}
                  >
                    {owner.isBlocked ? 'Unblock' : 'Block'}
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

export default OwnersList;

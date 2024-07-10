// import React, { useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import showToast from '../../utils/toaster';
// import { OWNER_API } from '../../constants';
// import { useParams } from 'react-router-dom';
// import axiosInstance from '../../utils/axiosInstance';

// interface TimeSlot {
//   startTime: string;
//   endTime: string;
// }

// interface TimeSlotFormData {
//   startDate: string;
//   endDate: string;
//   timeSlots: TimeSlot[];
// }

// const TimeSlotManager: React.FC = () => {
//   const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([{ startTime: '', endTime: '' }]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [duplicateSlots, setDuplicateSlots] = useState<TimeSlot[]>([]);

//   const { venueId } = useParams<{ venueId: string }>();
//   console.log(venueId, "venue id on slot");

//   const formik = useFormik({
//     initialValues: {
//       startDate: '',
//       endDate: '',
//     },
//     validationSchema: Yup.object({
//       startDate: Yup.date()
//         .required('Start date is required')
//         .min(new Date(), 'Start date must be today or in the future'),
//       endDate: Yup.date()
//         .required('End date is required')
//         .min(Yup.ref('startDate'), 'End date must be after start date'),
//       timeSlots: Yup.array().of(
//         Yup.object({
//           startTime: Yup.string().required('Start time is required'),
//           endTime: Yup.string().required('End time is required'),
//         }).test('time-order', 'End time must be after start time', function (value) {
//           return value?.startTime < value?.endTime;
//         })
//       ),
//     }),
//     onSubmit: async (values) => {
//       setLoading(true);
//       try {
//         const response = await axiosInstance.post(`${OWNER_API}/add-slots/${venueId}`, { ...values, timeSlots });
//         console.log(response);

//         if (response.data.duplicateSlots.length > 0) {
//           setDuplicateSlots(response.data.duplicateSlots);
//           showToast('Some time slots already exist.', 'error');
//         } else {
//           setDuplicateSlots([]);
//           showToast('Time slots saved successfully!', 'success');
//         }
//       } catch (error) {
//         showToast('An error occurred while saving the time slots.', 'error');
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   const handleAddTimeSlot = () => {
//     setTimeSlots([...timeSlots, { startTime: '', endTime: '' }]);
//   };

//   const handleRemoveTimeSlot = (index: number) => {
//     setTimeSlots(timeSlots.filter((_, i) => i !== index));
//   };

//   const handleTimeSlotChange = (index: number, field: string, value: string) => {
//     const newTimeSlots = [...timeSlots];
//     //@ts-ignore
//     newTimeSlots[index][field] = value;
//     setTimeSlots(newTimeSlots);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 flex flex-col justify-center mt-12">
//       <div className="container mx-auto max-w-lg">
//         <div className="bg-white rounded shadow-md p-8">
//           <h2 className="text-2xl font-bold mb-4">Manage Time Slots</h2>
//           <form onSubmit={formik.handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
//                 Start Date
//               </label>
//               <input
//                 type="date"
//                 id="startDate"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 {...formik.getFieldProps('startDate')}
//               />
//               {formik.touched.startDate && formik.errors.startDate ? (
//                 <div className="text-red-500 text-sm">{formik.errors.startDate}</div>
//               ) : null}
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
//                 End Date
//               </label>
//               <input
//                 type="date"
//                 id="endDate"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 {...formik.getFieldProps('endDate')}
//               />
//               {formik.touched.endDate && formik.errors.endDate ? (
//                 <div className="text-red-500 text-sm">{formik.errors.endDate}</div>
//               ) : null}
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Time Slots
//               </label>
//               {timeSlots.map((slot, index) => (
//                 <div key={index} className="flex items-center mb-2">
//                   <div className="w-1/2 mr-2">
//                     <label className="block text-gray-700 text-sm font-bold mb-2">Start Time</label>
//                     <input
//                       type="time"
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       value={slot.startTime}
//                       onChange={(e) => handleTimeSlotChange(index, 'startTime', e.target.value)}
//                       min="01:00"
//                       max="24:00"
//                       required
//                     />
//                   </div>
//                   <div className="w-1/2">
//                     <label className="block text-gray-700 text-sm font-bold mb-2">End Time</label>
//                     <input
//                       type="time"
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       value={slot.endTime}
//                       onChange={(e) => handleTimeSlotChange(index, 'endTime', e.target.value)}
//                       min="01:00"
//                       max="24:00"
//                       required
//                     />
//                   </div>
//                   {index > 0 && (
//                     <button
//                       type="button"
//                       className="ml-2 text-red-500 hover:text-red-700"
//                       onClick={() => handleRemoveTimeSlot(index)}
//                     >
//                       Remove
//                     </button>
//                   )}
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 className="mt-2 text-blue-500 hover:text-blue-700"
//                 onClick={handleAddTimeSlot}
//               >
//                 Add Time Slot
//               </button>
//             </div>
//             <div className="flex items-center justify-between">
//               <button
//                 type="submit"
//                 className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''
//                   }`}
//                 disabled={loading}
//               >
//                 {loading ? 'Saving...' : 'Save Slots'}
//               </button>
//             </div>
//           </form>
//           {duplicateSlots.length > 0 && (
//             <div className="mt-4">
//               <h3 className="text-red-500 font-bold">Duplicate Time Slots:</h3>
//               <ul className="list-disc list-inside">
//                 {duplicateSlots.map((slot, index) => (
//                   <li key={index}>{slot.startTime} - {slot.endTime}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TimeSlotManager;







// import React, { useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import showToast from '../../utils/toaster';
// import { OWNER_API } from '../../constants';
// import { useParams } from 'react-router-dom'; // Import useParams from React Router
// import axiosInstance from '../../utils/axiosInstance';
// // TypeScript Interfaces
// interface TimeSlot {
//   startTime: string;
//   endTime: string;
// }

// interface TimeSlotFormData {
//   startDate: string;
//   endDate: string;
//   timeSlots: TimeSlot[];
// }

// const TimeSlotManager: React.FC = () => {
//   const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([{ startTime: '', endTime: '' }]);
//   const [loading, setLoading] = useState<boolean>(false);

//   // Fetch venueId using useParams
//   const { venueId } = useParams<{ venueId: string }>();
//   console.log(venueId,"venue id on slot");
  

//   const formik = useFormik({
//     initialValues: {
//       startDate: '',
//       endDate: '',
//     },
//     validationSchema: Yup.object({
//       startDate: Yup.date()
//         .required('Start date is required')
//         .min(new Date(), 'Start date must be today or in the future'),
//       endDate: Yup.date()
//         .required('End date is required')
//         .min(Yup.ref('startDate'), 'End date must be after start date'),
//       timeSlots: Yup.array().of(
//         Yup.object({
//           startTime: Yup.string().required('Start time is required'),
//           endTime: Yup.string().required('End time is required'),
//         }).test('time-order', 'End time must be after start time', function (value) {
//           return value?.startTime < value?.endTime;
//         })
//       ),
//     }),
//     onSubmit: async (values) => {
//       setLoading(true);
//       try {
//         const response = await axiosInstance.post(`${OWNER_API}/add-slots/${venueId}`, { ...values, timeSlots });
//         console.log(response);
//         showToast('Time slots saved successfully!', 'success');
//       } catch (error) {
//         showToast('An error occurred while saving the time slots.', 'error');
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   const handleAddTimeSlot = () => {
//     setTimeSlots([...timeSlots, { startTime: '', endTime: '' }]);
//   };

//   const handleRemoveTimeSlot = (index: number) => {
//     setTimeSlots(timeSlots.filter((_, i) => i !== index));
//   };

//   const handleTimeSlotChange = (index: number, field: string, value: string) => {
//     const newTimeSlots = [...timeSlots];
//     //@ts-ignore
//     newTimeSlots[index][field] = value;
//     setTimeSlots(newTimeSlots);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 flex flex-col justify-center mt-12">
//       <div className="container mx-auto max-w-lg">
//         <div className="bg-white rounded shadow-md p-8">
//           <h2 className="text-2xl font-bold mb-4">Manage Time Slots</h2>
//           <form onSubmit={formik.handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
//                 Start Date
//               </label>
//               <input
//                 type="date"
//                 id="startDate"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 {...formik.getFieldProps('startDate')}
//               />
//               {formik.touched.startDate && formik.errors.startDate ? (
//                 <div className="text-red-500 text-sm">{formik.errors.startDate}</div>
//               ) : null}
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
//                 End Date
//               </label>
//               <input
//                 type="date"
//                 id="endDate"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 {...formik.getFieldProps('endDate')}
//               />
//               {formik.touched.endDate && formik.errors.endDate ? (
//                 <div className="text-red-500 text-sm">{formik.errors.endDate}</div>
//               ) : null}
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Time Slots
//               </label>
//               {timeSlots.map((slot, index) => (
//                 <div key={index} className="flex items-center mb-2">
//                   <div className="w-1/2 mr-2">
//                     <label className="block text-gray-700 text-sm font-bold mb-2">Start Time</label>
//                     <input
//                       type="time"
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       value={slot.startTime}
//                       onChange={(e) => handleTimeSlotChange(index, 'startTime', e.target.value)}
//                       min="01:00"
//                       max="24:00"
//                       required
//                     />
//                   </div>
//                   <div className="w-1/2">
//                     <label className="block text-gray-700 text-sm font-bold mb-2">End Time</label>
//                     <input
//                       type="time"
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       value={slot.endTime}
//                       onChange={(e) => handleTimeSlotChange(index, 'endTime', e.target.value)}
//                       min="01:00"
//                       max="24:00"
//                       required
//                     />
//                   </div>
//                   {index > 0 && (
//                     <button
//                       type="button"
//                       className="ml-2 text-red-500 hover:text-red-700"
//                       onClick={() => handleRemoveTimeSlot(index)}
//                     >
//                       Remove
//                     </button>
//                   )}
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5"
//                 onClick={handleAddTimeSlot}
//               >
//                 Add Time Slot
//               </button>
//             </div>
//             <div className="flex items-center justify-center mb-4">
//               <button
//                 type="submit"
//                 className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                 disabled={loading}
//               >
//                 {loading ? 'Saving...' : 'Save Slots'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TimeSlotManager;






import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../../utils/axiosInstance';
import showToast from '../../utils/toaster';
import { OWNER_API } from '../../constants';
import { useParams } from 'react-router-dom';

// TypeScript Interfaces
interface TimeSlot {
  startTime: string;
  endTime: string;
}

interface TimeSlotFormData {
  date: string;
  timeSlots: TimeSlot[];
}

const TimeSlotManager: React.FC = () => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([{ startTime: '', endTime: '' }]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch venueId using useParams
  const { venueId } = useParams<{ venueId: string }>();
  console.log(venueId, "venue id on slot");

  const formik = useFormik({
    initialValues: {
      date: '',
    },
    validationSchema: Yup.object({
      date: Yup.date()
        .required('Date is required')
        .min(new Date(), 'Date must be today or in the future'),
      timeSlots: Yup.array().of(
        Yup.object({
          startTime: Yup.string().required('Start time is required'),
          endTime: Yup.string().required('End time is required'),
        }).test('time-order', 'End time must be after start time', function (value) {
          return value?.startTime < value?.endTime;
        })
      ),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axiosInstance.post(`${OWNER_API}/add-slots/${venueId}`, { ...values, timeSlots });
        console.log(response);
        showToast('Time slots saved successfully!', 'success');
      } catch (error) {
        showToast('An error occurred while saving the time slots.', 'error');
      } finally {
        setLoading(false);
      }
    },
  });

  const handleAddTimeSlot = () => {
    setTimeSlots([...timeSlots, { startTime: '', endTime: '' }]);
  };

  const handleRemoveTimeSlot = (index: number) => {
    setTimeSlots(timeSlots.filter((_, i) => i !== index));
  };

  const handleTimeSlotChange = (index: number, field: string, value: string) => {
    const newTimeSlots = [...timeSlots];
    //@ts-ignore
    newTimeSlots[index][field] = value;
    setTimeSlots(newTimeSlots);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col justify-center mt-12">
      <div className="container mx-auto max-w-lg">
        <div className="bg-white rounded shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">Manage Time Slots</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                Date
              </label>
              <input
                type="date"
                id="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...formik.getFieldProps('date')}
              />
              {formik.touched.date && formik.errors.date ? (
                <div className="text-red-500 text-sm">{formik.errors.date}</div>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Time Slots
              </label>
              {timeSlots.map((slot, index) => (
                <div key={index} className="flex items-center mb-2">
                  <div className="w-1/2 mr-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Start Time</label>
                    <input
                      type="time"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={slot.startTime}
                      onChange={(e) => handleTimeSlotChange(index, 'startTime', e.target.value)}
                      min="00:00"
                      max="24:00"
                      required
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">End Time</label>
                    <input
                      type="time"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={slot.endTime}
                      onChange={(e) => handleTimeSlotChange(index, 'endTime', e.target.value)}
                      min="00:00"
                      max="24:00"
                      required
                    />
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      className="ml-2 text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveTimeSlot(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5"
                onClick={handleAddTimeSlot}
              >
                Add Time Slot
              </button>
            </div>
            <div className="flex items-center justify-center mb-4">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Slots'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotManager;

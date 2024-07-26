import React, { useState, useEffect } from 'react';
import { useFormik, FormikErrors } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../../utils/axiosInstance';
import { OWNER_API } from '../../constants';
import { useParams } from 'react-router-dom';
import showToast from '../../utils/toaster';
import { Trash } from 'lucide-react';

interface TimeSlot {
  startTime: string;
  endTime: string;
  booked: boolean;
  price: string;
}

interface FormValues {
  date: string;
  timeSlots: TimeSlot[];
}

const TimeSlotManager: React.FC = () => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([{ startTime: '', endTime: '', booked: false, price: '' }]);
  const [uploadedSlots, setUploadedSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [minDate, setMinDate] = useState<string>('');

  const { venueId } = useParams<{ venueId: string }>();

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setMinDate(formattedDate);
  }, []);

  const formik = useFormik<FormValues>({
    initialValues: {
      date: '',
      timeSlots: [{
        startTime: '', endTime: '', price: '',
        booked: false
      }],
    },
    validationSchema: Yup.object({
      date: Yup.date()
        .required('Date is required')
        .min(new Date(), 'Date must be today or in the future'),
      timeSlots: Yup.array().of(
        Yup.object({
          startTime: Yup.string().required('Start time is required'),
          endTime: Yup.string().required('End time is required'),
          price: Yup.number()
            .typeError('Price must be a number')
            .positive('Price must be positive')
            .required('Price is required'),
        }).test('time-order', 'End time must be after start time', function (value) {
          return value?.startTime < value?.endTime;
        })
      ),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      setError('');
      try {
        const response = await axiosInstance.post(`${OWNER_API}/add-slots/${venueId}`, { ...values });
        resetForm();
        setTimeSlots([{ startTime: '', endTime: '', booked: false, price: '' }]);
        showToast('Time slot saved successfully!', 'success');
        fetchUploadedSlots(values.date);
      } catch (error) {
        showToast('An error occurred while saving the time slot.', 'error');
        //@ts-ignore
        setError(error.response?.data?.message || 'An error occurred while saving the time slots.');
      } finally {
        setLoading(false);
      }
    },
  });

  const handleTimeSlotChange = (index: number, field: string, value: string) => {
    const newTimeSlots = [...timeSlots];
    //@ts-ignore
    newTimeSlots[index][field] = value;
    setTimeSlots(newTimeSlots);
    formik.setFieldValue('timeSlots', newTimeSlots);
  };

  const fetchUploadedSlots = async (date: string) => {
    try {
      const response = await axiosInstance.get(`${OWNER_API}/view-slots/${venueId}/${date}`);
      setUploadedSlots(response.data.timeSlots);
    } catch (error) {
      console.error('Error fetching time slots:', error);
      setUploadedSlots([]);
    }
  };

  useEffect(() => {
    if (formik.values.date) {
      fetchUploadedSlots(formik.values.date);
    }
  }, [formik.values.date]);

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const formattedHour = hourNum % 12 || 12;
    return `${formattedHour}:${minute} ${ampm}`;
  };

  const deleteTimeSlot = async (startTime: string, endTime: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await axiosInstance.delete(`${OWNER_API}/delete-slot/${venueId}`, {
        data: {
          startTime,
          endTime,
          date: formik.values.date,
        },
      });
      showToast('Time slot deleted successfully!', 'success');
      fetchUploadedSlots(formik.values.date);
    } catch (error) {
      showToast('An error occurred while deleting the time slot.', 'error');
      //@ts-ignore
      setError(error.response?.data?.message || 'An error occurred while deleting the time slot.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col justify-center mt-12">
      <div className="container mx-auto flex">
        {/* Left Card - Slot Upload Form */}
        <div className="w-1/2 bg-white rounded shadow-md p-8 mr-4">
          <h2 className="text-2xl font-bold mb-4">Manage Time Slots</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                Date
              </label>
              <input
                type="date"
                id="date"
                min={minDate}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...formik.getFieldProps('date')}
              />
              {formik.touched.date && formik.errors.date ? (
                <div className="text-red-500 text-sm">{formik.errors.date}</div>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="timeSlots">
                Time Slots
              </label>
              {timeSlots.map((slot, index) => (
                <div key={index} className="flex mb-2 space-x-2">
                  <input
                    type="time"
                    className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={slot.startTime}
                    onChange={(e) => handleTimeSlotChange(index, 'startTime', e.target.value)}
                  />
                  <input
                    type="time"
                    className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={slot.endTime}
                    onChange={(e) => handleTimeSlotChange(index, 'endTime', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Enter Price"
                    className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={slot.price}
                    onChange={(e) => handleTimeSlotChange(index, 'price', e.target.value)}
                  />
                  {formik.touched.timeSlots && formik.errors.timeSlots && (formik.errors.timeSlots as FormikErrors<TimeSlot>[])[index]?.price ? (
                    <div className="text-red-500 text-sm">{(formik.errors.timeSlots as FormikErrors<TimeSlot>[])[index]?.price}</div>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Time Slots'}
              </button>
            </div>
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          </form>
        </div>

        {/* Right Card - Uploaded Slots */}
        <div className="w-1/2 bg-white rounded shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">Uploaded Slots</h2>
          <ul className="space-y-2">
            {uploadedSlots.length > 0 ? (
              uploadedSlots.map((slot, index) => (
                <li
                  key={index}
                  className={`flex justify-between p-4 rounded-lg border ${slot.booked ? 'bg-red-200 border-red-300' : 'bg-green-200 border-green-300'} shadow-md`}
                >
                  <span className="text-lg font-semibold">
                    {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                  </span>
                  <span className="text-lg font-semibold text-blue-600">
                    ${slot.price}
                  </span>
                  {!slot.booked && (
                    <button onClick={() => deleteTimeSlot(slot.startTime, slot.endTime)}>
                      <Trash className="w-5 h-5 text-red-600 hover:text-red-800" />
                    </button>
                  )}
                </li>
              ))
            ) : (
              <li className="text-gray-500">No time slots uploaded for the selected date.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotManager;























// import React, { useState, useEffect } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axiosInstance from '../../utils/axiosInstance';
// import { OWNER_API } from '../../constants';
// import { useParams } from 'react-router-dom';
// import showToast from '../../utils/toaster';
// import { Trash } from 'lucide-react';

// interface TimeSlot {
//   startTime: string;
//   endTime: string;
//   booked: boolean;
//   price: any;
// }

// const TimeSlotManager: React.FC = () => {
//   const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([{ startTime: '', endTime: '', booked: false, price: '' }]);
//   const [uploadedSlots, setUploadedSlots] = useState<TimeSlot[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>('');
//   const [minDate, setMinDate] = useState<string>('');

//   const { venueId } = useParams<{ venueId: string }>();

//   useEffect(() => {
//     const today = new Date();
//     const formattedDate = today.toISOString().split('T')[0];
//     setMinDate(formattedDate);
//   }, []);

//   const formik = useFormik({
//     initialValues: {
//       date: '',
//       timeSlots: [{ startTime: '', endTime: '', price: '' }],
//     },
//     validationSchema: Yup.object({
//       date: Yup.date()
//         .required('Date is required')
//         .min(new Date(), 'Date must be  or in the future'),
//       timeSlots: Yup.array().of(
//         Yup.object({
//           startTime: Yup.string().required('Start time is required'),
//           endTime: Yup.string().required('End time is required'),
//           price: Yup.number()
//             .typeError('Price must be a number')
//             .positive('Price must be positive')
//             .required('Price is required')
//             //@ts-ignore
//             .test('no-spaces', 'Price cannot contain only spaces', value => {
//               return value && value.toString().trim().length > 0;
//             }),
//         }).test('time-order', 'End time must be after start time', function (value) {
//           return value?.startTime < value?.endTime;
//         })
//       ),
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       setLoading(true);
//       setError('');
//       try {
//         const response = await axiosInstance.post(`${OWNER_API}/add-slots/${venueId}`, { ...values });
//         resetForm();
//         setTimeSlots([{ startTime: '', endTime: '', booked: false, price: '' }]);
//         showToast('Time slot saved successfully!', 'success');
//         fetchUploadedSlots(values.date);
//       } catch (error) {
//         showToast('An error occurred while saving the time slot.', 'error');
//         //@ts-ignore
//         setError(error.response?.data?.message || 'An error occurred while saving the time slots.');
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   const handleTimeSlotChange = (index: number, field: string, value: string) => {
//     const newTimeSlots = [...timeSlots];
//     //@ts-ignore
//     newTimeSlots[index][field] = value;
//     setTimeSlots(newTimeSlots);
//     formik.setFieldValue('timeSlots', newTimeSlots);
//   };

//   const fetchUploadedSlots = async (date: string) => {
//     try {
//       const response = await axiosInstance.get(`${OWNER_API}/view-slots/${venueId}/${date}`);
//       setUploadedSlots(response.data.timeSlots);
//     } catch (error) {
//       console.error('Error fetching time slots:', error);
//       setUploadedSlots([]);
//     }
//   };

//   useEffect(() => {
//     if (formik.values.date) {
//       fetchUploadedSlots(formik.values.date);
//     }
//   }, [formik.values.date]);

//   const formatTime = (time: string) => {
//     const [hour, minute] = time.split(':');
//     const hourNum = parseInt(hour);
//     const ampm = hourNum >= 12 ? 'PM' : 'AM';
//     const formattedHour = hourNum % 12 || 12;
//     return `${formattedHour}:${minute} ${ampm}`;
//   };

//   const deleteTimeSlot = async (startTime: string, endTime: string) => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axiosInstance.delete(`${OWNER_API}/delete-slot/${venueId}`, {
//         data: {
//           startTime,
//           endTime,
//           date: formik.values.date,
//         },
//       });
//       showToast('Time slot deleted successfully!', 'success');
//       fetchUploadedSlots(formik.values.date);
//     } catch (error) {
//       showToast('An error occurred while deleting the time slot.', 'error');
//       //@ts-ignore
//       setError(error.response?.data?.message || 'An error occurred while deleting the time slot.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 flex flex-col justify-center mt-12">
//       <div className="container mx-auto flex">
//         {/* Left Card - Slot Upload Form */}
//         <div className="w-1/2 bg-white rounded shadow-md p-8 mr-4">
//           <h2 className="text-2xl font-bold mb-4">Manage Time Slots</h2>
//           <form onSubmit={formik.handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
//                 Date
//               </label>
//               <input
//                 type="date"
//                 id="date"
//                 min={minDate}
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 {...formik.getFieldProps('date')}
//               />
//               {formik.touched.date && formik.errors.date ? (
//                 <div className="text-red-500 text-sm">{formik.errors.date}</div>
//               ) : null}
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="timeSlots">
//                 Time Slots
//               </label>
//               {timeSlots.map((slot, index) => (
//                 <div key={index} className="flex mb-2 space-x-2">
//                   <input
//                     type="time"
//                     className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     value={slot.startTime}
//                     onChange={(e) => handleTimeSlotChange(index, 'startTime', e.target.value)}
//                   />
//                   <input
//                     type="time"
//                     className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     value={slot.endTime}
//                     onChange={(e) => handleTimeSlotChange(index, 'endTime', e.target.value)}
//                   />
//                   <input
//                     type="number"
//                     placeholder="Enter Price"
//                     className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     value={slot.price}
//                     onChange={(e) => handleTimeSlotChange(index, 'price', e.target.value)}
//                   />
//                   {formik.touched.timeSlots && formik.errors.timeSlots && formik.errors.timeSlots[index]?.price ? (
//                     <div className="text-red-500 text-sm">{formik.errors.timeSlots[index].price}</div>
//                   ) : null}
//                 </div>
//               ))}
//             </div>
//             <div className="flex items-center justify-between">
//               <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                 type="submit"
//                 disabled={loading}
//               >
//                 {loading ? 'Saving...' : 'Save Time Slots'}
//               </button>
//             </div>
//             {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
//           </form>
//         </div>

//         {/* Right Card - Uploaded Slots */}
//         <div className="w-1/2 bg-white rounded shadow-md p-8">
//           <h2 className="text-2xl font-bold mb-4">Uploaded Slots</h2>
//           <ul className="space-y-2">
//             {uploadedSlots.length > 0 ? (
//               uploadedSlots.map((slot, index) => (
//                 <li
//                   key={index}
//                   className={`flex justify-between p-4 rounded-lg border ${slot.booked ? 'bg-red-200 border-red-300' : 'bg-green-200 border-green-300'} shadow-md`}
//                 >
//                   <span className="text-lg font-semibold">
//                     {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
//                   </span>
//                   <span className="text-lg font-semibold text-blue-600">
//                     ${slot.price}
//                   </span>
//                   {!slot.booked && (
//                     <button onClick={() => deleteTimeSlot(slot.startTime, slot.endTime)} className="text-red-500 hover:text-red-700">
//                       <Trash size={20} />
//                     </button>
//                   )}
//                 </li>
//               ))
//             ) : (
//               <p className="text-gray-700">No slots uploaded for this date.</p>
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TimeSlotManager;



























// import React, { useState, useEffect } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axiosInstance from '../../utils/axiosInstance';
// import { OWNER_API } from '../../constants';
// import { useParams } from 'react-router-dom';
// import showToast from '../../utils/toaster';
// import { Trash } from 'lucide-react';

// interface TimeSlot {
//   startTime: string;
//   endTime: string;
//   booked: boolean;
//   price: string;
// }

// const TimeSlotManager: React.FC = () => {
//   const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([{ startTime: '', endTime: '', booked: false, price: '' }]);
//   const [uploadedSlots, setUploadedSlots] = useState<TimeSlot[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>('');
//   const [minDate, setMinDate] = useState<string>('');

//   const { venueId } = useParams<{ venueId: string }>();

//   useEffect(() => {
//     const today = new Date();
//     const formattedDate = today.toISOString().split('T')[0];
//     setMinDate(formattedDate);
//   }, []);

//   const formik = useFormik({
//     initialValues: {
//       date: '',
//       timeSlots: [{ startTime: '', endTime: '', price: '' }],
//     },
//     validationSchema: Yup.object({
//       date: Yup.date()
//         .required('Date is required')
//         .min(new Date(), 'Date must be today or in the future'),
//       timeSlots: Yup.array().of(
//         Yup.object({
//           startTime: Yup.string().required('Start time is required'),
//           endTime: Yup.string().required('End time is required'),
//           price: Yup.number()
//             .typeError('Price must be a number')
//             .positive('Price must be positive')
//             .required('Price is required'),
//         }).test('time-order', 'End time must be after start time', function (value) {
//           return value?.startTime < value?.endTime;
//         })
//       ),
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       setLoading(true);
//       setError('');
//       try {
//         const response = await axiosInstance.post(`${OWNER_API}/add-slots/${venueId}`, { ...values });
//         resetForm();
//         setTimeSlots([{ startTime: '', endTime: '', booked: false, price: '' }]);
//         showToast('Time slot saved successfully!', 'success');
//         fetchUploadedSlots(values.date);
//       } catch (error) {
//         showToast('An error occurred while saving the time slot.', 'error');
//         //@ts-ignore
//         setError(error.response?.data?.message || 'An error occurred while saving the time slots.');
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   const handleTimeSlotChange = (index: number, field: string, value: string) => {
//     const newTimeSlots = [...timeSlots];
//     //@ts-ignore
//     newTimeSlots[index][field] = value;
//     setTimeSlots(newTimeSlots);
//     formik.setFieldValue('timeSlots', newTimeSlots);
//   };

//   const fetchUploadedSlots = async (date: string) => {
//     try {
//       const response = await axiosInstance.get(`${OWNER_API}/view-slots/${venueId}/${date}`);
//       setUploadedSlots(response.data.timeSlots);
//     } catch (error) {
//       console.error('Error fetching time slots:', error);
//       setUploadedSlots([]);
//     }
//   };

//   useEffect(() => {
//     if (formik.values.date) {
//       fetchUploadedSlots(formik.values.date);
//     }
//   }, [formik.values.date]);

//   const formatTime = (time: string) => {
//     const [hour, minute] = time.split(':');
//     const hourNum = parseInt(hour);
//     const ampm = hourNum >= 12 ? 'PM' : 'AM';
//     const formattedHour = hourNum % 12 || 12;
//     return `${formattedHour}:${minute} ${ampm}`;
//   };

//   const deleteTimeSlot = async (startTime: string, endTime: string) => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axiosInstance.delete(`${OWNER_API}/delete-slot/${venueId}`, {
//         data: {
//           startTime,
//           endTime,
//           date: formik.values.date,
//         },
//       });
//       showToast('Time slot deleted successfully!', 'success');
//       fetchUploadedSlots(formik.values.date);
//     } catch (error) {
//       showToast('An error occurred while deleting the time slot.', 'error');
//       //@ts-ignore
//       setError(error.response?.data?.message || 'An error occurred while deleting the time slot.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 flex flex-col justify-center mt-12">
//       <div className="container mx-auto flex">
//         {/* Left Card - Slot Upload Form */}
//         <div className="w-1/2 bg-white rounded shadow-md p-8 mr-4">
//           <h2 className="text-2xl font-bold mb-4">Manage Time Slots</h2>
//           <form onSubmit={formik.handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
//                 Date
//               </label>
//               <input
//                 type="date"
//                 id="date"
//                 min={minDate}
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 {...formik.getFieldProps('date')}
//               />
//               {formik.touched.date && formik.errors.date ? (
//                 <div className="text-red-500 text-sm">{formik.errors.date}</div>
//               ) : null}
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="timeSlots">
//                 Time Slots
//               </label>
//               {timeSlots.map((slot, index) => (
//                 <div key={index} className="flex mb-2 space-x-2">
//                   <input
//                     type="time"
//                     className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     value={slot.startTime}
//                     onChange={(e) => handleTimeSlotChange(index, 'startTime', e.target.value)}
//                   />
//                   <input
//                     type="time"
//                     className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     value={slot.endTime}
//                     onChange={(e) => handleTimeSlotChange(index, 'endTime', e.target.value)}
//                   />
//                   <input
//                     type="number"
//                     placeholder="Enter Price"
//                     className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     value={slot.price}
//                     onChange={(e) => handleTimeSlotChange(index, 'price', e.target.value)}
//                   />
//                 </div>
//               ))}
//               {formik.touched.timeSlots && formik.errors.timeSlots ? (
//                 <div className="text-red-500 text-sm">{(formik.errors.timeSlots as any)[0]?.startTime}</div>
//               ) : null}
//             </div>
//             <div className="flex items-center justify-between">
//               <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                 type="submit"
//                 disabled={loading}
//               >
//                 {loading ? 'Saving...' : 'Save Time Slots'}
//               </button>
//             </div>
//             {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
//           </form>
//         </div>

//         {/* Right Card - Uploaded Slots */}
//         <div className="w-1/2 bg-white rounded shadow-md p-8">
//           <h2 className="text-2xl font-bold mb-4">Uploaded Slots</h2>
//           <ul className="space-y-2">
//             {uploadedSlots.length > 0 ? (
//               uploadedSlots.map((slot, index) => (
//                 <li
//                   key={index}
//                   className={`flex justify-between p-4 rounded-lg border ${slot.booked ? 'bg-red-200 border-red-300' : 'bg-green-200 border-green-300'} shadow-md`}
//                 >
//                   <span className="text-lg font-semibold">
//                     {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
//                   </span>
//                   <span className="text-lg font-semibold text-blue-600">
//                     ${slot.price}
//                   </span>
//                   {!slot.booked && (
//                     <button onClick={() => deleteTimeSlot(slot.startTime, slot.endTime)}>
//                       <Trash className="w-6 h-6 text-red-500 hover:text-red-700" />
//                     </button>
//                   )}
//                 </li>
//               ))
//             ) : (
//               <li className="text-gray-500">No slots uploaded for this date.</li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TimeSlotManager;















































































































































// import React, { useState, useEffect } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axiosInstance from '../../utils/axiosInstance';
// import { OWNER_API } from '../../constants';
// import { useParams } from 'react-router-dom';
// import showToast from '../../utils/toaster';
// import { Trash } from 'lucide-react';

// interface TimeSlot {
//   startTime: string;
//   endTime: string;
//   booked: boolean;
//   price: string;
// }

// const TimeSlotManager: React.FC = () => {
//   const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([{ startTime: '', endTime: '', booked: false, price: '' }]);
//   const [uploadedSlots, setUploadedSlots] = useState<TimeSlot[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>('');
//   const [minDate, setMinDate] = useState<string>('');

//   const { venueId } = useParams<{ venueId: string }>();

//   useEffect(() => {
//     // Calculate the current date in YYYY-MM-DD format
//     const today = new Date();
//     const formattedDate = today.toISOString().split('T')[0];
//     setMinDate(formattedDate);
//   }, []);

//   const formik = useFormik({
//     initialValues: {
//       date: '',
//       timeSlots: [{ startTime: '', endTime: '', price: '' }],
//     },
//     validationSchema: Yup.object({
//       date: Yup.date()
//         .required('Date is required')
//         .min(new Date(), 'Date must be today or in the future'),
//       timeSlots: Yup.array().of(
//         Yup.object({
//           startTime: Yup.string().required('Start time is required'),
//           endTime: Yup.string().required('End time is required'),
//           price: Yup.number()
//             .typeError('Price must be a number')
//             .positive('Price must be positive')
//             .required('Price is required'),
//         }).test('time-order', 'End time must be after start time', function (value) {
//           return value?.startTime < value?.endTime;
//         })
//       ),
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       setLoading(true);
//       setError('');
//       try {
//         const response = await axiosInstance.post(`${OWNER_API}/add-slots/${venueId}`, { ...values });
//         resetForm();
//         setTimeSlots([{ startTime: '', endTime: '', booked: false, price: '' }]);
//         showToast('Time slot saved successfully!', 'success');
//         fetchUploadedSlots(values.date); // Fetch the updated slots after adding a new one
//       } catch (error) {
//         showToast('An error occurred while saving the time slot.', 'error');
//         //@ts-ignore
//         setError(error.response?.data?.message || 'An error occurred while saving the time slots.');
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   const handleTimeSlotChange = (index: number, field: string, value: string) => {
//     const newTimeSlots = [...timeSlots];
//     //@ts-ignore
//     newTimeSlots[index][field] = value;
//     setTimeSlots(newTimeSlots);
//     formik.setFieldValue('timeSlots', newTimeSlots);
//   };

//   const fetchUploadedSlots = async (date: string) => {
//     try {
//       const response = await axiosInstance.get(`${OWNER_API}/view-slots/${venueId}/${date}`);
//       setUploadedSlots(response.data.timeSlots);
//     } catch (error) {
//       console.error('Error fetching time slots:', error);
//       setUploadedSlots([]);
//     }
//   };

//   useEffect(() => {
//     if (formik.values.date) {
//       fetchUploadedSlots(formik.values.date);
//     }
//   }, [formik.values.date]);

//   const formatTime = (time: string) => {
//     const [hour, minute] = time.split(':');
//     const hourNum = parseInt(hour);
//     const ampm = hourNum >= 12 ? 'PM' : 'AM';
//     const formattedHour = hourNum % 12 || 12;
//     return `${formattedHour}:${minute} ${ampm}`;
//   };

//   const deleteTimeSlot = async (startTime: string, endTime: string) => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axiosInstance.delete(`${OWNER_API}/delete-slot/${venueId}`, {
//         data: {
//           startTime,
//           endTime,
//           date: formik.values.date,
//         },
//       });

//       showToast('Time slot deleted successfully!', 'success');
//       fetchUploadedSlots(formik.values.date); // Fetch the updated slots after deletion
//     } catch (error) {
//       showToast('An error occurred while deleting the time slot.', 'error');
//       //@ts-ignore
//       setError(error.response?.data?.message || 'An error occurred while deleting the time slot.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 flex flex-col justify-center mt-12">
//       <div className="container mx-auto flex">
//         {/* Left Card - Slot Upload Form */}
//         <div className="w-1/2 bg-white rounded shadow-md p-8 mr-4">
//           <h2 className="text-2xl font-bold mb-4">Manage Time Slots</h2>
//           <form onSubmit={formik.handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
//                 Date
//               </label>
//               <input
//                 type="date"
//                 id="date"
//                 min={minDate} // Set the min attribute to disable past dates
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 {...formik.getFieldProps('date')}
//               />
//               {formik.touched.date && formik.errors.date ? (
//                 <div className="text-red-500 text-sm">{formik.errors.date}</div>
//               ) : null}
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="timeSlots">
//                 Time Slots
//               </label>
//               {timeSlots.map((slot, index) => (
//                 <div key={index} className="flex mb-2">
//                   <input
//                     type="time"
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
//                     value={slot.startTime}
//                     onChange={(e) => handleTimeSlotChange(index, 'startTime', e.target.value)}
//                   />
//                   <input
//                     type="time"
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
//                     value={slot.endTime}
//                     onChange={(e) => handleTimeSlotChange(index, 'endTime', e.target.value)}
//                   />
//                   <input
//                     type="number"
//                     placeholder=" Enter Price"
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     value={slot.price}
//                     onChange={(e) => handleTimeSlotChange(index, 'price', e.target.value)}
//                   />
//                 </div>
//               ))}
//               {formik.touched.timeSlots && formik.errors.timeSlots ? (
//                 <div className="text-red-500 text-sm">{(formik.errors.timeSlots as any)[0]?.startTime}</div>
//               ) : null}
//             </div>
//             <div className="flex items-center justify-between">
//               <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                 type="submit"
//                 disabled={loading}
//               >
//                 {loading ? 'Saving...' : 'Save Time Slots'}
//               </button>
//             </div>
//             {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
//           </form>
//         </div>

//         {/* Right Card - Uploaded Slots */}
//         <div className="w-1/2 bg-white rounded shadow-md p-8">
//           <h2 className="text-2xl font-bold mb-4">Uploaded Slots</h2>
//           <ul className="space-y-2">
//             {uploadedSlots.length > 0 ? (
//               uploadedSlots.map((slot, index) => (
//                 <li
//                   key={index}
//                   className={`flex justify-between p-2 rounded ${slot.booked ? 'bg-red-200' : 'bg-green-200'}`}
//                 >
//                   <span>
//                     {formatTime(slot.startTime)} - {formatTime(slot.endTime)} - ${slot.price}
//                   </span>
//                   {!slot.booked && (
//                     <button onClick={() => deleteTimeSlot(slot.startTime, slot.endTime)}>
//                       <Trash className="w-5 h-5 text-red-500" />
//                     </button>
//                   )}
//                 </li>
//               ))
//             ) : (
//               <li>No slots uploaded for this date.</li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TimeSlotManager;































// import React, { useState, useEffect } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axiosInstance from '../../utils/axiosInstance';
// import { OWNER_API } from '../../constants';
// import { useParams } from 'react-router-dom';
// import showToast from '../../utils/toaster';
// import { Trash } from 'lucide-react';

// interface TimeSlot {
//   startTime: string;
//   endTime: string;
//   booked: boolean;
// }

// const TimeSlotManager: React.FC = () => {
//   const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([{ startTime: '', endTime: '', booked: false }]);
//   const [uploadedSlots, setUploadedSlots] = useState<TimeSlot[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>('');
//   const [minDate, setMinDate] = useState<string>('');

//   const { venueId } = useParams<{ venueId: string }>();

//   useEffect(() => {
//     // Calculate the current date in YYYY-MM-DD format
//     const today = new Date();
//     const formattedDate = today.toISOString().split('T')[0];
//     setMinDate(formattedDate);
//   }, []);

//   const formik = useFormik({
//     initialValues: {
//       date: '',
//       timeSlots: [{ startTime: '', endTime: '' }],
//     },
//     validationSchema: Yup.object({
//       date: Yup.date()
//         .required('Date is required')
//         .min(new Date(), 'Date must be today or in the future'),
//       timeSlots: Yup.array().of(
//         Yup.object({
//           startTime: Yup.string().required('Start time is required'),
//           endTime: Yup.string().required('End time is required'),
//         }).test('time-order', 'End time must be after start time', function (value) {
//           return value?.startTime < value?.endTime;
//         })
//       ),
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       setLoading(true);
//       setError('');
//       try {
//         const response = await axiosInstance.post(`${OWNER_API}/add-slots/${venueId}`, { ...values });
//         resetForm();
//         setTimeSlots([{
//           startTime: '', endTime: '',
//           booked: false
//         }]);
//         showToast('Time slot saved successfully!', 'success');
//         fetchUploadedSlots(values.date); // Fetch the updated slots after adding a new one
//       } catch (error) {
//         showToast('An error occurred while saving the time slot.', 'error');
//         //@ts-ignore
//         setError(error.response?.data?.message || 'An error occurred while saving the time slots.');
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   const handleTimeSlotChange = (index: number, field: string, value: string) => {
//     const newTimeSlots = [...timeSlots];
//     //@ts-ignore
//     newTimeSlots[index][field] = value;
//     setTimeSlots(newTimeSlots);
//     formik.setFieldValue('timeSlots', newTimeSlots);
//   };

//   const fetchUploadedSlots = async (date: string) => {
//     try {
//       const response = await axiosInstance.get(`${OWNER_API}/view-slots/${venueId}/${date}`);
//       setUploadedSlots(response.data.timeSlots);
//     } catch (error) {
//       console.error('Error fetching time slots:', error);
//       setUploadedSlots([]);
//     }
//   };
  
//   useEffect(() => {
//     if (formik.values.date) {
//       fetchUploadedSlots(formik.values.date);
//     }
//   }, [formik.values.date]);

//   const formatTime = (time: string) => {
//     const [hour, minute] = time.split(':');
//     const hourNum = parseInt(hour);
//     const ampm = hourNum >= 12 ? 'PM' : 'AM';
//     const formattedHour = hourNum % 12 || 12;
//     return `${formattedHour}:${minute} ${ampm}`;
//   };

//   const deleteTimeSlot = async (startTime: string, endTime: string) => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axiosInstance.delete(`${OWNER_API}/delete-slot/${venueId}`, {
//         data: {
//           startTime,
//           endTime,
//           date: formik.values.date,
//         },
//       });

//       showToast('Time slot deleted successfully!', 'success');
//       fetchUploadedSlots(formik.values.date); // Fetch the updated slots after deletion
//     } catch (error) {
//       showToast('An error occurred while deleting the time slot.', 'error');
//       //@ts-ignore
//       setError(error.response?.data?.message || 'An error occurred while deleting the time slot.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 flex flex-col justify-center mt-12">
//       <div className="container mx-auto flex">
//         {/* Left Card - Slot Upload Form */}
//         <div className="w-1/2 bg-white rounded shadow-md p-8 mr-4">
//           <h2 className="text-2xl font-bold mb-4">Manage Time Slots</h2>
//           <form onSubmit={formik.handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
//                 Date
//               </label>
//               <input
//                 type="date"
//                 id="date"
//                 min={minDate} // Set the min attribute to disable past dates
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 {...formik.getFieldProps('date')}
//               />
//               {formik.touched.date && formik.errors.date ? (
//                 <div className="text-red-500 text-sm">{formik.errors.date}</div>
//               ) : null}
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="timeSlots">
//                 Time Slots
//               </label>
//               {timeSlots.map((slot, index) => (
//                 <div key={index} className="flex mb-2">
//                   <input
//                     type="time"
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
//                     value={slot.startTime}
//                     onChange={(e) => handleTimeSlotChange(index, 'startTime', e.target.value)}
//                   />
//                   <input
//                     type="time"
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     value={slot.endTime}
//                     onChange={(e) => handleTimeSlotChange(index, 'endTime', e.target.value)}
//                   />
//                 </div>
//               ))}
//               {formik.touched.timeSlots && formik.errors.timeSlots ? (
//                 <div className="text-red-500 text-sm">{(formik.errors.timeSlots as any)[0]?.startTime}</div>
//               ) : null}
//             </div>
//             <div className="flex items-center justify-between">
//               <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                 type="submit"
//                 disabled={loading}
//               >
//                 {loading ? 'Saving...' : 'Save Time Slots'}
//               </button>
//             </div>
//             {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
//           </form>
//         </div>

//         {/* Right Card - Uploaded Slots */}
//         <div className="w-1/2 bg-white rounded shadow-md p-8">
//           <h2 className="text-2xl font-bold mb-4">Uploaded Slots</h2>
//           <ul className="space-y-2">
//             {uploadedSlots.length > 0 ? (
//               uploadedSlots.map((slot, index) => (
//                 <li
//                   key={index}
//                   className={`flex justify-between p-2 rounded ${slot.booked ? 'bg-red-200' : 'bg-green-200'}`}
//                 >
//                   <span>
//                     {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
//                   </span>
//                   {!slot.booked && (
//                     <button onClick={() => deleteTimeSlot(slot.startTime, slot.endTime)} className="text-red-500 hover:text-red-700">
//                       <Trash className="h-5 w-5" />
//                     </button>
//                   )}
//                 </li>
//               ))
//             ) : (
//               <li>No slots uploaded for the selected date.</li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TimeSlotManager;


















// // import React, { useState, useEffect } from 'react';
// // import { useFormik } from 'formik';
// // import * as Yup from 'yup';
// // import axiosInstance from '../../utils/axiosInstance';
// // import { OWNER_API } from '../../constants';
// // import { useParams } from 'react-router-dom';
// // import showToast from '../../utils/toaster';
// // import { Trash } from 'lucide-react';

// // interface TimeSlot {
// //   startTime: string;
// //   endTime: string;
// //   booked: boolean;
// // }

// // const TimeSlotManager: React.FC = () => {
// //   const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([{ startTime: '', endTime: '', booked: false }]);
// //   const [uploadedSlots, setUploadedSlots] = useState<TimeSlot[]>([]);
// //   const [loading, setLoading] = useState<boolean>(false);
// //   const [error, setError] = useState<string>('');

// //   const { venueId } = useParams<{ venueId: string }>();

// //   const formik = useFormik({
// //     initialValues: {
// //       date: '',
// //       timeSlots: [{ startTime: '', endTime: '' }],
// //     },
// //     validationSchema: Yup.object({
// //       date: Yup.date()
// //         .required('Date is required')
// //         .min(new Date(), 'Date must be today or in the future'),
// //       timeSlots: Yup.array().of(
// //         Yup.object({
// //           startTime: Yup.string().required('Start time is required'),
// //           endTime: Yup.string().required('End time is required'),
// //         }).test('time-order', 'End time must be after start time', function (value) {
// //           return value?.startTime < value?.endTime;
// //         })
// //       ),
// //     }),
// //     onSubmit: async (values, { resetForm }) => {
// //       setLoading(true);
// //       setError('');
// //       try {
// //         const response = await axiosInstance.post(`${OWNER_API}/add-slots/${venueId}`, { ...values });
// //         resetForm();
// //         setTimeSlots([{
// //           startTime: '', endTime: '',
// //           booked: false
// //         }]);
// //         showToast('Time slot saved successfully!', 'success');
// //         fetchUploadedSlots(values.date); // Fetch the updated slots after adding a new one
// //       } catch (error) {
// //         showToast('An error occurred while saving the time slot.', 'error');
// //         //@ts-ignore
// //         setError(error.response?.data?.message || 'An error occurred while saving the time slots.');
// //       } finally {
// //         setLoading(false);
// //       }
// //     },
// //   });

// //   const handleTimeSlotChange = (index: number, field: string, value: string) => {
// //     const newTimeSlots = [...timeSlots];
// //     //@ts-ignore
// //     newTimeSlots[index][field] = value;
// //     setTimeSlots(newTimeSlots);
// //     formik.setFieldValue('timeSlots', newTimeSlots);
// //   };

// //   const fetchUploadedSlots = async (date: string) => {
// //     try {
// //       const response = await axiosInstance.get(`${OWNER_API}/view-slots/${venueId}/${date}`);
// //       setUploadedSlots(response.data.timeSlots);
// //     } catch (error) {
// //       console.error('Error fetching time slots:', error);
// //       setUploadedSlots([]);
// //     }
// //   };
  
// //   useEffect(() => {
// //     if (formik.values.date) {
// //       fetchUploadedSlots(formik.values.date);
// //     }
// //   }, [formik.values.date]);

// //   const formatTime = (time: string) => {
// //     const [hour, minute] = time.split(':');
// //     const hourNum = parseInt(hour);
// //     const ampm = hourNum >= 12 ? 'PM' : 'AM';
// //     const formattedHour = hourNum % 12 || 12;
// //     return `${formattedHour}:${minute} ${ampm}`;
// //   };

// //   const deleteTimeSlot = async (startTime: string, endTime: string) => {
// //     setLoading(true);
// //     setError('');
// //     try {
// //       const response = await axiosInstance.delete(`${OWNER_API}/delete-slot/${venueId}`, {
// //         data: {
// //           startTime,
// //           endTime,
// //           date: formik.values.date,
// //         },
// //       });

// //       showToast('Time slot deleted successfully!', 'success');
// //       fetchUploadedSlots(formik.values.date); // Fetch the updated slots after deletion
// //     } catch (error) {
// //       showToast('An error occurred while deleting the time slot.', 'error');
// //       //@ts-ignore
// //       setError(error.response?.data?.message || 'An error occurred while deleting the time slot.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 p-6 flex flex-col justify-center mt-12">
// //       <div className="container mx-auto flex">
// //         {/* Left Card - Slot Upload Form */}
// //         <div className="w-1/2 bg-white rounded shadow-md p-8 mr-4">
// //           <h2 className="text-2xl font-bold mb-4">Manage Time Slots</h2>
// //           <form onSubmit={formik.handleSubmit}>
// //             <div className="mb-4">
// //               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
// //                 Date
// //               </label>
// //               <input
// //                 type="date"
// //                 id="date"
// //                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
// //                 {...formik.getFieldProps('date')}
// //               />
// //               {formik.touched.date && formik.errors.date ? (
// //                 <div className="text-red-500 text-sm">{formik.errors.date}</div>
// //               ) : null}
// //             </div>
// //             <div className="mb-4">
// //               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="timeSlots">
// //                 Time Slots
// //               </label>
// //               {timeSlots.map((slot, index) => (
// //                 <div key={index} className="flex mb-2">
// //                   <input
// //                     type="time"
// //                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
// //                     value={slot.startTime}
// //                     onChange={(e) => handleTimeSlotChange(index, 'startTime', e.target.value)}
// //                   />
// //                   <input
// //                     type="time"
// //                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
// //                     value={slot.endTime}
// //                     onChange={(e) => handleTimeSlotChange(index, 'endTime', e.target.value)}
// //                   />
// //                 </div>
// //               ))}
// //               {formik.touched.timeSlots && formik.errors.timeSlots ? (
// //                 <div className="text-red-500 text-sm">{(formik.errors.timeSlots as any)[0]?.startTime}</div>
// //               ) : null}
// //             </div>
// //             <div className="flex items-center justify-between">
// //               <button
// //                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
// //                 type="submit"
// //                 disabled={loading}
// //               >
// //                 {loading ? 'Saving...' : 'Save Time Slots'}
// //               </button>
// //             </div>
// //             {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
// //           </form>
// //         </div>

// //         {/* Right Card - Uploaded Slots */}
// //         <div className="w-1/2 bg-white rounded shadow-md p-8">
// //           <h2 className="text-2xl font-bold mb-4">Uploaded Slots</h2>
// //           <ul className="space-y-2">
// //             {uploadedSlots.length > 0 ? (
// //               uploadedSlots.map((slot, index) => (
// //                 <li
// //                   key={index}
// //                   className={`flex justify-between p-2 rounded ${slot.booked ? 'bg-red-200' : 'bg-green-200'}`}
// //                 >
// //                   <span>
// //                     {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
// //                   </span>
// //                   {!slot.booked && (
// //                     <button onClick={() => deleteTimeSlot(slot.startTime, slot.endTime)} className="text-red-500 hover:text-red-700">
// //                       <Trash className="h-5 w-5" />
// //                     </button>
// //                   )}
// //                 </li>
// //               ))
// //             ) : (
// //               <li>No slots uploaded for the selected date.</li>
// //             )}
// //           </ul>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TimeSlotManager;








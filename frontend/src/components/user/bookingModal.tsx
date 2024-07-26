import React, { useState, useEffect } from 'react';
import { USER_API } from '../../constants';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import showToast from '../../utils/toaster';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  venueId: string;
}

interface Slot {
  _id: string;
  startTime: string;
  endTime: string;
  price: number;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, venueId }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const navigate = useNavigate();

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hoursNum = parseInt(hours, 10);
    const period = hoursNum >= 12 ? 'PM' : 'AM';
    const adjustedHours = hoursNum % 12 || 12;
    return `${adjustedHours}:${minutes} ${period}`;
  };

  useEffect(() => {
    if (selectedDate) {
      console.log(selectedDate,"date");
      
      const fetchAvailableSlots = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${USER_API}/get-slots/${venueId}/${selectedDate}`);
          console.log(response.data,"");
          
          setAvailableSlots(response.data.timeSlots);
        } catch (err) {
          setError('Error fetching available slots');
        } finally {
          setLoading(false);
        }
      };

      fetchAvailableSlots();
    }
  }, [selectedDate, venueId]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleSlotSelection = (slot: Slot) => {
    setSelectedSlot(slot);
    setStep(2);
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  const handleBooking = async () => {
    if (!selectedSlot || !paymentMethod) {
      setError('Please select a payment method');
      return;
    }

    if (paymentMethod === 'wallet') {
      try {
        const response = await axiosInstance.post(`${USER_API}/wallet-payment`, {
          venueId,
          slotId: selectedSlot._id,
          date: selectedDate,
          startTime: selectedSlot.startTime,
          endTime: selectedSlot.endTime,
          fees: selectedSlot.price,
          paymentStatus: "pending",
          bookingStatus: "pending",
        });

        console.log(response.data,"wallet res");
        

        if (response.data) {
          navigate(`/payment_status/${response.data.booking._id}?success=true`);
        } else {
       
        }
        setError(response.data.message);
      } catch (err) {
        // setError(response.data.message);
        // setError('Error processing payment with wallet');
        if (axios.isAxiosError(err) && err.response) {
          showToast(err.response.data.message, 'error');
        } 
      }
    } else if (paymentMethod === 'stripe') {
      const stripe = await loadStripe('pk_test_51PaimnG8EaTCVCc3V37VRPWK4CHnrsjvdwOmKNyu6SZYIUJGBzPSJIuROfma8eqnXpQfQTOmBonXaPtiCUZBCFkx00OxC7tApr');

      try {
        const response = await axiosInstance.post(`${USER_API}/create-checkout-session`, {
          venueId,
          slotId: selectedSlot._id,
          date: selectedDate,
          startTime: selectedSlot.startTime,
          endTime: selectedSlot.endTime,
          fees: selectedSlot.price,
          paymentStatus: "pending",
          bookingStatus: "pending",
        });

        if (response.data.sessionId) {
          //@ts-ignore
          const result = await stripe.redirectToCheckout({ sessionId: response.data.sessionId });

          if (result.error) {
            setError('Failed to initiate payment');
          } else {
            // Update slot status to booked
            await axiosInstance.post(`${USER_API}/update-slot-status`, {
              slotId: selectedSlot._id,
              status: 'booked'
            });

            const bookingId = response.data.booking.bookingId;
            navigate(`/payment_status/${bookingId}?success=true`);
          }
        }
      } catch (err) {
        setError('Error processing payment');
        const response = await axiosInstance.post(`${USER_API}/payment-failure`, {
          venueId,
          slotId: selectedSlot._id,
          date: selectedDate,
          startTime: selectedSlot.startTime,
          endTime: selectedSlot.endTime,
          fees: selectedSlot.price,
          paymentStatus: "failed",
          bookingStatus: "pending",
        });
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">Book a Slot</h2>
            <div className="mb-4">
              <label htmlFor="date" className="block text-lg font-semibold mb-2">
                Select Date:
              </label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            {loading ? (
              <div className="text-center">Loading available slots...</div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : (
              <div className="space-y-4">
                {availableSlots.length > 0 ? (
                  availableSlots.map((slot) => (
                    <div
                      key={slot._id}
                      className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex justify-between items-center bg-gray-50"
                    >
                      <div>
                        <p className="text-lg font-semibold">{formatTime(slot.startTime)} - {formatTime(slot.endTime)}</p>
                        <p className="text-sm text-gray-600">${slot.price}</p>
                      </div>
                      <button
                        onClick={() => handleSlotSelection(slot)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
                      >
                        Select Slot
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500">No available slots for the selected date</div>
                )}
              </div>
            )}
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">Select Payment Method</h2>
            <div className="space-y-4">
              <div>
                <input
                  type="radio"
                  id="wallet"
                  name="paymentMethod"
                  value="wallet"
                  onChange={() => handlePaymentMethodChange('wallet')}
                />
                <label htmlFor="wallet" className="ml-2 text-lg">Wallet</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="stripe"
                  name="paymentMethod"
                  value="stripe"
                  onChange={() => handlePaymentMethodChange('stripe')}
                />
                <label htmlFor="stripe" className="ml-2 text-lg">Stripe</label>
              </div>
            </div>
            {error && <div className="text-center text-red-500">{error}</div>}
            <div className="mt-4 text-right">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition-all duration-300 mr-2"
              >
                Back
              </button>
              <button
                onClick={handleBooking}
                className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all duration-300"
              >
                Confirm Booking
              </button>
            </div>
          </>
        )}

        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;

















// import React, { useState, useEffect } from 'react';
// import { USER_API } from '../../constants';
// import axios from 'axios';
// import { loadStripe } from '@stripe/stripe-js';
// import axiosInstance from '../../utils/axiosInstance';
// import { useNavigate } from 'react-router-dom';

// interface BookingModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   venueId: string;
// }

// interface Slot {
//   _id: string;
//   startTime: string;
//   endTime: string;
//   price: number;
// }

// const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, venueId }) => {
//   const [selectedDate, setSelectedDate] = useState('');
//   const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const formatTime = (time: string) => {
//     const [hours, minutes] = time.split(':');
//     const hoursNum = parseInt(hours, 10);
//     const period = hoursNum >= 12 ? 'PM' : 'AM';
//     const adjustedHours = hoursNum % 12 || 12;
//     return `${adjustedHours}:${minutes} ${period}`;
//   };

//   useEffect(() => {
//     if (selectedDate) {
//       const fetchAvailableSlots = async () => {
//         setLoading(true);
//         try {
//           const response = await axios.get(`${USER_API}/get-slots/${venueId}/${selectedDate}`);
//           setAvailableSlots(response.data.timeSlots);
//         } catch (err) {
//           setError('Error fetching available slots');
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchAvailableSlots();
//     }
//   }, [selectedDate, venueId]);

//   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedDate(e.target.value);
//   };

//   const handleBooking = async (slot: Slot) => {
//     const stripe = await loadStripe('pk_test_51PaimnG8EaTCVCc3V37VRPWK4CHnrsjvdwOmKNyu6SZYIUJGBzPSJIuROfma8eqnXpQfQTOmBonXaPtiCUZBCFkx00OxC7tApr');

//     try {
//       const response = await axiosInstance.post(`${USER_API}/create-checkout-session`, {
//         venueId,
//         slotId: slot._id,
//         date: selectedDate,
//         startTime: slot.startTime,
//         endTime: slot.endTime,
//         fees: slot.price,
//         paymentStatus: "pending",
//         bookingStatus: "pending",
//       });

//       if (response.data.sessionId) {
//         //@ts-ignore
//         const result = await stripe.redirectToCheckout({ sessionId: response.data.sessionId });

//         if (result.error) {
//           setError('Failed to initiate payment');
//         } else {
//           // Update slot status to booked
//           await axiosInstance.post(`${USER_API}/update-slot-status`, {
//             slotId: slot._id,
//             status: 'booked'
//           });

//           const bookingId = response.data.booking.bookingId;
//           navigate(`/payment_status/${bookingId}?success=true`);
//         }
//       }
//     } catch (err) {
//       setError('Error processing payment');
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
//         <h2 className="text-2xl font-bold mb-4 text-center">Book a Slot</h2>
//         <div className="mb-4">
//           <label htmlFor="date" className="block text-lg font-semibold mb-2">
//             Select Date:
//           </label>
//           <input
//             type="date"
//             id="date"
//             value={selectedDate}
//             onChange={handleDateChange}
//             className="w-full p-2 border border-gray-300 rounded-lg"
//           />
//         </div>
//         {loading ? (
//           <div className="text-center">Loading available slots...</div>
//         ) : error ? (
//           <div className="text-center text-red-500">{error}</div>
//         ) : (
//           <div className="space-y-4">
//             {availableSlots.length > 0 ? (
//               availableSlots.map((slot) => (
//                 <div
//                   key={slot._id}
//                   className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex justify-between items-center bg-gray-50"
//                 >
//                   <div>
//                     <p className="text-lg font-semibold">{formatTime(slot.startTime)} - {formatTime(slot.endTime)}</p>
//                     <p className="text-sm text-gray-600">${slot.price}</p>
//                   </div>
//                   <button
//                     onClick={() => handleBooking(slot)}
//                     className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
//                   >
//                     Book Now
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center text-gray-500">No available slots for the selected date</div>
//             )}
//           </div>
//         )}
//         <div className="mt-4 text-right">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingModal;
















// import React, { useState, useEffect } from 'react';
// import { USER_API } from '../../constants';
// import axios from 'axios';
// import { loadStripe } from '@stripe/stripe-js';
// import axiosInstance from '../../utils/axiosInstance';
// import { useNavigate } from 'react-router-dom';

// interface BookingModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   venueId: string;
//   // venuePrice: number;
// }

// const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, venueId }) => {
//   const [selectedDate, setSelectedDate] = useState('');
//   const [availableSlots, setAvailableSlots] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const formatTime = (time: string) => {
//     const [hours, minutes] = time.split(':');
//     const hoursNum = parseInt(hours, 10);
//     const period = hoursNum >= 12 ? 'PM' : 'AM';
//     const adjustedHours = hoursNum % 12 || 12;
//     return `${adjustedHours}:${minutes} ${period}`;
//   };

//   useEffect(() => {
//     if (selectedDate) {
//       const fetchAvailableSlots = async () => {
//         setLoading(true);
//         try {
//           const response = await axios.get(`${USER_API}/get-slots/${venueId}/${selectedDate}`);
//           setAvailableSlots(response.data.timeSlots);
//         } catch (err) {
//           setError('Error fetching available slots');
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchAvailableSlots();
//     }
//   }, [selectedDate, venueId]);

//   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedDate(e.target.value);
//   };

//   const handleBooking = async (slot: any) => {
//     const stripe = await loadStripe('pk_test_51PaimnG8EaTCVCc3V37VRPWK4CHnrsjvdwOmKNyu6SZYIUJGBzPSJIuROfma8eqnXpQfQTOmBonXaPtiCUZBCFkx00OxC7tApr');

//     try {
//       const response = await axiosInstance.post(`${USER_API}/create-checkout-session`, {
//         venueId,
//         slotId: slot._id,
//         date: selectedDate,
//         startTime: slot.startTime,
//         endTime: slot.endTime,
//         // fees: venuePrice,
//         paymentStatus: "pending",
//         bookingStatus: "pending",
//       });

//       if (response.data.sessionId) {
//         //@ts-ignore
//         const result = await stripe.redirectToCheckout({ sessionId: response.data.sessionId });

//         if (result.error) {
//           setError('Failed to initiate payment');
//         } else {
//           // Update slot status to booked
//           await axiosInstance.post(`${USER_API}/update-slot-status`, {
//             slotId: slot._id,
//             status: 'booked'
//           });

//           const bookingId = response.data.booking.bookingId;
//           navigate(`/payment_status/${bookingId}?success=true`);
//         }
//       }
//     } catch (err) {
//       setError('Error processing payment');
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
//         <h2 className="text-2xl font-bold mb-4">Book a Slot</h2>
//         <div className="mb-4">
//           <label htmlFor="date" className="block text-lg font-semibold mb-2">
//             Select Date:
//           </label>
//           <input
//             type="date"
//             id="date"
//             value={selectedDate}
//             onChange={handleDateChange}
//             className="w-full p-2 border border-gray-300 rounded-lg"
//           />
//         </div>
//         {loading ? (
//           <div>Loading available slots...</div>
//         ) : error ? (
//           <div>{error}</div>
//         ) : (
//           <div className="space-y-2">
//             {availableSlots.length > 0 ? (
//               availableSlots.map((slot) => (
//                 <button
//                   key={slot._id}
//                   onClick={() => handleBooking(slot)}
//                   className="block w-full p-4 bg-green-100 rounded-lg text-left transition duration-300 ease-in-out transform hover:bg-green-200"
//                 >
//                   {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
//                 </button>
//               ))
//             ) : (
//               <div>No available slots for the selected date</div>
//             )}
//           </div>
//         )}
//         <div className="mt-4 text-right">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingModal;
        
// import React, { useState, useEffect } from 'react';
// import { USER_API } from '../../constants';
// import axios from 'axios';
// import { loadStripe } from '@stripe/stripe-js';
// import axiosInstance from '../../utils/axiosInstance';
// import { useNavigate } from 'react-router-dom';

// interface BookingModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   venueId: string;
// }

// interface Slot {
//   _id: string;
//   startTime: string;
//   endTime: string;
//   price: number;
// }

// const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, venueId }) => {
//   const [selectedDate, setSelectedDate] = useState('');
//   const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const formatTime = (time: string) => {
//     const [hours, minutes] = time.split(':');
//     const hoursNum = parseInt(hours, 10);
//     const period = hoursNum >= 12 ? 'PM' : 'AM';
//     const adjustedHours = hoursNum % 12 || 12;
//     return `${adjustedHours}:${minutes} ${period}`;
//   };

//   useEffect(() => {
//     if (selectedDate) {
//       const fetchAvailableSlots = async () => {
//         setLoading(true);
//         try {
//           const response = await axios.get(`${USER_API}/get-slots/${venueId}/${selectedDate}`);
//           setAvailableSlots(response.data.timeSlots);
//         } catch (err) {
//           setError('Error fetching available slots');
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchAvailableSlots();
//     }
//   }, [selectedDate, venueId]);

//   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedDate(e.target.value);
//   };

//   const handleBooking = async (slot: Slot) => {
//     const stripe = await loadStripe('pk_test_51PaimnG8EaTCVCc3V37VRPWK4CHnrsjvdwOmKNyu6SZYIUJGBzPSJIuROfma8eqnXpQfQTOmBonXaPtiCUZBCFkx00OxC7tApr');

//     try {
//       const response = await axiosInstance.post(`${USER_API}/create-checkout-session`, {
//         venueId,
//         slotId: slot._id,
//         date: selectedDate,
//         startTime: slot.startTime,
//         endTime: slot.endTime,
//         fees: slot.price,
//         paymentStatus: "pending",
//         bookingStatus: "pending",
//       });

//       if (response.data.sessionId) {
//         //@ts-ignore
//         const result = await stripe.redirectToCheckout({ sessionId: response.data.sessionId });

//         if (result.error) {
//           setError('Failed to initiate payment');
//         } else {
//           // Update slot status to booked
//           await axiosInstance.post(`${USER_API}/update-slot-status`, {
//             slotId: slot._id,
//             status: 'booked'
//           });

//           const bookingId = response.data.booking.bookingId;
//           navigate(`/payment_status/${bookingId}?success=true`);
//         }
//       }
//     } catch (err) {
//       setError('Error processing payment');
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
//         <h2 className="text-2xl font-bold mb-4">Book a Slot</h2>
//         <div className="mb-4">
//           <label htmlFor="date" className="block text-lg font-semibold mb-2">
//             Select Date:
//           </label>
//           <input
//             type="date"
//             id="date"
//             value={selectedDate}
//             onChange={handleDateChange}
//             className="w-full p-2 border border-gray-300 rounded-lg"
//           />
//         </div>
//         {loading ? (
//           <div>Loading available slots...</div>
//         ) : error ? (
//           <div>{error}</div>
//         ) : (
//           <div className="space-y-2">
//             {availableSlots.length > 0 ? (
//               availableSlots.map((slot) => (
//                 <button
//                   key={slot._id}
//                   onClick={() => handleBooking(slot)}
//                   className="block w-full p-4 bg-green-100 rounded-lg text-left transition duration-300 ease-in-out transform hover:bg-green-200"
//                 >
//                   {formatTime(slot.startTime)} - {formatTime(slot.endTime)} - ${slot.price}
//                 </button>
//               ))
//             ) : (
//               <div>No available slots for the selected date</div>
//             )}
//           </div>
//         )}
//         <div className="mt-4 text-right">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingModal;
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
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
}

const TimeSlotManager: React.FC = () => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([{ startTime: '', endTime: '', booked: false }]);
  const [uploadedSlots, setUploadedSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { venueId } = useParams<{ venueId: string }>();

  const formik = useFormik({
    initialValues: {
      date: '',
      timeSlots: [{ startTime: '', endTime: '' }],
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
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      setError('');
      try {
        const response = await axiosInstance.post(`${OWNER_API}/add-slots/${venueId}`, { ...values });
        resetForm();
        setTimeSlots([{
          startTime: '', endTime: '',
          booked: false
        }]);
        showToast('Time slot saved successfully!', 'success');
        fetchUploadedSlots(values.date); // Fetch the updated slots after adding a new one
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
      fetchUploadedSlots(formik.values.date); // Fetch the updated slots after deletion
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
                <div key={index} className="flex mb-2">
                  <input
                    type="time"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                    value={slot.startTime}
                    onChange={(e) => handleTimeSlotChange(index, 'startTime', e.target.value)}
                  />
                  <input
                    type="time"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={slot.endTime}
                    onChange={(e) => handleTimeSlotChange(index, 'endTime', e.target.value)}
                  />
                </div>
              ))}
              {formik.touched.timeSlots && formik.errors.timeSlots ? (
                <div className="text-red-500 text-sm">{(formik.errors.timeSlots as any)[0]?.startTime}</div>
              ) : null}
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
                  className={`flex justify-between p-2 rounded ${slot.booked ? 'bg-red-200' : 'bg-green-200'}`}
                >
                  <span>
                    {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                  </span>
                  {!slot.booked && (
                    <button onClick={() => deleteTimeSlot(slot.startTime, slot.endTime)} className="text-red-500 hover:text-red-700">
                      <Trash className="h-5 w-5" />
                    </button>
                  )}
                </li>
              ))
            ) : (
              <li>No slots uploaded for the selected date.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotManager;

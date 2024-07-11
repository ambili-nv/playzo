import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../../utils/axiosInstance';
import { OWNER_API } from '../../constants';
import { useParams } from 'react-router-dom';
import showToast from '../../utils/toaster';

interface TimeSlot {
  startTime: string;
  endTime: string;
}

const TimeSlotManager: React.FC = () => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([{ startTime: '', endTime: '' }]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { venueId } = useParams<{ venueId: string }>();
  console.log(venueId, "venue id on slot");

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
        console.log(response);
        resetForm();
        setTimeSlots([{ startTime: '', endTime: '' }]);
        showToast('Time slot saved successfully!', 'success');
      } catch (error) {
        showToast('An error occurred while saving the time slot.', 'error');
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
                  {formik.errors.timeSlots && formik.errors.timeSlots[index] && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.timeSlots[index].startTime || formik.errors.timeSlots[index].endTime}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center mb-4">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Add Slot'}
              </button>
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotManager;

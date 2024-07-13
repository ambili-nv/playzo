import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { OWNER_API } from '../../constants';

const TimeSlotsComponent = () => {
  const { venueId } = useParams<{ venueId: string }>();
  const [timeSlots, setTimeSlots] = useState<{
    date: string;
    slots: {
      _id: string;
      startTime: string;
      endTime: string;
      status: string;
      createdAt: string;
    }[];
  }[]>([]);

  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        const response = await axiosInstance.get(`${OWNER_API}/view-slots/${venueId}`);
        // Assuming response.data.timeSlots is an array of time slots
        // Group time slots by date
        const groupedTimeSlots = groupTimeSlotsByDate(response.data.timeSlots);
        //@ts-ignore
        setTimeSlots(groupedTimeSlots);
      } catch (error) {
        console.error('Error fetching time slots:', error);
      }
    };

    if (venueId) {
      fetchTimeSlots();
    }
  }, [venueId]);

  // Function to group time slots by date
  const groupTimeSlotsByDate = (timeSlots: any[]) => {
    const grouped = timeSlots.reduce((acc: any, slot: any) => {
      const date = slot.date.slice(0, 10); // Extract only the date part
      if (!acc[date]) {
        acc[date] = { date, slots: [] };
      }
      acc[date].slots.push({
        _id: slot._id,
        startTime: slot.startTime,
        endTime: slot.endTime,
        status: slot.status,
        createdAt: slot.createdAt,
      });
      return acc;
    }, {});
    return Object.values(grouped);
  };

  return (
    <div className="container mx-auto mt-12 pl-12 pr-12 pt-12">
      {timeSlots.length === 0 ? (
        <p className="text-center">Loading...</p>
      ) : (
        timeSlots.map((group, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Date: {new Date(group.date).toLocaleDateString()}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-1">
              {group.slots.map((slot, idx) => (
                <div
                  key={slot._id}
                  className={`p-2 rounded-lg shadow-md text-center transition-transform transform hover:scale-105 
                    ${slot.status === 'available' ? 'bg-green-200' : 'bg-gray-200'}`}
                >
                  <p className="text-sm font-semibold">{slot.startTime} - {slot.endTime}</p>
                  <p className={`text-xs font-semibold ${slot.status === 'available' ? 'text-green-700' : 'text-gray-700'}`}>
                    {slot.status}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TimeSlotsComponent;

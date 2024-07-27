import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Navbar from "../../components/user/Header/Navbar";
import axiosInstance from "../../utils/axiosInstance";
import { USER_API } from "../../constants";
import PaymentMessage from "../../components/user/paymentMsg";


const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const { id } = useParams();

  const status = searchParams.get("success");
  const isSuccess = status === "true";

  useEffect(() => {
    const updatePaymentStatus = async () => {
      if (status) {
        const paymentStatus = isSuccess ? "paid" : "failed";
        try {
          await axiosInstance.patch(`${USER_API}/payment/status/${id}`, { paymentStatus });
          console.log("Payment status updated successfully.");
        } catch (error) {
          console.error("Error updating payment status:", error);
          // Handle error: show message to user or retry logic
        }
      }
    };

    updatePaymentStatus();
  }, [status, isSuccess, id]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="p-10 bg-white rounded-lg shadow-lg">
          <PaymentMessage isSuccess={isSuccess} />
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;


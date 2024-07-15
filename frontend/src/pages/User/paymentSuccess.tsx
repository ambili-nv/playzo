// import { useParams, useSearchParams } from "react-router-dom";
// import Navbar from "../../components/user/Header/Navbar";
// import PaymentMessage from "../../components/user/paymentMsg";
// import axiosInstance from "../../utils/axiosInstance";
// import { USER_API } from "../../constants";
// import { useEffect } from "react";

// const PaymentSuccess = () => {
//   const [searchParams] = useSearchParams();
//   const { id } = useParams();

//   const status = searchParams.get("success");
//   const isSuccess = status === "true";

//   useEffect(() => {
//     if (status) {
//       const paymentStatus = isSuccess ? "Paid" : "Failed";
//       axiosInstance
//         .patch(`${USER_API}/payment/status/${id}`, { paymentStatus })
//         .then(({ data }) => console.log(data))
//         .catch((err: any) => console.log(err));
//     }
//   }, [status, isSuccess, id]);

//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//         <div className="p-10 bg-white rounded-lg shadow-lg">
//           <PaymentMessage isSuccess={isSuccess} />
//           {isSuccess ? (
//             <div className="mt-5 text-center text-green-500">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-16 w-16 mx-auto mb-4"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2}
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M9 12l2 2 4-4M7 12l2 2-4 4m-2-6h3v3M19 12l2 2-4 4m0-8h3v3"
//                 />
//               </svg>
//               <h2 className="text-2xl font-bold">Payment Successful!</h2>
//               <p className="mt-2">Your payment was successful. Thank you for your purchase!</p>
//               {/* <p className="mt-2 font-medium">Your booking ID is: {id}</p> */}
//               <button
//                 className="mt-5 px-6 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600"
//                 onClick={() => window.location.href = "/"}
//               >
//                 Go to Home
//               </button>
//             </div>
//           ) : (
//             <div className="mt-5 text-center text-red-500">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-16 w-16 mx-auto mb-4"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2}
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M9 12l2 2-4 4m-2-6h3v3M19 12l2 2-4 4m0-8h3v3"
//                 />
//               </svg>
//               <h2 className="text-2xl font-bold">Payment Failed</h2>
//               <p className="mt-2">Unfortunately, your payment could not be processed.</p>
//               <p className="mt-2">Please try again or contact support.</p>
//               <button
//                 className="mt-5 px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600"
//                 onClick={() => window.location.href = "/contact-support"}
//               >
//                 Contact Support
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default PaymentSuccess;




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


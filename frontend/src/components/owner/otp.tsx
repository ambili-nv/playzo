import React from "react";
import { useNavigate } from "react-router-dom";

const OtpPage: React.FC = () => {
    const navigate = useNavigate()
    const submit = ()=>{
        navigate('/owner/login')
    }
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
                <h1 className="text-3xl font-semibold text-center mb-6">
                    Email Verification
                </h1>
                <p className="text-gray-600 text-center mb-8">
                    We have sent a verification code to your email
                </p>
                <form className="space-y-6" >
                    <div className="flex flex-col">
                        <label className="block text-gray-700 mb-2" htmlFor="otp">
                            Enter OTP
                        </label>
                        <div className="flex items-center justify-center space-x-5">
                            <input
                                className="w-12 py-3 px-4 border border-gray-200 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                maxLength={1}
                                placeholder=""
                            />
                            <input
                                className="w-12 py-3 px-4 border border-gray-200 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                maxLength={1}
                                placeholder=""
                            />
                            <input
                                className="w-12 py-3 px-4 border border-gray-200 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                maxLength={1}
                                placeholder=""
                            />
                            <input
                                className="w-12 py-3 px-4 border border-gray-200 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                maxLength={1}
                                placeholder=""
                            />
                        </div>
                    </div>

                    <button
                        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                        type="submit"
                        onClick={submit}
                    >
                        Verify OTP
                    </button>
                    <div className="text-center text-sm text-gray-500">
                        <p>Didn't receive the code?</p>
                        <button
                            className="text-blue-600 hover:underline"
                        >
                            Resend
                            <span className="font-medium">
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default OtpPage
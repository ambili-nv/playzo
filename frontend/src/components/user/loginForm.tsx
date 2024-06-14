import React from "react";
import '../../index.css';
import { useNavigate } from "react-router-dom";
import Logo from '../../assets/images/bg.png'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const submit = ()=>{
    navigate('/')
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-50">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-6/12 bg-gray-100 relative overflow-hidden">
          <img 
            src={Logo}
            alt="Map"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="w-2/3 bg-white flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none "
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Password</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none "
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                onClick={submit}
              >
                Login
              </button>
            </form>
            <p className="mt-4 text-center text-gray-600">
              Don't have an account? <a href="/signup" className="text-green-500 hover:underline">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;


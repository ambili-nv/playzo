import React,{useState} from "react";
import { useNavigate } from 'react-router-dom';
import '../../index.css';
import Map from '../../assets/images/bg.png'
import axios from "axios";
import { OWNER_API } from "../../constants";
import { validateLogin } from "../../utils/validation";
import { setItemToLocalStorage } from "../../utils/Set&Get";
import { useAppDispatch } from "../../redux/store/store";
import { useFormik } from "formik";
import showToast from "../../utils/toaster";
import { setOwner } from "../../redux/slice/ownerSlice";


const OwnerLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues:{
      email:"",
      password:""
    },
    validate:validateLogin,
    onSubmit:async ({email,password})=>{
      setIsSubmitting(true)
      axios
      .post(OWNER_API+"/login",({email,password}))
      .then(({data})=>{
        console.log(data,"owner login details");
        const access_token = data.accessToken;
        console.log(access_token,"owner - accesstoken");
        const {name,role,_id} = data.owner
        console.log(name,role,_id," data recieved");
        setItemToLocalStorage("access_token", access_token);
        showToast(data.message, "success");
        dispatch(setOwner({isAuthenticated:true,name,role,id:_id}));
        navigate("/owner/homepage")
      })
      .catch(({ response }) => {
        setIsSubmitting(false);
        showToast(response?.data?.message, "error");
      });
    }
  })

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-50">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-6/12 bg-gray-100 relative overflow-hidden">
          <img 
            src={Map}
            alt="Map"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="w-2/3 bg-white flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none "
                  {...formik.getFieldProps("email")}
                />
              {formik.errors.email && formik.touched.email && (
              <div className="text-red-500">{formik.errors.email}</div>
            )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Password</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none "
                  {...formik.getFieldProps("password")}
                />
              {formik.errors.password && formik.touched.password && (
              <div className="text-red-500">{formik.errors.password}</div>
            )}
              </div>
              <button 
                type="submit" 
                id="password"
                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                disabled={isSubmitting}
              >
               {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </form>
            <p className="mt-4 text-center text-gray-600">
              Don't have an account? <a href="#" className="text-green-500 hover:underline">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerLoginPage;

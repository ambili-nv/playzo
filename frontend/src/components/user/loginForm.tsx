import React,{useState} from "react";
import '../../index.css';
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useAppDispatch } from "../../redux/store/store";
import { setUser } from "../../redux/slice/userSlice";
import { USER_API } from "../../constants";
import showToast from "../../utils/toaster";
import { setItemToLocalStorage } from "../../utils/Set&Get";
import { validateLogin } from "../../utils/validation";
import Logo from '../../assets/images/bg.png'
import axios from "axios";

const LoginPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues:{
      email:"",
      password:""
    },
    validate:validateLogin,
    onSubmit:({email,password})=>{
      setIsSubmitting(true);
      axios
      .post(USER_API + "/login",({email,password}))
      .then(({data})=>{
        const access_token = data.accessToken;
        console.log(access_token,"accessToken recieved");
        const{name,role,_id} = data.user
        console.log(name,role,_id,"USer data recieved");
        
        setItemToLocalStorage("access_token", access_token);
        showToast(data.message, "success");
        dispatch(setUser({ isAuthenticated: true, name, role, id: _id }));
        navigate("/");
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
            src={Logo}
            alt="Map"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="w-2/3 bg-white flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">User Login</h2>
            <form onSubmit={formik.handleSubmit} >
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none "
                  {...formik.getFieldProps("email")}
                />
                {formik.errors.email && formik.touched.email && (
                <div className="text-sm text-red-500">{formik.errors.email}</div>
            )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Password</label>
                <input 
                  type="password" 
                  id="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none "
                  {...formik.getFieldProps("password")}
                />
               {formik.errors.password && formik.touched.password && (
              <div className="text-sm text-red-500">{formik.errors.password}</div>
            )}
              </div>
              <button 
                type="submit" 
                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Login"}
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


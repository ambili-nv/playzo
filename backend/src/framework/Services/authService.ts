import configKeys from "../../config";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
export const authService = ()=>{

    const encryptPassword = async (password:string)=>{
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password,salt);
    };

    const comparePassword = async(inputPassword: string, password: string)=>{
        return await bcrypt.compare(inputPassword,password);
    }

    //generate otp
    // const generateOTP = () =>{
    //     const otp = Math.floor(100000 + Math.random() * 900000)
    //     return `${otp}`;
    // }

    const generateOTP = (): string => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return `${otp}`; // Correctly typed to return a string
    };

    const createToken = (id:string,name:string,role:string)=>{
        const payload = {
            id,
            name,
            role
        }
        const accessToken = jwt.sign(payload, configKeys.ACCESS_SECRET,{
            expiresIn:"3d"
        });
        console.log(accessToken,"accessToken generated");
        
        return accessToken;
    }


    return {
        generateOTP,
        createToken,
        encryptPassword,
        comparePassword,
        
    }
}

export type AuthService = typeof authService;
export type AuthserviceReturn = ReturnType<AuthService>;












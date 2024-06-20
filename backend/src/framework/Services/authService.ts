import configKeys from "../../config";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
export const authService = ()=>{

    const encryptPassword = async (password:string)=>{
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password,salt);
    };

    const comparePassword = async(inputPassword: string, password: string)=>{
        return await bcrypt.compare(inputPassword,password);
    }


    const generateOTP = (): string => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return `${otp}`; 
    };

    const createToken = (id:string,name:string,role:string)=>{
        const payload = {
            id,
            name,
            role
        }
        const accessToken = jwt.sign(payload, configKeys.ACCESS_SECRET,{
            expiresIn:"30d"
        });
        console.log(accessToken,"accessToken generated");
        
        return accessToken;
    }

    const getRandomString = () => crypto.randomUUID();


    return {
        generateOTP,
        createToken,
        encryptPassword,
        comparePassword,
        getRandomString
    }
}

export type AuthService = typeof authService;
export type AuthserviceReturn = ReturnType<AuthService>;












import { AuthserviceReturn } from "../../framework/Services/authService";

export const authServiceInterface = (service:AuthserviceReturn)=>{
    // const generateOTP = () => service.generateOTP();
        const generateOTP = (): string => service.generateOTP();
    
    return {
        generateOTP,
    }
}

export type AuthServiceInterfaceType = typeof authServiceInterface;
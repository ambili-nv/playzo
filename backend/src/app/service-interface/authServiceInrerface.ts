import { AuthserviceReturn } from "../../framework/Services/authService";

export const authServiceInterface = (service:AuthserviceReturn)=>{
    const encryptPassword = async (password: string)=> service.encryptPassword(password);

    const comparePassword = async (inputPassword: string, password: string)=>service.comparePassword(inputPassword,password);

    const createTokens = (id: string, name: string, role:string)=>service.createToken(id,name,role);


    // const generateOTP = () => service.generateOTP();
        const generateOTP = (): string => service.generateOTP();

        const getRandomString = () => service.getRandomString();
    
    return {
        generateOTP,
        encryptPassword,
        comparePassword,
        createTokens,
        getRandomString
    }
}

export type AuthServiceInterfaceType = typeof authServiceInterface;
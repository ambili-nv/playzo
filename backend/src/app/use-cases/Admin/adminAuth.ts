import { AuthServiceInterfaceType } from "../../service-interface/authServiceInrerface";
import CustomError from "../../../utils/customError";
import configKeys from "../../../config";
import { HttpStatus } from "../../../types/httpStatus";

export const login = async (
    email:string,
    password:string,
    authService:ReturnType<AuthServiceInterfaceType>
)=>{
    if(email === configKeys.ADMIN_EMAIL &&
        password === configKeys.ADMIN_PASSWORD
    ) {
        const accessToken = authService.createTokens(
            email,
            "Admin_User",
            "admin"
        );
        return accessToken
    }
    throw new CustomError("Invalid credentials", HttpStatus.UNAUTHORIZED);   
}
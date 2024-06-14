export const authService = ()=>{

    //generate otp
    // const generateOTP = () =>{
    //     const otp = Math.floor(100000 + Math.random() * 900000)
    //     return `${otp}`;
    // }

        const generateOTP = (): string => {
        const otp = Math.floor(100000 + Math.random() * 900000);
        return `${otp}`; // Correctly typed to return a string
    };
    return {
        generateOTP,
    }
}

export type AuthService = typeof authService;
export type AuthserviceReturn = ReturnType<AuthService>;












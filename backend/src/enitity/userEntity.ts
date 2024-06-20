export default function userEntity(
    name:string,
    email:string,
    phoneNumber:string,
    password:string,

){
    return{
        name:():string => name,
        getEmail:():string => email,
        getphoneNumber: (): string => phoneNumber,
        getPassword: (): string => password,
    };
}
export type userEntityType = ReturnType<typeof userEntity>;


export function googleSignInUserEntity(
    name:string,
    email:string,
    email_verified:boolean,
) {
    return {
        name: ():string => name,
        email:():string => email,
        email_verified:():boolean => email_verified
    }
}
export type googleSignInUserEntityType = ReturnType<typeof googleSignInUserEntity>
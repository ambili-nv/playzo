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
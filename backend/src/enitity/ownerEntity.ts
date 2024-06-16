export default function ownerEntity(
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
export type ownerEntityType = ReturnType<typeof ownerEntity>;
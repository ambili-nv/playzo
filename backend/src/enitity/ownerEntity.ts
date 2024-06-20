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

export function googleSignInOwnerEntity(
    name:string,
    email:string,
    email_verified:boolean,
) {
    return {
        name:():string=>name,
        email:():string=>email,
        email_verified:():boolean=>email_verified
    }
}

export type googleSignInOwnerEntityType = ReturnType<typeof googleSignInOwnerEntity>
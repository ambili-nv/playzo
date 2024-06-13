export interface CreateUserInterface{
    name:string,
    email:string,
    phoneNumber: string,
    password:string,

}

export interface UserInterface{
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: string;
    isVerified: boolean;
    isBlocked: boolean;
    createdAt?: Date;
}
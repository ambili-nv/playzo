export type UserInterface = {
    _id: string;
    name: string;
    email: string;
    phoneNumber?:number;
    role: "user";
    isVerified: boolean;
    isBlocked: boolean;
    createdAt: Date;
    status:String
  };
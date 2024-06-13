import { log } from "console";
import { userEntityType } from "../../../../enitity/userEntity";
import { UserInterface } from "../../../../types/userInterface";
import User from "../models/user";

export const userRepositoryMongodb =()=>{



const addUser = async(user:userEntityType)=>{

    console.log(user,"oooooooooooooo")
    const newUser:any = new User({
        name:user.name(),
        email:user.getEmail(),
        password:user.getPassword(),
        phoneNumber:user.getphoneNumber()
    })
    await newUser.save()
    return newUser
}

const getUserbyEmail = async (email:any)=>{
    const isEmailExist = await User.findOne({email:email})
    // console.log(isEmailExist,"///////////////");
    
}


return {
    addUser,
    getUserbyEmail
}

}

export type userRepositoryMongodbType = typeof userRepositoryMongodb;
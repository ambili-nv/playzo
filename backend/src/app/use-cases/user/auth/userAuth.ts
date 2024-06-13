import { CreateUserInterface,UserInterface } from "../../../../types/userInterface";
import createUserEntity,{userEntityType} from '../../../../enitity/userEntity'
import { userDbInterface } from "../../../Interfaces/userDbRepository";

export const userRegister = async(
    user:CreateUserInterface,
    userRepository:ReturnType<userDbInterface>,
)=>{
    const{ name,email,password,phoneNumber} = user
    const authenticationMethod = "password";


    const userEntity: userEntityType = createUserEntity(
        name,
        email,
        phoneNumber,
        password
    );
        const isEmailExist = await userRepository.getUserbyEmail(email)
        //create a new User 
        const createdUser: UserInterface = await userRepository.addUser(userEntity);
}
import { userDbInterface} from "../../Interfaces/userDbRepository";

// export const getUsers = async(userDbRepository:ReturnType<userDbInterface>)=>{
//     await userDbRepository.getAllUsers();
//     console.log(getUsers,"get users data from db");
    
// }


export const getUsers = async (userDbRepository: ReturnType<userDbInterface>) => {
    try {
        const users = await userDbRepository.getAllUsers();
        console.log(users, "get users data from db");
        return users; // return the data for further use
    } catch (error) {
        console.error("Error in getUsers function:", error);
        throw error;
    }
};

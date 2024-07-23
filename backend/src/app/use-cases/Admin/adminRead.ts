import { ownerDbInterface} from "../../Interfaces/ownerDbRepository";
import { userDbInterface} from "../../Interfaces/userDbRepository";
import { venueDbInterface} from "../../Interfaces/venueDbRepository";
// export const getUsers = async(userDbRepository:ReturnType<userDbInterface>)=>{
//     await userDbRepository.getAllUsers();
//     console.log(getUsers,"get users data from db");
    
// }


// export const getUsers = async (userDbRepository: ReturnType<userDbInterface>) => {
//     try {
//         const users = await userDbRepository.getAllUsers();
//         console.log(users, "get users data from db");
//         return users; // return the data for further use
//     } catch (error) {
//         console.error("Error in getUsers function:", error);
//         throw error;
//     }
// };

export const getUsers = async (userDbRepository: ReturnType<userDbInterface>, page: number, limit: number) => {
    try {
        //@ts-ignore
        const { users, totalUsers } = await userDbRepository.getAllUsers(page, limit);
        console.log(users, "get users data from db");
        return { users, totalUsers }; // return the data for further use
    } catch (error) {
        console.error("Error in getUsers function:", error);
        throw error;
    }
};





// export const getOwners  = async(ownerDbRepository:ReturnType<ownerDbInterface>)=>{
//     try {
//         const owners = await ownerDbRepository.getAllOwners();
//         console.log(owners,"owners data in use-case");
//         return owners
        
//     } catch (error) {
        
//     }
// }

export const getOwners = async (ownerDbRepository: ReturnType<ownerDbInterface>, page: number, limit: number) => {
    try {
        //@ts-ignore
        const { allOwners, totalOwners } = await ownerDbRepository.getAllOwners(page, limit);
        return { allOwners, totalOwners };
    } catch (error) {
        // Handle error
    }
};



export const getVenues = async(venueDbRepository:ReturnType<venueDbInterface>, ownerId: string, page: number, limit: number)=>{
    try {
        const venues = await venueDbRepository.getVenuesByOwner(ownerId,page,limit);
        console.log(venues,"venues adminread");
        
        return venues;
    } catch (error) {
        throw error;
    }
}

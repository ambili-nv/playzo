import { venueDbInterface } from "../../../Interfaces/venueDbRepository";
import ratingEntity from "../../../../enitity/ratingEntity";

export const addNewRating = async(
    userId:string,
    ratingData:{venueId:string,rating:number,comment:string},
    venueDbRepository : ReturnType<venueDbInterface>
)=>{
    const { venueId, rating, comment } = ratingData;
    const newRatingEntity = ratingEntity(
      userId,
      venueId,
      rating,
      comment
    );
  
    return await venueDbRepository.addRating(newRatingEntity);
}


export const ratings = async (
    venueId: string,
    venueDbRepository: ReturnType<venueDbInterface>
  ) => await venueDbRepository.getRatings({ venueId: venueId });

export default function ratingEntity(
    userId: string,
    venueId: string,
    rating: number,
    comment: string
  ) {
    return {
      getUserId: (): string => userId,
      getVenueId: (): string => venueId,
      getRating: (): number => rating,
      getComment: (): string => comment,
    };
  }
  export type RatingEntityType = ReturnType<typeof ratingEntity>;
  
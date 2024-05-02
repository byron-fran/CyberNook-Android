import { Review } from "../../interfaces/Review"
import { cybernookApi as axios } from "../api/cybernookApi"

export const getReviewsByProduct = async(id : string) : Promise<Review[]> => {
    try {
        
        const {data} = await axios.get<Review[]>(`/reviews/${id}`);
        return data  

    } catch (error) {
   
        throw new Error(error as string)
    }

}
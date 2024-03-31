import { cybernookApi as axios } from "../../config/api/cybernookApi";
import { create } from "zustand";

import { Review } from "../../interfaces/Review";


export interface ReviewState {
    reviews: Review[],
    getReviewsByProduct: (id: string) => Promise<Review[]>,
    addNewReview: (review: Review) => Promise<void>
    isLoading: boolean,


};

export const useReviewStore = create<ReviewState>((set, get) => ({
    reviews: [],
    isLoading: false,
    getReviewsByProduct: async (id: string) => {
        try {
            set(({
                isLoading: true
            }))
            const { data } = await axios.get<Review[]>(`/reviews/${id}`);
            set((state) => ({
                ...state,
                reviews: data,
                isLoading: false
            }))
            return data

        } catch (error) {
            console.log(error)
            throw new Error(error as string)
        }


    },
    addNewReview: async (review: Review) => {
        try {
   
           const {data} = await axios.post<Review>(`/review`, review);
     
            set((state) => ({
                ...state,
                reviews: [...state.reviews, data],
            
            }))


        } catch (error) {
            console.log(error)

        }
    }

}))

import { create } from "zustand";
import { Category } from "../../interfaces/Category";
import { cybernookApi as axios} from "../../config/api/cybernookApi";

interface CategoryState {
    categories : Category[],
    getGategories : () => Promise<Category[]> ,
    isLoading : boolean   
}


export const useCategoryStore = create<CategoryState>((set, get) => ({
    categories: [],
    isLoading : true,

    getGategories : async() => {
        const {data} = await axios.get<Category[]>('/category')
        
        set((state) => ({
            ...state,
            isLoading : false,
            categories : data
        }))
        return data
    }
}))
import { create } from "zustand";
import { Product } from "../../interfaces/products";
import { cybernookApi as axios } from "../../config/api/cybernookApi";
import { ProductResponse } from "../../interfaces/ProductResponse";


export interface FavoriteState {
    favorites: Product[],
    getFavorites: () => Promise<Product[]>
    addFavorite: (product : Product) => Promise<boolean>,
    removeFavorite: (ProductId: string) => Promise<boolean>
};

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
    favorites: [],
    getFavorites: async () => {

        const { data } = await axios.get<Product[]>('/favorite');

        set((state) => ({
            ...state,
            favorites: data
        }));

        return data
    },

    addFavorite: async (product : Product) : Promise<boolean> => {
        try {

            const {data} = await axios.post<boolean>(`/favorite/${product.id}`);
      
            set((state) => ({
                ...state,
                favorites : [...state.favorites, product ]
            }))
        
            return data
        } catch (error) {
            throw new Error(error as string)
        }
    },
    removeFavorite: async (ProductId: string) : Promise<boolean> => {
        try {
            const {data} =  await axios.delete(`/favorite/${ProductId}`);
            set((state) => ({
                favorites: state.favorites.filter(fav => fav.id !== ProductId)
            }));
            
            return data
        } catch (error) {
            throw new Error(error as string)
        }
    }
}))

import { create } from "zustand";
import { Product } from "../interfaces/products";
import { cybernookApi as axios } from "../config/api/cybernookApi";
export interface ProductsState {
    products : Product[],
    getProducts : () => Promise<Product[]>,
    isLoading : boolean,

}
export const useProductsStore = create<ProductsState>((set, get) => ({
    products : [],
    isLoading : true,
    getProducts : async () => {
   
        const {data} = await axios.get<Product[]>('/store/products');
        set((state) => ({
            ...state,
            isLoading : false
        }))
        set({
            products : data
        })
        return data
    },

}))

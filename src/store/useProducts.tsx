import { create } from "zustand";
import { Product } from "../interfaces/products";
import { cybernookApi as axios } from "../config/api/cybernookApi";
export interface ProductsState {
    products : Product[],
    getProducts : () => Promise<Product[]>,
    isLoading : boolean,
    getProductById : (id: string) => Promise<Product>

}
export const useProductsStore = create<ProductsState>((set, get) => ({
    products : [],
    isLoading : true,
    getProducts : async () => {
   
        const {data} = await axios.get<Product[]>('/store/products');
        set((state) => ({
            ...state,
            isLoading : false,
            products : data
        }))
    
        return data
    },
    getProductById : async(id : string) => {
        const {data} = await axios.get<Product>(`/store/product/${id}`)
        return data
    }
}))

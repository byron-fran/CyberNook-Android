import { create } from "zustand";
import { Product } from "../interfaces/products";
import { cybernookApi as axios } from "../config/api/cybernookApi";
import { ProductResponse } from "../interfaces/ProductResponse";

export type ProductsResponse = {
    products : Product[],
    totalItems : number,
    currentPage : number,
    
}
export interface ProductsState {
    products : Product[],
    getProducts : () => Promise<ProductsResponse >,
    isLoading : boolean,
    getProductById : (id: string) => Promise<Product>

}
export const useProductsStore = create<ProductsState>((set, get) => ({
    products : [],
    isLoading : true,
    getProducts : async () => {
   
        const {data} = await axios.get<ProductsResponse>('/store/products');
        set((state) => ({
            ...state,
            isLoading : false,
            products : data.products
        }))
        
        return data
    },
    getProductById : async(id : string) => {
        set({
            isLoading : true
        })
        const {data} = await axios.get<Product>(`/store/product/${id}`);
        set({
            isLoading : false
        })
        return data
    }
}))

import { create } from "zustand";
import { Product } from "../interfaces/products";
import { cybernookApi as axios } from "../config/api/cybernookApi";
import { ProductResponse } from "../interfaces/ProductResponse";

export type ProductsResponse = {
    products: Product[],
    totalItems: number,
    currentPage: number,
    allProducts: Product[]

}
export interface ProductsState {
    products: Product[],
    allProducts: Product[],
    getProducts: () => Promise<ProductsResponse | undefined>,
     getAllProducts: () => Promise<Product[] | undefined>,
    isLoading: boolean,
    getProductById: (id: string) => Promise<Product>

}
export const useProductsStore = create<ProductsState>((set, get) => ({
    products: [],
    allProducts: [],
    isLoading: true,
    getProducts: async () => {
        try {

            const { data } = await axios.get<ProductsResponse>('/store/products');
            set((state) => ({
                ...state,
                isLoading: false,
                products: data.products
            }))

            return data
        } catch (error) {

        }
    },
    getAllProducts: async () => {
        try {
            const { data } = await axios.get<ProductsResponse>('/store/all_products')
            set((state)=>({
                ...state,
                allProducts : data.allProducts
            }))
            return data.allProducts
        } catch (error) {
            console.log(error)

        }

    },
    getProductById: async (id: string) => {
        set({
            isLoading: true
        })
        const { data } = await axios.get<Product>(`/store/product/${id}`);
        set({
            isLoading: false
        })
        return data
    }
}))

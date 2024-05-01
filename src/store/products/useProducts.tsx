import { create } from "zustand";
import { Product } from "../../interfaces/products";
import { cybernookApi as axios } from "../../config/api/cybernookApi";
import { ProductResponse } from "../../interfaces/ProductResponse";

export type ProductsResponse = {
    products: Product[]
    totalItems: number
    currentPage: number
    totalPages: number
    nextPage: number
    previousPage: number
    allProducts: Product[],




}
export interface ProductsState {
    products: Product[],
    allProducts: Product[],
    getProducts: (page?: number, category?: string, mark?: string) => Promise<ProductsResponse | undefined>,
    getAllProducts: () => Promise<Product[] | undefined>,
    updateProducts : (product : Product) => void,
    isLoading: boolean,
    getProductById: (id: string) => Promise<Product>,

    clearProducts: () => void

    totalItems: number
    currentPage: number
    totalPages: number
    nextPage: number
    previousPage: number

    resetPage: (page: number) => void,




}
export const useProductsStore = create<ProductsState>((set, get) => ({
    products: [],
    allProducts: [],
    isLoading: false,
    totalItems: get()?.allProducts.length,
    currentPage: 1,
    totalPages: 0,
    nextPage: 0,
    previousPage: 0,

    getProducts: async (page: number = 1, category?: string, mark?: string) => {
        
        let url = `/store/products/?page=${page}`;
        try {
            if (category || mark) {

                if (category) {

                    url += `&category=${category}`;
                }
                if (mark) {

                    url += (category !== undefined ? '&' : '') + `mark=${mark}`;
                }
            }
            set((state) => ({
                ...state,
                isLoading : true
            }))
            const { data } = await axios.get<ProductsResponse>(url);
           

            set((state) => ({
                ...state,
                products: data.products,
                totalItems: data.totalItems,
                currenPage: data.currentPage,
                totalPages :data.totalPages,
                nextPage : data.nextPage,
                previousPage : data.previousPage,
                isLoading : false


            }))


            return data
        } catch (error) {

        }
    },
    getAllProducts: async () => {
        try {

            const { data } = await axios.get<ProductsResponse>('/store/all_products')
            set((state) => ({
                ...state,

                allProducts: data.allProducts,
                totalIems: data.totalItems
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
    },
    updateProducts : (product : Product) => {
        const productFind =  get()?.products.find(p =>  p.id === product.id)
    },
    clearProducts: () => {
        set(({
            products: []
        }))
    },
    resetPage: (page: number) => {
        set(state => ({
            ...state,
            currentPage: page
        }))
    }
}))

import { create } from "zustand";
import { Product } from "../../interfaces/products";
import { cybernookApi as axios } from "../../config/api/cybernookApi";
import { ProductResponse } from "../../interfaces/ProductResponse";

export type ProductsResponse = {
    products: Product[],
    totalItems: number,
    currentPage: number,
    allProducts: Product[],


}
export interface ProductsState {
    products: Product[],
    allProducts: Product[],
    getProducts: (page?: number, category?: string, mark?: string) => Promise<ProductsResponse | undefined>,
    getAllProducts: () => Promise<Product[] | undefined>,
    isLoading: boolean,
    getProductById: (id: string) => Promise<Product>
    clearProducts : () => void
}
export const useProductsStore = create<ProductsState>((set, get) => ({
    products: [],
    allProducts: [],
    isLoading: false,
    getProducts: async (page?: number, category?: string, mark?: string) => {
        let url = `/store/products/?`;
        try {
            if (category !== undefined || mark !== undefined) {
                // Construir la URL con los parámetros que están definidos


                if (category !== undefined) {
                    url += `category=${category}`;
                }
                if (mark !== undefined) {
                    // Si mark está definido, y category también, agregar el separador "&"
                    // de lo contrario, no se necesita el separador.
                    url += (category !== undefined ? '&' : '') + `mark=${mark}`;
                }
            }
     
            const { data } = await axios.get<ProductsResponse>(url);
            set((state) => ({
                ...state,
                products: data.products
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
   
                allProducts: data.allProducts
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
    clearProducts  : () => {
        set(({
            products : []
        }))
    }
}))

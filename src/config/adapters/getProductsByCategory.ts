import { Product } from "../../interfaces/products";
import { cybernookApi as axios } from "../api/cybernookApi";
import { ProductResponse } from "../../interfaces/ProductResponse";

export const getProductsByCategory = async (category : string) : Promise<Product[]> => {

    try {
        const url = `/store/products/?category=category&filter=${category}`
        const {data} = await axios.get<ProductResponse>(url);

        return data.products

    } catch (error : unknown) {
        throw new Error(error as string)
    }
    
}
import { User } from "./User"
import { Product } from "./products"

export interface Review {
    id? : string,
    comment : string
    stars : number,
    likes? : number,
    ProductId?: string,
    UserId? :string,
    User? : User,
    updatedAt? : string,
    Product? : Product,
   
}
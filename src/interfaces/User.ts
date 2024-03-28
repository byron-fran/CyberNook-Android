import { Address } from "./Address";
import { Review } from "./Review";

export interface User {
    id?: string
    name: string,
    email: string,
    phone: string ,
    password?: string,
    // Orders?: Order[],
    Address: Address,
    Reviews?: Review[],
    isAdmin?: boolean ,
}
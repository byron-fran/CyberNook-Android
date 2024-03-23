import { Review } from "./Review";

export interface User {
    id: string
    name: string,
    email: string,
    phone?: string | number,
    password: string,
    // Orders?: Order[],
    // Addresses?: Address[],
    Reviews?: Review[],
    isAdmin: boolean,
}
import { create } from "zustand";
import { cybernookApi as axios } from "../config/api/cybernookApi";
import { AxiosError } from "axios";
import { Address } from "../interfaces/Address";



export interface AddressState {
    Address: Address,
    getAddress: () => Promise<void>,
    createAddress: (address: Address) => Promise<void>,
    updateAddress: (id: string, address: Address) => Promise<void>,
    deleteAddress: (id: string) => Promise<void>

}


export const useAddressStore = create<AddressState>((set, get) => ({
    Address: {
        city: '',
        country: '',
        postalCode: '',
        exteriorNumber: '',
        street: '',

    },
    getAddress: async () => {
        try {
            const { data } = await axios.get('/address');
            set((state) => ({
                ...state,
                Address: data
            }))
          
        } catch (error: unknown) {
            console.log(error,)
        }
    },
    createAddress: async (adddress: Address) => {
        try {
            const { data } = await axios.post('/address', {...adddress})
            set((state) => ({
                ...state,
                Address: data
            }))
        } catch (error) {
            console.log(error)
        }
    },
    updateAddress: async (id: string, address: Address) => {
        try {
            const { data } = await axios.put(`/address/${id}`, address)
            set((state) => ({
                ...state,
                Address: data
            }))
        } catch (error) {
            console.log(error)
        }
    },
    deleteAddress: async (id: string) => {

    }

}))

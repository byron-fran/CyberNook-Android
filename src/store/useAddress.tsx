import { create } from "zustand";
import { cybernookApi as axios } from "../config/api/cybernookApi";
import { AxiosError } from "axios";
import { Address } from "../interfaces/Address";



export interface AddressState {
    Address: Address,
    getAddress: () => Promise<Address>,
    createAddress: (address: Address) => Promise<void>,
    updateAddress: (id: string, address: Address) => Promise<void>,
    deleteAddress: (id: string) => Promise<void>,
    clearAddress : () => void
    isLoading: boolean,
    success: boolean
}


export const useAddressStore = create<AddressState>((set, get) => ({
    Address: {
        city: '',
        country: '',
        postalCode: '',
        exteriorNumber: '',
        street: '',

    },
    isLoading: false,
    success: false,
    getAddress: async () => {
        try {
            const { data } = await axios.get('/address');
            set( ({
       
                Address: data
            }))
            return data

        } catch (error: unknown) {
            console.log(error,)
        }
    },
    createAddress: async (adddress: Address) => {
        try {
            set((state) => ({
                ...state,
                isLoading: true
            }));
            const { data } = await axios.post('/address', { ...adddress })
            set((state) => ({
                ...state,
                Address: data,
                success: true,
                isLoading: false
            }));
            setTimeout(() => {
                set((state) => ({...state, success: false}));
            }, 3000)
        } catch (error) {
            console.log(error)
            set((state) => ({
                ...state,
                success: false,
                isLoading: false
            }))
        }
    },
    updateAddress: async (id: string, address: Address) => {
        try {
            set((state) => ({
                ...state,
                isLoading: true
            }));
            const { data } = await axios.put(`/address/${id}`, address)
            set((state) => ({
                ...state,
                Address: data,
                success: true,
                isLoading: false
            }));
            setTimeout(() => {
                set((state) => ({...state, success: false}));
            }, 3000)
        } catch (error) {
            console.log(error)
        }
    },
    deleteAddress: async (id: string) => {

    },
    clearAddress : () => {
        set({
            Address : {} as Address
        })
    }


}))

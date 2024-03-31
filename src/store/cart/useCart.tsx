import { cybernookApi as axios } from "../../config/api/cybernookApi";
import { create } from "zustand";
import { Product } from "../../interfaces/products";
import codegenNativeCommands from "react-native/Libraries/Utilities/codegenNativeCommands";

export interface Order extends Product {
    quantity: number
}
export interface CartState {
    cart: Order[],
    addToCart: (order: Order) => Promise<void>,
    getCart: () => Promise<void>,
    deleteOrderById: (id: string) => Promise<void>,
    updateOrderById: (id: string, order: Order) => Promise<void>
    isLoading: boolean,
    success: boolean

};

export const useCartStore = create<CartState>((set, get) => ({
    cart: [],
    isLoading: false,
    success: false,

    addToCart: async (order: Order) => {
        try {

            set((state) => ({
                ...state,
                isLoading: true
            }))
            const { data } = await axios.post('/order', { ...order });
            set((state) => ({
                ...state,
                cart: [...state.cart, data],
                isLoading: false,
                success: true
            }))
            setTimeout(() => {
                set((state) => ({
                    ...state,

                    success: false
                }))
            }, 3000)

        } catch (error) {
            console.log(error)
        }
    },
    getCart: async () => {
        try {

            const { data } = await axios.get<Order[]>('/list_order');
            set({
                cart: data,

            })

        } catch (error) {
            console.log(error)
        }
    },
    updateOrderById: async (id: string, newOrder: Order) => {
        try {
            set((state) => ({
                ...state,
                isLoading: true
            }));
       
            await axios.put(`/order/${id}`, newOrder);

            const orderFind = get().cart.find(order => order.id === id);

            const ordersUpdate = get().cart.map(order => {
                if (order.id === orderFind?.id!) {

                    return newOrder
                }

                return order;
            });


            set((state) => ({
                ...state,
                cart: ordersUpdate,
                isLoading: false,
                success: true
            }))
            setTimeout(() => {
                set((state) => ({
                    ...state,

                    success: false
                }))
            }, 3000)
        } catch (error) {

            set((state) => ({
                ...state,

                success: false,
                isLoading: false
            }))

            console.log(error)
        }

    },
    deleteOrderById: async (id: string) => {
        try {

            await axios.delete(`/order/${id}`);
            set((state) => ({
                cart: state.cart.filter(order => order.id !== id)
            }))
        } catch (error) {
            console.log(error)
        }
    },
}))

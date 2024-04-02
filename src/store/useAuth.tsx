import { User } from "../interfaces/User";
import { AuthStatus } from "../interfaces/AuthStatus";
import { create } from "zustand";
import { StorageAdapter } from "../config/adapters/storgeAdapter";
import { cybernookApi as axios } from "../config/api/cybernookApi";
import { AxiosError } from "axios";


export interface AuthResponse {
    token: string,
    user: User
}

export interface AuthState {
    token?: string,
    user: User,
    status: AuthStatus
    login: (email: string, password: string) => Promise<boolean | undefined>,
    register: (user: User) => Promise<boolean | undefined>,
    checkStatus: () => Promise<boolean | undefined>,
    logout: () => Promise<void>,
    updateProfile: (user: User) => Promise<void>,
    //Error Auth
    errorLogin: string,
    errorRegister: string,
    isLoading: boolean,
    success: boolean

}


export const useAuthStore = create<AuthState>((set, get) => ({
    token: undefined,
    user: {} as User,
    status: 'checking',
    errorLogin: '',
    errorRegister: '',
    isLoading: false,
    success: false,

    login: async (email: string, password: string) => {
        try {

            const { data } = await axios.post<AuthResponse>('/login', { email, password });

            if (!data.token) {
                set({
                    status: 'unauthenticated',
                    user: undefined,
                    token: undefined,
                    errorLogin: ''
                })
                return false
            };

            await StorageAdapter.setItem('token', data.token)
            set({
                status: 'authenticated',
                user: data.user,
                token: data.token,
                errorLogin: ''
            })
            return true

        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                const message = error.response?.data.message
                set((state) => ({
                    ...state,
                    errorLogin: message
                }))

                return undefined
            }
        }
    },
    register: async (info: User) => {
        try {
            const { data } = await axios.post<AuthResponse>('/register', { ...info })

            if (!data.token) {
                set({
                    status: 'unauthenticated',
                    user: undefined,
                    token: undefined,
                    errorLogin: ''
                })
                return false
            };

            await StorageAdapter.setItem('token', data.token)
            set({
                status: 'authenticated',
                user: data.user,
                token: data.token,
                errorLogin: '',
                errorRegister: '',
            })
            return true
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                const message = error.response?.data.message
                set((state) => ({
                    ...state,
                    errorRegister: message
                }))

                return undefined
            }

        }
    },
    logout: async () => {
        await StorageAdapter.removeItem('token')
        set({
            status: 'unauthenticated',
            user: undefined,
            token: undefined,
            
        })

    },
    updateProfile: async (user: User) => {
        try {
            set(state => ({
                ...state,
                isLoading: true
            }))
            const { data } = await axios.put('/profile', { ...user });
            set(state => ({
                ...state,
                isLoading: false,
                success: true,
                user : data
            }))
            setTimeout(() => {
                set(state => ({
                    ...state,
                    success: false
                }))
            }, 3000)
            return data;

        } catch (error) {
            console.log(error)
            set(state => ({
                ...state,
                isLoading: false,
                success: false
            }))
        }
    },
    checkStatus: async () => {
        try {
            const token = await StorageAdapter.getItem('token');
            if (!token) { return }

            const { data } = await axios.get<AuthResponse>('/verify');
            if (!data.token) {
                set({
                    status: 'unauthenticated',
                    user: undefined,
                    token: undefined
                })
                return false
            };

            await StorageAdapter.setItem('token', data.token)
            set({
                status: 'authenticated',
                user: data.user,
                token: data.token
            })
            return true

        } catch (error: unknown) {
            console.log(error)
        }

    }

}))

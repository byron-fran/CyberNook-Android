import { create } from "zustand";
import { cybernookApi as axios } from "../../config/api/cybernookApi";
interface Mark {
    name: string,
    id: string
}

interface MarkState {
    marks: Mark[],
    getMarks: () => Promise<Mark[]>,
    isLoading: boolean
}


export const useMarksStore = create<MarkState>((set, get) => ({
    marks: [],
    isLoading: true,

    getMarks: async () => {
        const { data } = await axios.get<Mark[]>('/mark')

        set((state) => ({
            ...state,
            isLoading: false,
            marks: data
        }))
        return data
    }
}))
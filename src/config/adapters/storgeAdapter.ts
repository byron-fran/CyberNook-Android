import AsyncStorage from "@react-native-async-storage/async-storage";

export class StorageAdapter {
    static async getItem(key: string): Promise<string | null> {
        try {
            const token = await AsyncStorage.getItem(key)
            return token
        } catch (error) {
            console.log(error)
            return null
        }

    }
    static async setItem(key : string, token: string): Promise<void> {
        try {
            await AsyncStorage.setItem(key, token)
        } catch (error) {
            console.log(error)
        }
    }
    static async removeItem(key : string) : Promise<void>{
        try {
            await AsyncStorage.removeItem(key)            
        } catch (error) {
            console.log(error)
        }
    }
}